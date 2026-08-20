import { spawn } from "node:child_process";
import { createServer } from "node:net";

const reservePort = () =>
  new Promise((resolve, reject) => {
    const probe = createServer();
    probe.unref();
    probe.once("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const address = probe.address();
      if (!address || typeof address === "string") {
        probe.close();
        reject(new Error("Could not reserve a local test port."));
        return;
      }
      probe.close((error) => (error ? reject(error) : resolve(address.port)));
    });
  });

const port = Number(process.env.TEST_PORT) || (await reservePort());
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(process.execPath, ["src/server.mjs"], {
  cwd: process.cwd(),
  env: { ...process.env, PORT: String(port) },
  stdio: ["ignore", "pipe", "pipe"],
});

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(`${baseUrl}/`);
      if (response.ok) return;
    } catch {
      // Server startup is still in progress.
    }
    await new Promise((resolve) => setTimeout(resolve, 50));
  }
  throw new Error("Local server did not become ready.");
};

try {
  await waitForServer();
  const expectations = [
    ["/", 200, "text/html", "Start the beginner guide"],
    ["/beginner-guide/", 200, "text/html", "Your first 10 minutes"],
    ["/codes/", 200, "text/html", "ABX"],
    ["/rebirth/", 200, "text/html", "Processing Level"],
    ["/merge/", 200, "text/html", "Merge pad"],
    ["/gamepasses/", 200, "text/html", "Auto Collect Eggs"],
    ["/updates/", 200, "text/html", "Update 7"],
    ["/faq/", 200, "text/html", "Skandi Studios"],
    ["/styles.css", 200, "text/css", ":root"],
    ["/app.js", 200, "text/javascript", "data-menu-button"],
    ["/robots.txt", 200, "text/plain", "Sitemap:"],
    ["/sitemap.xml", 200, "application/xml", "<urlset"],
    ["/og.png", 200, "image/png", null],
    ["/missing-page/", 404, "text/plain", "Page not found"],
  ];

  for (const [path, status, contentType, marker] of expectations) {
    const response = await fetch(`${baseUrl}${path}`);
    if (response.status !== status) throw new Error(`${path} returned ${response.status}, expected ${status}.`);
    if (!response.headers.get("content-type")?.includes(contentType)) {
      throw new Error(`${path} returned the wrong content type.`);
    }
    if (marker && !(await response.text()).includes(marker)) throw new Error(`${path} is missing ${marker}.`);
  }

  console.log(`Tests passed: ${expectations.length} HTTP route and asset checks.`);
} finally {
  server.kill("SIGTERM");
  await new Promise((resolve) => server.once("exit", resolve));
}
