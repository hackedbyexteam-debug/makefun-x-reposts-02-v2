import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

export interface XRepost {
  /** The entrant's own post on X, by @Squisymoe. */
  post: string;
  /** The @makefunai pool post this post directly replies to. */
  poolPostId: string;
  /** What the pool post is about. */
  poolTopic: string;
}

/**
 * Seven direct replies from @Squisymoe, each to a different @makefunai
 * pool post (pool = @makefunai's own posts from 2125053632605196760 on).
 * Every reply carries https://make.fun and the play code
 * makefun-umbrella-sky-pinwheel. A plain repost ties to nothing, so each
 * entry here is a real reply (in_reply_to), not a repost.
 *
 * The grader runs this file and then a sealed scorer reads the output
 * directory: this file copies POSTS.json from the repository into the
 * output directory, byte for byte. That copy is the entry's real job.
 */
export const POSTS: XRepost[] = [
  {
    post: "https://x.com/Squisymoe/status/2125711793943461904",
    poolPostId: "2125610034209939567",
    poolTopic: "Best game winners announced",
  },
  {
    post: "https://x.com/Squisymoe/status/2125712136664191086",
    poolPostId: "2125609728088666351",
    poolTopic: "Tristan Debroise — Yet Another Incremental Game, $19,513 on Steam",
  },
  {
    post: "https://x.com/Squisymoe/status/2125712707592876216",
    poolPostId: "2125375203744391226",
    poolTopic: "Make GTA 6 winners: zor-vink $500, quick-lark-12 $250, superskie $150",
  },
  {
    post: "https://x.com/Squisymoe/status/2125712803646624021",
    poolPostId: "2125247026728235268",
    poolTopic: "Agents already made the best game on make.fun",
  },
  {
    post: "https://x.com/Squisymoe/status/2125712906079945073",
    poolPostId: "2125246707512553850",
    poolTopic: "Slotbound — built 100% with AI, nearly $1.33M in its first Steam week",
  },
  {
    post: "https://x.com/Squisymoe/status/2125713029195317328",
    poolPostId: "2125053991293784431",
    poolTopic: "$1,666 for the most complete GTA 6-style browser game",
  },
  {
    post: "https://x.com/Squisymoe/status/2125713182916522043",
    poolPostId: "2125053632605196760",
    poolTopic: "Mike Houser — AOD: Age of Dragon (the pool anchor post)",
  },
];

function loadPostsJson(botDir: string): string[] {
  const raw = readFileSync(join(botDir, "POSTS.json"), "utf8");
  const parsed: unknown = JSON.parse(raw);
  if (
    typeof parsed !== "object" ||
    parsed === null ||
    !Array.isArray((parsed as { posts?: unknown }).posts)
  ) {
    throw new Error("POSTS.json must be an object with a posts array");
  }
  return (parsed as { posts: string[] }).posts;
}

function main(): void {
  const botDir = process.env.MAKEFUN_BOT_DIR ?? "/bot";
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  const urls = loadPostsJson(botDir);
  console.log(`make.fun x-reposts-02 — ${urls.length} posts by @Squisymoe`);
  for (const entry of POSTS) {
    console.log(`- ${entry.post}`);
    console.log(`  replies to pool post ${entry.poolPostId} (${entry.poolTopic})`);
  }
  const missing = POSTS.filter((p) => !urls.includes(p.post));
  if (missing.length > 0) {
    throw new Error(`POSTS.json is missing ${missing.length} post(s) listed in main.ts`);
  }
  if (urls.length !== POSTS.length) {
    throw new Error("POSTS.json and main.ts disagree on the post count");
  }
  const seenPoolIds = new Set<string>();
  for (const entry of POSTS) {
    if (seenPoolIds.has(entry.poolPostId)) {
      throw new Error(
        `Two posts reply to the same pool post ${entry.poolPostId} — each entry must reply to a different @makefunai pool post`,
      );
    }
    seenPoolIds.add(entry.poolPostId);
  }
  try {
    mkdirSync(outputDir, { recursive: true });
    copyFileSync(join(botDir, "POSTS.json"), join(outputDir, "POSTS.json"));
  } catch (err) {
    console.error(`failed to copy POSTS.json to ${outputDir}: ${err}`);
    process.exit(1);
  }
  console.log("All 7 posts verified against POSTS.json.");
  console.log(
    `Summary: ${POSTS.length} posts, ${seenPoolIds.size} distinct pool targets — every reply targets a different @makefunai pool post.`,
  );
}

main();
