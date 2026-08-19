# Chicken Farm launch evidence

- Run ID: `chicken-farm-20260819-224500`
- Site: `Chicken Farm`
- Canonical URL: `https://chickenfarmgame.wiki/`
- Evidence updated: `2026-08-19T18:15:14Z`
- Current stage: `待总控验收`

Preview and `*.vercel.app` addresses are deployment evidence only. They are not the formal site URL.

## Acceptance summary

| Gate | Actual result |
|---|---|
| DNS preflight | Spaceship authoritative zone confirmed on `launch1.spaceship.net` and `launch2.spaceship.net`. Before the change the DNS-record UI had 0 custom records, no URL redirects, public apex parking A values `34.216.117.25` and `54.149.79.189`, and no `www` CNAME. No MX, TXT, CAA, or unrelated custom subdomain record was present to replace. Nameservers were not changed. |
| DNS change | Replaced only the conflicting web destination by adding both rank-1 apex A records `216.198.79.1` and `64.29.17.1`, plus `www` CNAME `47d35ede56c48524.vercel-dns-017.com.`. The two apex A values were kept as one complete recommendation set. |
| GSC TXT addition | Appended apex TXT `google-site-verification=qyninubveK86Me1jjaA29kxpajoVVePUvCEzKPj4U_4`; no A/CNAME record or other TXT was removed. |
| DNS propagation | Both authoritative nameservers, `1.1.1.1`, and `8.8.8.8` return the two new apex A values, the project-specific `www` CNAME, and the GSC TXT. |
| Vercel domain configuration | `vercel domains verify` returns `status=ok`, `reason=configured_correctly`, `misconfigured=false`, `conflicts=[]`, `attached=true`, and `verified=true` for both apex and `www`. Apex is configured by the full A pair; `www` is configured by the project-specific CNAME. |
| TLS | Certificate `cert_dKg5ecq2tkhwGpEyd8J8iQTK` covers both `chickenfarmgame.wiki` and `www.chickenfarmgame.wiki`, is renewable, and was listed with 90 days remaining at final verification. HTTPS works on both hosts. |
| Formal HTTP matrix | Apex `/`, `/beginner-guide/`, `/robots.txt`, and `/sitemap.xml` each return 200. `https://www.chickenfarmgame.wiki/probe/path?x=1` returns 308 with `Location: https://chickenfarmgame.wiki/probe/path?x=1`, preserving path and query. HTTP upgrades permanently to HTTPS. |
| Canonical and sitemap | Homepage canonical is exactly `https://chickenfarmgame.wiki/`; the guide canonical is exactly `https://chickenfarmgame.wiki/beginner-guide/`. Sitemap contains those 2 canonical HTML URLs, and both return indexable 200 pages with one self-canonical. |
| Launch verifier | `python3 "$HOME/.codex/skills/production-website-launch/scripts/verify_launch.py" chickenfarmgame.wiki` completed with every check `[PASS]`, including HTTP-to-HTTPS, sitemap pages, alternate-host 308, and alternate-host HTTP redirect. |
| GSC ownership | Domain Property `sc-domain:chickenfarmgame.wiki` was created and the UI displayed the exact success text `已自动完成所有权验证`; verification method shown was `域名提供商`. |
| GSC sitemap | Submitted `https://chickenfarmgame.wiki/sitemap.xml` once. The UI displayed `已成功提交站点地图`; the sitemap table status was exactly `成功`, with submitted/last-read date `2026年8月20日`, discovered pages `2`, and discovered videos `0`. |
| GSC indexing | Requested indexing for `https://chickenfarmgame.wiki/` exactly once. The success dialog displayed `已请求编入索引` and `已将网址添加到优先抓取队列中。 多次提交同一网页并不能改变该网页的队列顺序或优先级。` |
| Formal visual check | Passed at 375x900, 768x1024, and 1440x900 in an isolated browser session. Each viewport had `scrollWidth` equal to its viewport width, with no clipping or overlap observed. The largest visible clickable at all three sizes was `Start the beginner guide →`, targeting the internal `/beginner-guide/` route. A real click reached `https://chickenfarmgame.wiki/beginner-guide/`, not Roblox. |
| Browser release | The isolated `chicken-visual` and `chicken-cta` sessions were closed and no longer appear in the active-session list. The authorized Chrome work tab received `Cmd+W`; browser interaction with Chicken Farm, Spaceship, and GSC then stopped. |

## Detailed evidence

