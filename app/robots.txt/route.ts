import { siteUrl } from "@/lib/i18n";

export function GET() {
  const body = [
    "User-Agent: *",
    "Allow: /",
    "",
    `Host: ${siteUrl}`,
    `Sitemap: ${siteUrl}/sitemap.xml`
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
}
