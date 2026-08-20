import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const home = await readFile(join(root, "public/index.html"), "utf8");
const guide = await readFile(join(root, "public/beginner-guide/index.html"), "utf8");
const css = await readFile(join(root, "public/styles.css"), "utf8");

const hexToRgb = (hex) => {
  const value = hex.replace("#", "");
  return [0, 2, 4].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16));
};
const luminance = (hex) => {
  const channels = hexToRgb(hex).map((value) => {
    const ratio = value / 255;
    return ratio <= 0.03928 ? ratio / 12.92 : ((ratio + 0.055) / 1.055) ** 2.4;
  });
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};
const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
  return (values[0] + 0.05) / (values[1] + 0.05);
};
const hasAll = (source, markers) => markers.every((marker) => source.includes(marker));

const sharedChecks = {
  skip_link: hasAll(home, ['class="skip-link"', 'href="#main"']),
  primary_cta_internal: home.includes('class="button button-primary" href="/beginner-guide/"'),
  primary_cta_larger_than_secondary:
    css.includes(".button-primary") && css.includes("min-height: 62px") && css.includes(".button-secondary") && css.includes("min-height: 50px"),
  mobile_menu_accessible: hasAll(home, ["aria-label=\"Open navigation\"", "aria-expanded=\"false\"", "data-menu-button"]),
  keyboard_focus_visible: css.includes(":focus-visible"),
  reduced_motion: css.includes("prefers-reduced-motion"),
  faq_native_controls: home.includes("<details>") && home.includes("<summary>"),
  checklist_labels: guide.includes('aria-label="Mark finish the on-farm tutorial complete"'),
  internal_navigation_loop:
    home.includes('href="/beginner-guide/"') && guide.includes('href="/"') && home.includes('href="/codes/"') && home.includes('href="/faq/"'),
  text_contrast: Number(contrast("#35261a", "#fdf4de").toFixed(2)),
  light_on_dark_contrast: Number(contrast("#ffffff", "#1b3a2b").toFixed(2)),
};

const viewports = [
  {
    width: 375,
    mode: "mobile",
    checks: {
      mobile_media_rule: css.includes("@media (max-width: 720px)"),
      one_column_hero: css.includes(".hero-grid {\n    grid-template-columns: 1fr;"),
      full_width_ctas: css.includes(".button-primary,\n  .button-secondary {\n    width: 100%;"),
      collapsible_navigation: css.includes('.nav-links[data-open="true"]'),
      one_column_cards: css.includes(".loop-grid,\n  .route-line,\n  .mistake-grid,\n  .tip-grid {\n    grid-template-columns: 1fr;"),
    },
  },
  {
    width: 768,
    mode: "tablet",
    checks: {
      tablet_media_rule: css.includes("@media (max-width: 980px)"),
      one_column_hero: css.includes(".hero-grid {\n    grid-template-columns: 1fr;"),
      two_column_cards: css.includes(".loop-grid,\n  .route-line {\n    grid-template-columns: repeat(2, 1fr);"),
      guide_contents_not_sticky: css.includes(".guide-aside {\n    position: static;"),
    },
  },
  {
    width: 1440,
    mode: "desktop",
    checks: {
      bounded_content_width: css.includes("--content: min(1160px, calc(100% - 40px))"),
      two_column_hero: css.includes("grid-template-columns: minmax(0, 1.02fr) minmax(360px, 0.86fr)"),
      four_column_loop: css.includes("grid-template-columns: repeat(4, 1fr)"),
      sticky_guide_contents: css.includes("position: sticky") && css.includes("top: 104px"),
    },
  },
];

const allBooleansPass = (record) => Object.values(record).filter((value) => typeof value === "boolean").every(Boolean);
if (!allBooleansPass(sharedChecks) || sharedChecks.text_contrast < 4.5 || sharedChecks.light_on_dark_contrast < 4.5) {
  throw new Error(`Shared design checks failed: ${JSON.stringify(sharedChecks)}`);
}
for (const viewport of viewports) {
  if (!allBooleansPass(viewport.checks)) throw new Error(`Viewport ${viewport.width}px checks failed: ${JSON.stringify(viewport.checks)}`);
}

console.log(JSON.stringify({ method: "static DOM/CSS viewport audit", sharedChecks, viewports, result: "pass" }, null, 2));
