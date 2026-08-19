import { execFileSync } from "node:child_process";

for (const script of ["lint.mjs", "test.mjs"]) {
  execFileSync(process.execPath, [`src/${script}`], {
    cwd: process.cwd(),
    stdio: "inherit",
  });
}

console.log("Production build checks passed.");
