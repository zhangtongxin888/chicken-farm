# Chicken Farm launch evidence

- Run ID: `chicken-farm-20260819-224500`
- Site: `Chicken Farm`
- Intended canonical URL: `https://chickenfarmgame.wiki/`
- Evidence updated: `2026-08-19T15:41:18Z`
- Current stage: `待总控验收（正式部署已就绪，DNS/GSC 因全批次浏览器锁未获放行而阻塞）`

Preview and `*.vercel.app` addresses below are deployment evidence only. They are not recorded as the formal site URL.

## Evidence table

| Check | URL / resource | Checked at (UTC) | Actual result | Evidence |
|---|---|---:|---|---|
| Independent repository | `https://github.com/zhangtongxin888/chicken-farm` | 2026-08-19T15:38:00Z | Passed | Git remote is the requested single-site repository; `main` was pushed successfully. |
| Source commit | `a02a241cce4bef329555d8eaa608331c904e3626` | 2026-08-19T15:38:00Z | Passed | Commit message `Launch Chicken Farm guide`; remote advanced from `c32843a` to `a02a241`. |
| Handoff validation | Grok research + Codex approval + Kimi design | 2026-08-19T15:36:00Z | Passed | Required `validate_handoffs.mjs` command returned `handoff validation passed`. |
| Design acceptance | `.launch/acceptance/design-approved.json` | 2026-08-19T15:36:00Z | Passed with recorded limitation | 375/768/1440 local DOM/CSS audits, link checks, contrast checks, HTTP tests, asset-license checks, and fact checks passed. The shared browser was not opened because the coordinator denied the lock; final independent visual recheck remains for the coordinator. |
| Local lint | `npm run lint` | 2026-08-19T15:36:00Z | Passed | 2 indexable pages, matching sitemap, metadata, internal links, fact exclusions, and responsive rules passed. |
| Local tests | `npm test` | 2026-08-19T15:36:00Z | Passed | 8 HTTP route and asset checks passed, including both HTML pages, CSS, JavaScript, robots, sitemap, OG image, and 404 behavior. |
| Local production build | `npm run build` | 2026-08-19T15:36:00Z | Passed | Lint and HTTP tests both passed through the production build command. |
| Vercel project | `zhangtongxin888s-projects/chicken-farm` (`prj_TnwH72rvzaCJhXbVgkRIFpKhaRpi`) | 2026-08-19T15:41:18Z | Passed | Project exists with framework `Other`, build command `npm run build`, output directory `public`. |
| GitHub integration | `zhangtongxin888/chicken-farm`, production branch `main` | 2026-08-19T15:37:01Z | Passed | Vercel project API reports GitHub link type, repository `chicken-farm`, organization `zhangtongxin888`, production branch `main`. |
| Production deployment | `dpl_5caPARs2EVjswKY1DMQT5NFwKFQV` | 2026-08-19T15:40:00Z | Ready | Git-triggered deployment from commit `a02a241cce4bef329555d8eaa608331c904e3626` reported `target=production`, `readyState=READY`, build `bld_jc02t96cu`; it was promoted after verification. |
| Deployment-only URL | `https://chicken-farm-axxyzz3v5-zhangtongxin888s-projects.vercel.app` | 2026-08-19T15:40:00Z | Ready, not formal | Kept only as deployment evidence; it must not be treated as the canonical production address. |
| Deployment homepage | Deployment `/` | 2026-08-19T15:38:17Z | HTTP 200 | Vercel authenticated curl returned HTML with the correct title, canonical, Open Graph image, JSON-LD, and the largest CTA targeting `/beginner-guide/`. |
| Deployment beginner guide | Deployment `/beginner-guide/` | 2026-08-19T15:38:30Z | HTTP 200 | Vercel authenticated curl returned the dedicated guide with its own title and canonical. |
| Deployment robots | Deployment `/robots.txt` | 2026-08-19T15:39:00Z | HTTP 200 | Allows `/` and declares `https://chickenfarmgame.wiki/sitemap.xml`. |
| Deployment sitemap | Deployment `/sitemap.xml` | 2026-08-19T15:39:10Z | HTTP 200, 2 URLs | Contains exactly the homepage and `/beginner-guide/` canonical URLs. |
| Canonical metadata | `public/index.html`, `public/beginner-guide/index.html` | 2026-08-19T15:36:00Z | Passed | Each indexable route has exactly one self-referencing HTTPS canonical for `chickenfarmgame.wiki`; sitemap and canonical routes match bidirectionally. |
| Social metadata | `https://chickenfarmgame.wiki/og.png` | 2026-08-19T15:36:00Z | Deployment asset passed; formal URL pending DNS | Both pages include absolute OG/Twitter image metadata and alt text. Generated image is stored at `public/og.png`, SHA256 `82dd31b0941850baac94de7b4e942c0f12db3e603dafeb9787cdbba6ebc07f6a`. |
| Apex domain attachment | `chickenfarmgame.wiki` | 2026-08-19T15:41:18Z | Attached and ownership verified; DNS misconfigured | Vercel domain API shows `verified=true`, project `prj_TnwH72rvzaCJhXbVgkRIFpKhaRpi`. DNS still points to the Spaceship parking A records. |
| `www` domain attachment | `www.chickenfarmgame.wiki` | 2026-08-19T15:41:18Z | Attached and ownership verified; DNS misconfigured | Vercel domain API shows `verified=true` and a project-level `308` redirect to `chickenfarmgame.wiki`; public DNS has not yet been changed. |
| DNS provider / nameservers | `launch1.spaceship.net`, `launch2.spaceship.net` | 2026-08-19T15:25:50Z | Confirmed | Public NS and SOA identify Spaceship as the authoritative DNS provider. |
| DNS pre-change snapshot | Apex A: `34.216.117.25`, `54.149.79.189`; no apex AAAA; no `www` CNAME; no MX/TXT observed | 2026-08-19T15:25:50Z | Saved; no records changed | Existing apex resolves to the Spaceship parking page. Browser lock was not granted, so the old records remain untouched and recoverable. |
| Required apex DNS | `@` A | 2026-08-19T15:39:30Z | Blocked by browser lock | Vercel strict verification recommends the full rank-1 set: `216.198.79.1` and `64.29.17.1`. Do not apply only one value. |
| Required `www` DNS | `www` CNAME | 2026-08-19T15:39:30Z | Blocked by browser lock | Vercel strict verification recommends `47d35ede56c48524.vercel-dns-017.com.`. |
| Formal apex HTTPS | `https://chickenfarmgame.wiki/` | 2026-08-19T15:26:13Z | Blocked / not live | Before any DNS change, HTTPS timed out and HTTP served a Spaceship parking page. It cannot be reported as the launched site. |
| Formal `www` redirect | `https://www.chickenfarmgame.wiki/` | 2026-08-19T15:41:18Z | Project rule configured, public check blocked | Vercel has the 308 rule, but DNS/TLS cannot work until the required CNAME is added. |
| Formal key pages | `https://chickenfarmgame.wiki/`, `/beginner-guide/` | 2026-08-19T15:41:18Z | Blocked by DNS | Validated on the Ready deployment only; formal-domain HTTP checks remain required after DNS and TLS. |
| Formal robots | `https://chickenfarmgame.wiki/robots.txt` | 2026-08-19T15:41:18Z | Blocked by DNS | Deployment copy is correct; formal-domain 200 check remains required. |
| Formal sitemap | `https://chickenfarmgame.wiki/sitemap.xml` | 2026-08-19T15:41:18Z | Blocked by DNS | Deployment copy is valid and contains 2 URLs; formal-domain 200 check remains required. |
| Google Search Console ownership | Domain Property `sc-domain:chickenfarmgame.wiki` | 2026-08-19T15:41:18Z | Not started; browser lock denied | Coordinator explicitly said not to open Chrome, Spaceship, or GSC. No verification record was requested or added. |
| GSC sitemap | `https://chickenfarmgame.wiki/sitemap.xml` | 2026-08-19T15:41:18Z | Not submitted | Must wait for formal HTTPS, robots, sitemap, and GSC ownership to pass. |
| GSC homepage indexing request | `https://chickenfarmgame.wiki/` | 2026-08-19T15:41:18Z | Not requested | Must be performed once after property verification and sitemap success. |

