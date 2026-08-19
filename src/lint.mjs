import { access, readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const canonicalOrigin = "https://chickenfarmgame.wiki";
const pages = new Map([
  ["/", "public/index.html"],
  ["/beginner-guide/", "public/beginner-guide/index.html"],
]);
const requiredFiles = [
  ...pages.values(),
  "public/app.js",
  "public/styles.css",
  "public/og.png",
  "public/robots.txt",
  "public/sitemap.xml",
  "vercel.json",
];

const fail = (message) => {
  throw new Error(message);
};

for (const file of requiredFiles) await access(join(root, file));

const htmlByRoute = new Map();
for (const [route, file] of pages) {
  const html = await readFile(join(root, file), "utf8");
  htmlByRoute.set(route, html);

  const canonicalMatches = [...html.matchAll(/<link\s+rel="canonical"\s+href="([^"]+)"/g)];
  if (canonicalMatches.length !== 1) fail(`${file} must contain exactly one canonical link.`);
  const expectedCanonical = route === "/" ? `${canonicalOrigin}/` : `${canonicalOrigin}${route}`;
  if (canonicalMatches[0][1] !== expectedCanonical) fail(`${file} has the wrong canonical URL.`);

  for (const [label, pattern] of [
    ["description", /<meta\s+[\s\S]*?name="description"[\s\S]*?>/],
    ["robots", /<meta\s+name="robots"\s+content="index,follow,max-image-preview:large"/],
    ["Open Graph title", /<meta\s+property="og:title"/],
    ["Open Graph description", /<meta\s+property="og:description"/],
    ["Open Graph URL", new RegExp(`<meta\\s+property="og:url"\\s+content="${expectedCanonical}"`)],
    ["Open Graph image", new RegExp(`<meta\\s+property="og:image"\\s+content="${canonicalOrigin}/og.png"`)],
    ["Twitter card", /<meta\s+name="twitter:card"\s+content="summary_large_image"/],
  ]) {
    if (!pattern.test(html)) fail(`${file} is missing required metadata: ${label}`);
  }

  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (jsonLdBlocks.length === 0) fail(`${file} must include JSON-LD.`);
  for (const block of jsonLdBlocks) JSON.parse(block[1]);

  if (/\b(?:TODO|TBD|lorem ipsum|placeholder)\b/i.test(html)) fail(`${file} contains placeholder copy.`);
}

const home = htmlByRoute.get("/");
if (!home.includes('class="button button-primary" href="/beginner-guide/"')) {
  fail("The homepage largest CTA must link to the internal beginner guide.");
}
if (/class="button button-primary"[^>]+href="https?:\/\//.test(home)) {
  fail("The homepage primary CTA cannot link to an external site.");
}

const idsByRoute = new Map(
  [...htmlByRoute].map(([route, html]) => [route, new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]))]),
);

for (const [sourceRoute, html] of htmlByRoute) {
  for (const match of html.matchAll(/<a\b[^>]*\shref="([^"]+)"[^>]*>/g)) {
    const href = match[1];
    if (href.startsWith("https://www.roblox.com/games/137233438285284/Chicken-Farm")) continue;
    const target = new URL(href, `${canonicalOrigin}${sourceRoute}`);
    if (target.origin !== canonicalOrigin) fail(`Unapproved external link in ${sourceRoute}: ${href}`);
    const targetRoute = target.pathname.endsWith("/") ? target.pathname : `${target.pathname}/`;
    if (!pages.has(targetRoute)) fail(`Broken internal route in ${sourceRoute}: ${href}`);
    if (target.hash && !idsByRoute.get(targetRoute).has(target.hash.slice(1))) {
      fail(`Broken fragment in ${sourceRoute}: ${href}`);
    }
  }
}

const combinedHtml = [...htmlByRoute.values()].join("\n");
for (const forbidden of [
  /1,000,000/,
  /THANKSFOR100K/i,
  /50MVisits/i,
  /complete chicken tier/i,
  /official Chicken Farm wiki/i,
]) {
  if (forbidden.test(combinedHtml)) fail(`Published copy contains an excluded or unapproved claim: ${forbidden}`);
}

const stylesheet = await readFile(join(root, "public/styles.css"), "utf8");
for (const marker of [":focus-visible", "prefers-reduced-motion", "@media (max-width: 980px)", "@media (max-width: 720px)"]) {
  if (!stylesheet.includes(marker)) fail(`Responsive/accessibility stylesheet marker missing: ${marker}`);
}

const robots = await readFile(join(root, "public/robots.txt"), "utf8");
if (!robots.includes("Allow: /") || !robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)) {
  fail("robots.txt must allow crawling and declare the production sitemap.");
}

const sitemap = await readFile(join(root, "public/sitemap.xml"), "utf8");
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
const canonicalUrls = [...pages.keys()].map((route) => (route === "/" ? `${canonicalOrigin}/` : `${canonicalOrigin}${route}`)).sort();
if (JSON.stringify(sitemapUrls) !== JSON.stringify(canonicalUrls)) {
  fail("Sitemap URLs and public canonical HTML routes do not match.");
}

const vercel = JSON.parse(await readFile(join(root, "vercel.json"), "utf8"));
if (vercel.outputDirectory !== "public" || vercel.buildCommand !== "npm run build") {
  fail("Vercel must publish only the validated public directory.");
}

console.log(`Lint passed: ${pages.size} indexable pages, matching sitemap, metadata, links, facts, and responsive rules.`);
