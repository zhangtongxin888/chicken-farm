import { spawn } from "node:child_process";

const port = 4174;
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
    ["/", 200, "text/html", "Build a smarter flock"],
    ["/beginner-guide/", 200, "text/html", "Your first 10 minutes"],
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
