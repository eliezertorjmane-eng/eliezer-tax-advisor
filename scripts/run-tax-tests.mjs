import { execFileSync } from "node:child_process";
import { mkdtempSync, rmSync } from "node:fs";
import path from "node:path";

// Compile the pure tax modules with the existing TypeScript dependency; no extra test package is needed.
const buildDir = mkdtempSync(path.resolve(".tax-tests-"));
try {
  execFileSync(process.execPath, ["node_modules/typescript/bin/tsc", "--ignoreConfig", "lib/tax/bituahLeumi.ts", "lib/tax/childCreditPoints.ts", "lib/tax/pensiaHova.ts", "--outDir", buildDir, "--module", "commonjs", "--target", "ES2020", "--strict", "--skipLibCheck", "--esModuleInterop"], { stdio: "inherit" });
  execFileSync(process.execPath, ["--test", "tests/tax.test.mjs", "tests/pensiaHova.test.mjs"], { stdio: "inherit", env: { ...process.env, TAX_TEST_BUILD_DIR: buildDir } });
} catch (error) {
  process.exitCode = error.status ?? 1;
} finally {
  rmSync(buildDir, { recursive: true, force: true });
}
