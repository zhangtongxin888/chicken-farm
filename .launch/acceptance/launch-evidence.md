# Chicken Farm v3 launch evidence

- Run ID: `chicken-farm-20260820-043000`
- Site: `Chicken Farm`
- Formal URL: `https://chickenfarmgame.wiki/`
- Evidence updated: `2026-08-20T04:48:19Z`
- Current stage: `待总控验收`

Preview and `*.vercel.app` addresses are deployment evidence only. They are not the formal site URL.

## Acceptance summary

| Gate | Result | Evidence |
|---|---|---|
| Handoff validation | Passed | `validate_handoffs.mjs` passed for `.launch/research/grok-research-v2.json`, `.launch/research/research-approved.json`, and `.launch/design/kimi-design-v3.json`. Only the permitted Kimi design `run_id` correction was made. |
| Fact approval | Passed | Published copy uses only approved facts. Rejected facts `fact-073` and `fact-074`, matching-chicken advice, code timing and speculative failure causes, expanded gamepass behavior, broad Robux Skip reset claims, and cross-rarity earnings comparisons were removed. |
| Selective integration | Passed | Integrated the v3 HTML/CSS/sitemap and corrected source checks only. Candidate `.env.local`, old acceptance output, v1/v2 design packages, screenshots, Playwright logs, and cross-site files were not copied. |
| Formal pages | Passed | Eight static pages are present: `/`, `/beginner-guide/`, `/codes/`, `/rebirth/`, `/merge/`, `/gamepasses/`, `/updates/`, and `/faq/`. |
| Primary entry | Passed | The largest first-screen button is `Start the beginner guide`, links to `/beginner-guide/`, and is larger than the secondary Roblox button. |
| Local quality | Passed | `npm run lint`, `npm test`, `npm run build`, and `npm run audit:design` all passed. Tests use an available local port and a stable internal guide marker instead of the span-sensitive `money-making farm` text. |
| Design acceptance | Passed | `.launch/acceptance/design-approved.json` records all 8 pages at 375, 768, and 1440 CSS pixels, with no horizontal overflow and correct canonical URLs. |
| Commercial delivery preservation | Passed | The existing Adsterra config/runtime and Vercel CSP allowance from remote commit `94f5603` were retained. All eight pages load the same existing runtime; the config, runtime, and `vercel.json` were not modified by the v3 commit. |
| GitHub | Passed | Independent repository `https://github.com/zhangtongxin888/chicken-farm`, branch `main`, functional v3 commit `1c65fc9361c90409ad1656bec41e213b315a5ea7`. |
| Vercel production | Ready | Project `prj_TnwH72rvzaCJhXbVgkRIFpKhaRpi`; Git deployment `dpl_BKcG59SwPhCeNcJ5ErukePHeVY4d`, build `bld_nk3idk0k6`, target `production`, state `READY`, output directory `public`. |
| Formal-domain verification | Passed | The official launch verifier passed DNS, HTTPS, metadata, headers, robots, sitemap, all sitemap pages, self-canonicals, and alternate-host redirects. |
| GSC ownership | Preserved | Existing Domain Property `sc-domain:chickenfarmgame.wiki` was used. Ownership verification and DNS were not repeated or changed. |
| GSC sitemap | Passed | Re-submitted `https://chickenfarmgame.wiki/sitemap.xml`; GSC displayed `已成功提交站点地图`, status `成功`, and `已发现的网页` = `8` on `2026年8月20日`. |

## Detailed evidence

