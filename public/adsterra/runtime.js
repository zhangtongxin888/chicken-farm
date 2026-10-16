// adsterra-plain-runtime
import { adsterraConfig } from "./config.js";

const ADSTERRA_RUNTIME_MARKER = "adsterra-plain-runtime";
const CLEAN_ROUTE_SEGMENTS = new Set(["about", "accessibility", "advertising-policy", "affiliate-disclosure", "contact", "cookie-policy", "cookies", "disclosure", "dmca", "editorial-policy", "legal", "privacy", "sources", "terms"]);
const MAX_VISIBLE_SLOTS = 3;
void ADSTERRA_RUNTIME_MARKER;
void Object.values(adsterraConfig);

function cleanRoute() {
  return window.location.pathname
    .split("/")
    .filter(Boolean)
    .some((segment) => CLEAN_ROUTE_SEGMENTS.has(segment));
}

function normalizeUrl(url) {
  if (!url) return undefined;
  return url.startsWith("//") ? `https:${url}` : url;
}

function addScript(id, url, parent = document.body) {
  const source = normalizeUrl(url);
  if (!source || document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.dataset.cfasync = "false";
  script.src = source;
  parent.appendChild(script);
}

function bannerConfig(size) {
  const suffix = size.replace("x", "x");
  const names = {
    "300x250": ["adsterraBanner300x250Key", "adsterraBanner300x250ScriptUrl", 300, 250],
    "320x50": ["adsterraBanner320x50Key", "adsterraBanner320x50ScriptUrl", 320, 50],
    "728x90": ["adsterraBanner728x90Key", "adsterraBanner728x90ScriptUrl", 728, 90],
    "468x60": ["adsterraBanner468x60Key", "adsterraBanner468x60ScriptUrl", 468, 60],
    "160x300": ["adsterraBanner160x300Key", "adsterraBanner160x300ScriptUrl", 160, 300],
    "160x600": ["adsterraBanner160x600Key", "adsterraBanner160x600ScriptUrl", 160, 600],
  };
  const [keyName, scriptName, width, height] = names[suffix];
  const key = adsterraConfig[keyName];
  const scriptUrl = normalizeUrl(adsterraConfig[scriptName]) ||
    (key ? `https://www.highperformanceformat.com/${key}/invoke.js` : undefined);
  return { key, scriptUrl, width, height };
}

function enqueueBanner(size, config, host) {
  const queue = (window.__adsterraBannerQueue = window.__adsterraBannerQueue || []);
  queue.push({ size, config, host });
  drainAdsterraBannerQueue();
}

function drainAdsterraBannerQueue() {
  const queue = window.__adsterraBannerQueue;
  if (!queue?.length || window.__adsterraBannerDraining) return;
  const job = queue[0];
  window.__adsterraBannerDraining = true;
  window.atOptions = {
    key: job.config.key,
    format: "iframe",
    height: job.config.height,
    width: job.config.width,
    params: {},
  };
  const script = document.createElement("script");
  script.id = `adsterra-banner-${job.size}`;
  script.async = true;
  script.dataset.cfasync = "false";
  script.src = job.config.scriptUrl;
  const release = () => {
    if (queue[0] === job) queue.shift();
    window.__adsterraBannerDraining = false;
    drainAdsterraBannerQueue();
  };
  script.addEventListener("load", release, { once: true });
  script.addEventListener("error", release, { once: true });
  job.host.appendChild(script);
}

function mountBanner(size, className) {
  const config = bannerConfig(size);
  if (!config.key || !config.scriptUrl) return;
  const shell = document.createElement("aside");
  shell.className = className;
  shell.setAttribute("aria-label", "Advertisement");
  const host = document.createElement("div");
  host.style.minHeight = `${config.height}px`;
  host.style.maxWidth = `${config.width}px`;
  shell.appendChild(host);
  document.body.appendChild(shell);
  enqueueBanner(size, config, host);
}

function ensureSlot(name, className) {
  let slot = document.querySelector(`[data-adsterra-slot="${name}"]`);
  if (!slot) {
    slot = document.createElement("aside");
    slot.className = className;
    slot.dataset.adsterraSlot = name;
    slot.setAttribute("aria-label", "Advertisement");
    const label = document.createElement("p");
    label.className = "ad-placement-label";
    label.textContent = "Advertisement";
    slot.appendChild(label);
  }
  return slot;
}

function mountBannerInto(size, shell) {
  if (shell.dataset.adsterraFilled === "banner") return true;
  const config = bannerConfig(size);
  if (!config.key || !config.scriptUrl) return false;
  const host = document.createElement("div");
  host.className = "ad-placement-host";
  host.style.minHeight = `${config.height}px`;
  host.style.width = "100%";
  host.style.maxWidth = `${config.width}px`;
  shell.appendChild(host);
  shell.dataset.adsterraFilled = "banner";
  enqueueBanner(size, config, host);
  return true;
}

export function mountAdsterraNative(container) {
  if (!container || !adsterraConfig.adsterraNative1Id || !adsterraConfig.adsterraNative1ScriptUrl) return false;
  if (container.dataset.adsterraFilled === "native") return true;
  const target = document.createElement("div");
  target.id = adsterraConfig.adsterraNative1Id.replace(/^#/, "");
  container.appendChild(target);
  container.dataset.adsterraFilled = "native";
  addScript("adsterra-native-1", adsterraConfig.adsterraNative1ScriptUrl, container);
  return true;
}

function insertAfterHeader(slot, main) {
  const header = document.querySelector("header");
  if (header) header.insertAdjacentElement("afterend", slot);
  else main.prepend(slot);
}

function placeEarlySlots(main) {
  const top = ensureSlot("top", "ad-placement ad-placement-top ad-placement-above-fold ad-placement-banner");
  const mid = ensureSlot("mid", "ad-placement ad-placement-mid ad-placement-native");
  const bottom = ensureSlot("bottom", "ad-placement ad-placement-bottom ad-placement-rectangle");
  mid.dataset.adsterraFormat = "native";

  if (!top.parentElement) {
    const heroContent = main.querySelector(":scope > .hero .hero-grid > .hero-content");
    const hero = main.querySelector(":scope > .page-hero, :scope > .hero, :scope > section");
    if (heroContent) {
      // Homepage: after the headline column and before the farm scene, so the title
      // stays first. Desktop CSS pulls this row full-width under the scene.
      heroContent.insertAdjacentElement("afterend", top);
    } else if (hero) {
      const overlap = hero.nextElementSibling;
      const anchor = overlap?.classList.contains("trust-strip") ? overlap : hero;
      anchor.insertAdjacentElement("afterend", top);
    } else {
      insertAfterHeader(top, main);
    }
    // A tall first screen (homepage farm scene on a phone) would hide the banner.
    // Pull it up under the header when it would otherwise start below the fold.
    if (top.getBoundingClientRect().top > window.innerHeight * 0.85) insertAfterHeader(top, main);
  }

  if (!bottom.parentElement) main.appendChild(bottom);

  if (!mid.parentElement) {
    const guideStep = main.querySelector(".guide-shell article");
    if (guideStep) {
      guideStep.insertAdjacentElement("afterend", mid);
    } else {
      const section = [...main.querySelectorAll(":scope > section")].find(
        (node) => !node.classList.contains("hero") && !node.classList.contains("page-hero") && !node.classList.contains("closing-card"),
      );
      if (section) section.insertAdjacentElement("afterend", mid);
      else bottom.insertAdjacentElement("beforebegin", mid);
    }
  }

  return { top, mid, bottom };
}

function mountEarlyPlacements() {
  const main = document.querySelector("main");
  if (!main) return;
  const { top, mid, bottom } = placeEarlySlots(main);
  const leaderboard = window.matchMedia("(min-width: 768px)").matches ? "728x90" : "320x50";
  let visible = 0;
  if (visible < MAX_VISIBLE_SLOTS && mountBannerInto(leaderboard, top)) visible += 1;
  else top.remove();
  if (visible < MAX_VISIBLE_SLOTS && mountAdsterraNative(mid)) visible += 1;
  else mid.remove();
  if (visible < MAX_VISIBLE_SLOTS && mountBannerInto("300x250", bottom)) visible += 1;
  else bottom.remove();
}

function mountAdsterraRuntime() {
  if (document.documentElement.dataset.adsterraRuntimeMounted === "1") return;
  document.documentElement.dataset.adsterraRuntimeMounted = "1";
  if (cleanRoute()) {
    document.querySelectorAll("[data-adsterra-slot]").forEach((slot) => slot.remove());
    return;
  }
  const loader = document.querySelector("script[data-adsterra-runtime]");
  if (loader?.dataset.globalFallback === "true" || document.querySelector("[data-adsterra-slot]")) {
    mountEarlyPlacements();
  }
  if (adsterraConfig.adsterraEnableStickyRail) mountBanner("160x600", "adsterra-sticky-rail");
  if (adsterraConfig.adsterraEnableSocialBar) {
    addScript("adsterra-social-bar", adsterraConfig.adsterraSocialBarScriptUrl);
  }
  if (adsterraConfig.adsterraEnablePopunder && adsterraConfig.adsterraPopunderScriptUrl) {
    const viewsKey = "roblox-site-adsterra-pageviews";
    const nextViews = Number(sessionStorage.getItem(viewsKey) || "0") + 1;
    sessionStorage.setItem(viewsKey, String(nextViews));
    if (nextViews >= adsterraConfig.adsterraPopunderMinPageViews) {
      window.setTimeout(
        () => addScript("adsterra-popunder", adsterraConfig.adsterraPopunderScriptUrl),
        adsterraConfig.adsterraPopunderDelayMs,
      );
    }
  }
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mountAdsterraRuntime, { once: true });
  } else {
    mountAdsterraRuntime();
  }
}