| Check | Resource | Checked at (UTC) | Result | Evidence |
|---|---|---:|---|---|
| Independent repository | `https://github.com/zhangtongxin888/chicken-farm` | 2026-08-19T18:12:00Z | Passed | Dedicated repository on `main`; launch routing fix commit `2d520d3853a9533f4da55bc67228cbef5a8d7894` was pushed. |
| Local lint | `npm run lint` | 2026-08-19T18:12:00Z | Passed | 2 indexable pages, matching sitemap, metadata, links, facts, and responsive rules. |
| Local tests | `npm test` | 2026-08-19T18:12:00Z | Passed | 8 HTTP route and asset checks. |
| Local production build | `npm run build` | 2026-08-19T18:12:00Z | Passed | Lint, HTTP tests, and production build validation passed. |
| Vercel project | `zhangtongxin888s-projects/chicken-farm` (`prj_TnwH72rvzaCJhXbVgkRIFpKhaRpi`) | 2026-08-19T18:13:31Z | Passed | Correct scope and project; framework `Other`, build command `npm run build`, output directory `public`. |
| Production deployment | `dpl_8exrgkfe4irTMKRhoamR4tC44JEp` | 2026-08-19T18:13:31Z | Ready | Git-triggered deployment from commit `2d520d3` reports `target=production`, `readyState=READY`, build `bld_qrnx9royo`; aliases include apex and `www`. |
| Redirect normalization fix | `vercel.json` | 2026-08-19T18:13:31Z | Passed | Removed global trailing-slash normalization, which altered arbitrary probe paths, and added one permanent `/beginner-guide` to `/beginner-guide/` redirect. This keeps the required guide URL at 200 while preserving arbitrary paths through HTTP and alternate-host redirects. |
| DNS provider | `launch1.spaceship.net`, `launch2.spaceship.net` | 2026-08-19T18:14:50Z | Passed | Authoritative nameservers remain Spaceship; no nameserver change was made. |
| Apex DNS | `chickenfarmgame.wiki A` | 2026-08-19T18:14:50Z | Passed | Authoritative NS, `1.1.1.1`, and `8.8.8.8` all return `216.198.79.1` and `64.29.17.1`. |
| Alternate-host DNS | `www.chickenfarmgame.wiki CNAME` | 2026-08-19T18:14:50Z | Passed | Authoritative NS, `1.1.1.1`, and `8.8.8.8` all return `47d35ede56c48524.vercel-dns-017.com.`. |
| GSC DNS record | `chickenfarmgame.wiki TXT` | 2026-08-19T18:14:50Z | Passed | Full Google verification TXT is visible from both authoritative NS and both public resolvers. |
| Apex Vercel verification | `chickenfarmgame.wiki` | 2026-08-19T18:14:25Z | Passed | `misconfigured=false`, full current A pair present, `conflicts=[]`, project attached and verified. |
| `www` Vercel verification | `www.chickenfarmgame.wiki` | 2026-08-19T18:14:25Z | Passed | `misconfigured=false`, expected current CNAME present, `conflicts=[]`, project attached and verified. |
| Apex HTTPS | `https://chickenfarmgame.wiki/` | 2026-08-19T18:14:25Z | HTTP 200 | Formal homepage served by Vercel with valid TLS and self-canonical metadata. |
| Beginner guide | `https://chickenfarmgame.wiki/beginner-guide/` | 2026-08-19T18:14:25Z | HTTP 200 | Dedicated guide served on the required slash URL with its own self-canonical. |
| Robots | `https://chickenfarmgame.wiki/robots.txt` | 2026-08-19T18:14:25Z | HTTP 200 | Allows crawling and declares the single formal sitemap. |
| Sitemap | `https://chickenfarmgame.wiki/sitemap.xml` | 2026-08-19T18:14:25Z | HTTP 200 | Valid sitemap with exactly 2 canonical HTML URLs. |
| `www` redirect | `https://www.chickenfarmgame.wiki/probe/path?x=1` | 2026-08-19T18:14:25Z | HTTP 308 | Location is exactly `https://chickenfarmgame.wiki/probe/path?x=1`. |
| Automated launch verification | Formal domain | 2026-08-19T18:13:54Z | Passed | All emitted checks were `[PASS]`; no warning or failure remained. |
| Design acceptance | `.launch/acceptance/design-approved.json` | 2026-08-19T18:10:54Z | Passed | Formal-domain visual inspection replaced the former local-only limitation without changing the recorded Kimi candidate-design provider. |

## DNS rollback point

The pre-change public web destination was the Spaceship parking state: apex A `34.216.117.25` and `54.149.79.189`, with no `www` CNAME and no custom DNS records in the provider UI. If rollback is required, remove only the two newly added apex A records and the newly added `www` CNAME so the provider parking state can return; remove the Google TXT only if GSC ownership is intentionally being abandoned. Do not change nameservers or delete unrelated records.

## Provider and model record

| Role | Provider | Model | Artifact | Fallback |
|---|---|---|---|---|
| Research | Grok | `grok-4.6` | `.launch/research/grok-research-v1.json` | None |
| Research review | Codex | Current Codex review | `.launch/research/research-approved.json` | None |
| Candidate design | Kimi | `kimi-code/k3` | `.launch/design/kimi-design-v1.json` and candidate frontend | None; handoff validator passed |
| Production implementation and launch | Codex | `gpt-5.6-sol`, effort `xhigh` | Source, SEO, tests, Vercel configuration, DNS, GSC, and acceptance evidence | None |

## Remaining acceptance action

The implementation and launch checks are complete. The only remaining step is the coordinator's independent acceptance review; this worker records the stage only as `待总控验收` and does not declare final launch success.
