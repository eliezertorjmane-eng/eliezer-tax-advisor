import assert from "node:assert/strict";
import { registerHooks } from "node:module";
import test from "node:test";

// Resolve the one runtime alias used by the content module; no extra dependency.
// Run with Node 22.15+ (tested with Node 24).
const hooks = registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier === "@/lib/content/v8Articles") {
      return {
        url: new URL("../lib/content/v8Articles.ts", import.meta.url).href,
        shortCircuit: true
      };
    }
    return nextResolve(specifier, context);
  }
});
const { articles } = await import("../lib/content/articles.ts");
hooks.deregister();
const guide = articles.find((article) =>
  article.slug === "nekoudot-zikouy-milouim-2026" && article.locale === "fr"
);
assert.ok(guide, "The public French Milouim guide must exist");

test("the published guide retains verified fiscal and Tsahal references", () => {
  const urls = guide.sources.map((source) => {
    assert.equal(source.status, "verified");
    const url = new URL(source.href);
    assert.equal(url.protocol, "https:");
    assert.ok(["www.gov.il", "www.miluim.idf.il"].includes(url.hostname));
    return url;
  });
  assert.ok(urls.some((url) =>
    url.hostname === "www.gov.il" && url.pathname === "/he/pages/pa181225-1"
  ), "The full scale and point value must retain their official fiscal source");
  assert.ok(urls.some((url) =>
    url.hostname === "www.miluim.idf.il" && url.pathname.startsWith("/articles-list/")
  ), "The certificate instructions must retain their official Tsahal source");
  assert.ok(urls.some((url) =>
    url.hostname === "www.miluim.idf.il" && url.pathname === "/auth"
  ));
});

test("every published range matches the official 2026–2027 scale", () => {
  const scale = guide.sections.find((section) =>
    section.title === "Combien de Nekoudot Zikouy peut-on recevoir ?"
  );
  assert.ok(scale);
  const rows = scale.bullets.map((line) => {
    const match = line.match(/^(\d+)(?:-(\d+))? jours(?: admissibles| et plus)? : ([\d,]+) points?\.$/u);
    assert.ok(match, `Unrecognized scale row: ${line}`);
    return [
      Number(match[1]),
      match[2] ? Number(match[2]) : Infinity,
      Number(match[3].replace(",", "."))
    ];
  });
  // Independent fixture transcribed from the Tax Authority's 18/12/2025 table.
  assert.deepEqual(rows, [
    [0, 29, 0], [30, 39, 0.5], [40, 49, 0.75], [50, 54, 1],
    [55, 59, 1.25], [60, 64, 1.5], [65, 69, 1.75], [70, 74, 2],
    [75, 79, 2.25], [80, 84, 2.5], [85, 89, 2.75], [90, 94, 3],
    [95, 99, 3.25], [100, 104, 3.5], [105, 109, 3.75], [110, Infinity, 4]
  ]);
  assert.match(scale.paragraphs.join(" "), /2026–2027/u);
  assert.match(scale.callout.text, /2 904 ₪ par an en 2026/u);
  assert.match(scale.callout.text, /242 ₪ par mois/u);
  assert.match(scale.callout.text, /11 616 ₪/u);
  assert.match(scale.callout.text, /impôt dû/u);
});

test("certificate year, payroll and multiple-employer procedures stay explicit", () => {
  const document = guide.sections.find((section) =>
    section.title === "Quel document faut-il générer ?"
  );
  assert.match(document.paragraphs.join(" "), /נקודות זיכוי לשנת 2025/u);
  const years = guide.sections.find((section) => section.title.startsWith("Pourquoi"));
  assert.match(years.paragraphs.join(" "), /effectué en 2025.*année fiscale 2026/u);
  const payroll = guide.sections.find((section) =>
    section.title === "Comment un salarié utilise cette attestation ?"
  );
  assert.match(payroll.bullets.join(" "), /טופס 101, partie ח׳, rubrique 16/u);
  assert.match(payroll.bullets.join(" "), /plusieurs employeurs.*תיאום מס/u);
  assert.match(payroll.callout.text, /1111 extension 4/u);
  assert.ok(guide.sources.some((source) =>
    source.href === "https://www.miluim.idf.il/auth" &&
    /après connexion n’ont pas pu être vérifiés/u.test(source.note)
  ), "The authenticated flow must not be presented as inspected");
});
