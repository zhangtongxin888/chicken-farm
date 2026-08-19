import { createReadStream, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), "public");
const port = Number(process.env.PORT || 4173);
const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
};

createServer((request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  const requestedPath = decodeURIComponent(url.pathname);
  const relativePath = normalize(requestedPath).replace(/^(\.\.(\/|\\|$))+/, "");
  let filePath = join(root, relativePath);

  try {
    if (requestedPath.endsWith("/") || statSync(filePath).isDirectory()) {
      filePath = join(filePath, "index.html");
    }
    const stats = statSync(filePath);
    if (!stats.isFile() || !filePath.startsWith(root)) throw new Error("Not found");
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] || "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    if (request.method === "HEAD") response.end();
    else createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Page not found");
  }
}).listen(port, () => {
  console.log(`Chicken Farm candidate running at http://localhost:${port}`);
});