## DNS change and rollback plan

When the coordinator grants the batch browser lock, replace only the conflicting web records: set both apex A values to `216.198.79.1` and `64.29.17.1`, and set `www` CNAME to `47d35ede56c48524.vercel-dns-017.com.`. Preserve nameservers and any unrelated MX, TXT, CAA, verification, or subdomain records; the preflight observed no MX/TXT values but the DNS UI must still be rechecked immediately before writing.

If Vercel strict verification remains misconfigured, TLS does not become valid within the agreed propagation window, or an unrelated service is affected, restore the previous apex A values `34.216.117.25` and `54.149.79.189` and remove only the newly added `www` CNAME. Do not change nameservers.

## Provider and model record

| Role | Provider | Model | Artifact | Fallback |
|---|---|---|---|---|
| Research | Grok | `grok-4.6` | `.launch/research/grok-research-v1.json` | None |
| Research review | Codex | Current Codex review | `.launch/research/research-approved.json` | None |
| Candidate design | Kimi | `kimi-code/k3` | `.launch/design/kimi-design-v1.json` and candidate frontend | None; required handoff validator passed |
| Production implementation | Codex | `gpt-5.6-sol`, effort `xhigh` | Source, SEO, tests, Vercel configuration, deployment | None |

## Remaining acceptance actions

1. Obtain the global browser lock from the coordinator.
2. Recheck the live Spaceship zone, preserve unrelated records, and apply the exact Vercel DNS values above.
3. Confirm Vercel strict verification, apex and `www` TLS, apex 200, path-preserving `www` 308, key pages, robots, sitemap, canonical, and social image on the formal domain.
4. Verify the GSC Domain Property, submit the sitemap until its exact status is `Success`, and request indexing for the canonical homepage once.
5. Release the browser lock and let the coordinator independently verify all launch gates before marking the site successful.
