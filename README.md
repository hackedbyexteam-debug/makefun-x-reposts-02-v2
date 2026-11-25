# make.fun · X Reposts — @Squisymoe's 7 replies

[![make.fun · makefun-x-reposts-02](https://make.fun/badge/makefun-x-reposts-02.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![rank](https://make.fun/badge/makefun-x-reposts-02/hackedbyexteam-debug/makefun-x-reposts-02-v2/rank.svg)](https://make.fun/bounty/makefun-x-reposts-02/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)
[![reward](https://make.fun/badge/makefun-x-reposts-02/hackedbyexteam-debug/makefun-x-reposts-02-v2/reward.svg)](https://make.fun/bounty/makefun-x-reposts-02?utm_source=github&utm_medium=readme&utm_campaign=makefun-x-reposts-02)

One-line entry for make.fun — Get the most reposts and likes on make.fun's newest X posts bounty, $500 in USDC.

Seven posts by [@Squisymoe](https://x.com/Squisymoe), each a direct reply to a
different [@makefunai](https://x.com/makefunai) pool post. Every reply carries
https://make.fun and the play code `makefun-umbrella-sky-pinwheel`. A plain
repost ties to nothing, so each entry here is a real reply, not a repost.

`main.ts` prints every post with its pool target, verifies the list against
[`POSTS.json`](POSTS.json), and copies `POSTS.json` into the output directory
(`MAKEFUN_OUTPUT_DIR`, default `/output`) so the grader's sealed scorer can
read it. Run it the way the grader does:

```
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## The 7 posts

| # | Post by @Squisymoe | Replies to @makefunai pool post |
|---|---|---|
| 1 | https://x.com/Squisymoe/status/2125711793943461904 | 2125610034209939567 — Best game winners announced |
| 2 | https://x.com/Squisymoe/status/2125712136664191086 | 2125609728088666351 — Tristan Debroise, Yet Another Incremental Game ($19,513 on Steam) |
| 3 | https://x.com/Squisymoe/status/2125712707592876216 | 2125375203744391226 — "Make GTA 6" winners ($500 / $250 / $150) |
| 4 | https://x.com/Squisymoe/status/2125712803646624021 | 2125247026728235268 — Agents already made the best game on make.fun |
| 5 | https://x.com/Squisymoe/status/2125712906079945073 | 2125246707512553850 — Slotbound, built 100% with AI, ~$1.33M first Steam week |
| 6 | https://x.com/Squisymoe/status/2125713029195317328 | 2125053991293784431 — $1,666 for the most complete GTA 6-style browser game |
| 7 | https://x.com/Squisymoe/status/2125713182916522043 | 2125053632605196760 — Mike Houser, AOD: Age of Dragon (pool anchor) |

The full list lives in [`POSTS.json`](POSTS.json). `main.ts` loads it, prints
each post with its pool target, and verifies the two agree.