| Check | Resource | Checked at (UTC) | Result | Evidence |
|---|---|---:|---|---|
| Research package | `.launch/research/grok-research-v2.json` | 2026-08-20T04:29:36Z | Passed | Run ID matches approval and design. |
| Research approval | `.launch/research/research-approved.json` | 2026-08-20T04:29:36Z | Passed | SHA-256 `ecbad337524b93f22dd4d04b21505648d2f41eb370589a6b4225608d5179e4f7`. |
| Kimi v3 design | `.launch/design/kimi-design-v3.json` | 2026-08-20T04:29:36Z | Passed | SHA-256 `24a6c8814c2e30663a00b969758dcb35347ba1c7e1a82c524dc216d2c103326b`; provider Kimi, model `kimi-code/k3`. |
| Design acceptance | `.launch/acceptance/design-approved.json` | 2026-08-20T04:29:36Z | Passed | 24 route-width combinations checked across 375/768/1440; `clientWidth == scrollWidth` for every case. |
| Local lint | `npm run lint` | 2026-08-20T04:34:00Z | Passed | 8 indexable pages, exact sitemap parity, metadata, internal links, approved-content guards, and responsive rules. |
| HTTP tests | `npm test` | 2026-08-20T04:34:00Z | Passed | 14 route and asset checks. |
| Production build | `npm run build` | 2026-08-20T04:34:00Z | Passed | Lint, HTTP tests, and production build validation passed. |
| Static design audit | `npm run audit:design` | 2026-08-20T04:34:00Z | Passed | Responsive rules, accessibility affordances, internal primary CTA, and contrast checks passed. |
| Preserved app script | `public/app.js` | 2026-08-20T04:48:19Z | Unchanged | SHA-256 `7788cf0fb5b98d2e411a9cb1ebce27e59fa5c9b03241447078daefc29c70ff27`. |
| Preserved social image | `public/og.png` | 2026-08-20T04:48:19Z | Unchanged | SHA-256 `82dd31b0941850baac94de7b4e942c0f12db3e603dafeb9787cdbba6ebc07f6a`. |
| Preserved robots | `public/robots.txt` | 2026-08-20T04:48:19Z | Unchanged | SHA-256 `feda6dcf3d3f920311a75200793448c6f165e4bc3ec1e3f360c41751cd8347aa`. |
| Preserved Vercel config | `vercel.json` | 2026-08-20T04:48:19Z | Unchanged from remote commercial commit | SHA-256 `ab1354d59356bd15d8521c72623241626a4a233a70712a76b46d90b0f8278fb8`; security headers and advertising CSP sources remain present. |
| Preserved commercial config | `public/adsterra/config.js` | 2026-08-20T04:48:19Z | Unchanged | SHA-256 `48dd9819f3829dab61d632244b12c7e64719f9f08f29d94703a17940719a3a04`. |
| Preserved commercial runtime | `public/adsterra/runtime.js` | 2026-08-20T04:48:19Z | Unchanged | SHA-256 `bf6e026195f1cd279eb60392f622705ae01eafd7185202e53c7bae28c1130b2f`. |
| Git push | `origin/main` | 2026-08-20T04:35:38Z | Passed | Commit `1c65fc9361c90409ad1656bec41e213b315a5ea7` pushed through the configured system proxy. |
| Production deployment | `dpl_BKcG59SwPhCeNcJ5ErukePHeVY4d` | 2026-08-20T04:35:44Z | Ready | Git metadata matches functional commit `1c65fc9361c90409ad1656bec41e213b315a5ea7`; aliases include apex and `www`. |
| Apex homepage | `https://chickenfarmgame.wiki/` | 2026-08-20T04:36:38Z | HTTP 200 | Valid TLS, indexable HTML, one correct self-canonical. |
| Beginner guide | `https://chickenfarmgame.wiki/beginner-guide/` | 2026-08-20T04:36:38Z | HTTP 200 | Self-canonical matches route. |
| Codes | `https://chickenfarmgame.wiki/codes/` | 2026-08-20T04:36:38Z | HTTP 200 | Self-canonical matches route. |
| Rebirth | `https://chickenfarmgame.wiki/rebirth/` | 2026-08-20T04:36:38Z | HTTP 200 | Self-canonical matches route. |
| Merge | `https://chickenfarmgame.wiki/merge/` | 2026-08-20T04:36:38Z | HTTP 200 | Self-canonical matches route. |
| Gamepasses | `https://chickenfarmgame.wiki/gamepasses/` | 2026-08-20T04:36:38Z | HTTP 200 | Self-canonical matches route. |
| Updates | `https://chickenfarmgame.wiki/updates/` | 2026-08-20T04:36:38Z | HTTP 200 | Self-canonical matches route. |
| FAQ | `https://chickenfarmgame.wiki/faq/` | 2026-08-20T04:36:38Z | HTTP 200 | Self-canonical matches route. |
| Robots | `https://chickenfarmgame.wiki/robots.txt` | 2026-08-20T04:36:38Z | HTTP 200 | Allows crawling and declares the formal sitemap. |
| Sitemap | `https://chickenfarmgame.wiki/sitemap.xml` | 2026-08-20T04:36:38Z | HTTP 200 | Exactly 8 canonical-host URLs; all 8 return indexable 200 pages with self-canonicals. |
| `www` redirect | `https://www.chickenfarmgame.wiki/probe/path?x=1` | 2026-08-20T04:36:20Z | HTTP 308 | Redirects to `https://chickenfarmgame.wiki/probe/path?x=1`, preserving path and query. |
| HTTP upgrade | `http://chickenfarmgame.wiki/probe/path?x=1` | 2026-08-20T04:36:20Z | HTTP 308 | Redirects to the HTTPS apex URL. |
| Security headers | Formal homepage | 2026-08-20T04:36:38Z | Passed | CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` present. |
| Automated launch verifier | Formal domain | 2026-08-20T04:36:38Z | Passed | Every emitted check was `[PASS]`, including 8 sitemap pages and alternate-host redirects. |
| GSC existing property | `sc-domain:chickenfarmgame.wiki` | 2026-08-20T04:46:08Z | Preserved | Existing property opened directly; no ownership or DNS action was performed. |
| GSC sitemap re-submit | `https://chickenfarmgame.wiki/sitemap.xml` | 2026-08-20T04:46:24Z | Passed | Confirmation dialog displayed `已成功提交站点地图`. |
| GSC sitemap discovery | GSC sitemap table | 2026-08-20T04:46:29Z | Passed | Status `成功`, submitted/last-read date `2026年8月20日`, discovered pages `8`, discovered videos `0`. |
| Browser release | Temporary GSC pages | 2026-08-20T04:47:56Z | Passed | Both worker-created GSC tabs were closed; the worker-created `🔎 Chicken Farm GSC` group was removed after coordinator confirmation. No user-owned tab or DNS page was changed. |

## DNS and ownership preservation

The existing Spaceship DNS configuration, Google verification TXT, Vercel domain attachment, and GSC ownership were not modified. This v3 task reused the previously verified production domain and updated only the submitted sitemap record after its URL count changed from 2 to 8.

## Provider and model record

| Role | Provider | Model | Artifact | Fallback |
|---|---|---|---|---|
| Research | Grok | `grok-4.6` | `.launch/research/grok-research-v2.json` | None |
| Research review | Codex | Current Codex review | `.launch/research/research-approved.json` | None |
| Candidate design | Kimi | `kimi-code/k3` | `.launch/design/kimi-design-v3.json` and v3 candidate frontend | None; only the allowed run-ID correction was required |
| Production implementation and verification | Codex | `gpt-5.6-sol` | Formal source, tests, deployment, production verification, GSC sitemap update, and acceptance evidence | None |

## Remaining acceptance action

The required implementation, deployment, formal-domain checks, and GSC sitemap refresh are complete. The remaining action is the coordinator's independent acceptance review; this worker records the state only as `待总控验收` and does not declare final launch success.
