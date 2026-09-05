---
name: new-post
description: Publish a new blog post on margadeshaka.com end to end — add it to app/data/blogPosts.ts, extend the hand-kept IndexNow URL list, run the gates CI runs (typecheck, build, verify:hosting) plus the a11y-reviewer, then branch and open a PR to develop on the user's yes. Encodes the founder's authoring rules so they are applied, not remembered.
disable-model-invocation: true
---

# /new-post — one post, every file it touches, every rule that applies

`app/data/blogPosts.ts` is the single source of truth for posts. Adding an entry to `posts`
automatically updates `/blog`, `generateStaticParams`, per-post metadata/OG/JSON-LD and
`app/sitemap.ts` (all read `getAllSlugs()` / `getPostBySlug()`). **One thing is not
automatic:** `scripts/ping-indexnow.sh` keeps its URL list by hand — extend it.

## 1. Collect the post

Ask for anything missing; show the assembled `BlogPost` object before writing it.

| field | rule |
|---|---|
| `slug` | kebab-case, unique (`grep -n "slug: '<slug>'" app/data/blogPosts.ts` must find nothing) |
| `title`, `excerpt` | plain punctuation — **no em-dashes** anywhere in post copy (founder rule); `excerpt` doubles as the meta description |
| `category` | one of `Vision`, `Engineering`, `Product`, `Trust`, `Wellness` |
| `accent` | one of `gold`, `purple`, `aurora` |
| `author` | to get the founder byline (initials disc, "Founder & CEO", JSON-LD jobTitle/LinkedIn) it must **byte-match** `company.founder.name` in `app/lib/company.ts` — check with `grep -n "name:" app/lib/company.ts`. Any other string renders a plain guest byline (the 2026 wellness posts are by `Vanshika`) |
| `date` / `isoDate` | human (`'5 September 2026'`) and ISO (`'2026-09-05'`); keep them the same day |
| `readTime` | e.g. `'6 min read'` — estimate from word count ÷ 200 |
| `featured` | exactly **one** post in the file may be `true`. If this post is featured, set the current featured post to `false` in the same edit |
| `cover` (optional) | make it with `cwebp -resize 1536 0 -q 82 -m 6 in.jpg -o public/images/blog/<slug>-cover.webp` (`-resize 1536 0` keeps the source aspect ratio — existing covers are 1536 wide but 863, 1024, or 1152 tall); after running it, read the real output size with `sips -g pixelWidth -g pixelHeight public/images/blog/<slug>-cover.webp` and write those two numbers as `width`/`height`; `src: '/images/blog/<slug>-cover.webp'`; `alt` describes the image and never repeats the title. Posts without a cover render no cover — do not add a stock placeholder |
| `body` | `BlogBlock[]` of `{ type: 'p' \| 'h2' \| 'quote', text }`. Inline links only as `[label](/path/)` or `[label](https://…)`; **at most two links per post**; internal links carry the trailing slash. Bulleted content is plain `p` blocks starting with `●` (known gap, no list type yet) |

Before editing, run these on the drafted text and fix anything they catch:

```bash
printf '%s' "$DRAFT" | grep -n '—' && echo "em-dash found: replace" || echo "no em-dashes"
```
```bash
printf '%s' "$DRAFT" | grep -o '\]([^)]*)' | wc -l
```
(≤ 2 links.) If the count is above 2, remove links until it is not — this is a gate, not a suggestion.

## 2. Edit `app/data/blogPosts.ts`

Show the current order first — **array order drives the listing grid and prev/next links**:

```bash
grep -n "slug: '" app/data/blogPosts.ts
```

Ask where the post goes (newest posts have gone at the top). Insert the object into
`export const posts: BlogPost[] = [ … ]` at that position, matching the two-space indent and
trailing commas of its neighbours. If `featured: true`, flip the previous featured post.

The `slash-check` hook runs on save and will flag any `](/path)` without a trailing slash.

## 3. Extend the IndexNow list

In `scripts/ping-indexnow.sh`, add one line inside `URLS=( … )`, in the same position the post
has among the blog URLs:

```
  "https://${HOST}/blog/<slug>/"
```

Trailing slash included — the script's own comment says why.

## 4. Gates — the same three CI runs, then the a11y review

```bash
npm run typecheck
```
```bash
npm run build
```
```bash
npm run verify:hosting
```

Then run the `a11y-reviewer` agent on `git diff` (new heading levels, the cover `alt`,
contrast of any new quote styling). Fix findings before continuing. **Do not use the
Playwright suite as a gate** — `smoke.spec.ts` and `accessibility.spec.ts` still assert
chakra-era selectors and fail for reasons unrelated to the post. Do not run `npm run lint`
(no ESLint config; it hangs — the `trap-guard` hook blocks it).

Optional local look: `npm run preview` serves `/out` on :3000 — stop it before any later
Playwright run.

## 5. Ship — on the user's explicit yes, and never directly to main

**Stop here.** Show the user the diff (`git diff --stat` and the new post's slug/position) and the exact branch name and PR title you intend to use, then wait for an explicit yes. Confirm `git status --short` shows only this post's files; if unrelated changes are present, ask the user to commit or stash them first — the new branch would carry them along. Do not run any command below until you have it. Everything below pushes to GitHub and opens a PR — outward-facing actions.

```bash
git fetch origin develop
```
```bash
git checkout -b content/<slug> origin/develop
```
```bash
git add app/data/blogPosts.ts scripts/ping-indexnow.sh
```
```bash
[ -f public/images/blog/<slug>-cover.webp ] && git add public/images/blog/<slug>-cover.webp
```
A `git add` with a pathspec that matches no file stages nothing at all — naming the cover file here for a post that has none would silently drop the other two files too, so the optional cover is staged in its own guarded command.
```bash
git commit -m "content(blog): add \"<title>\""
```
```bash
git push -u origin content/<slug>
```
```bash
gh pr create --base develop --title "content(blog): add \"<title>\"" --body "New post /blog/<slug>/. Gates: typecheck, build, verify:hosting, a11y-reviewer. IndexNow list extended."
```

Merging into `develop` deploys staging (`margadeshaka-staging.web.app`, noindex). Production
is a second PR `develop → main` — **never** a cherry-pick onto `main` (CLAUDE.md,
Infrastructure: that once left `main` with divergent duplicate commits).

## 6. After the production deploy — the user's step

`scripts/ping-indexnow.sh` POSTs the URL list to IndexNow; it is meant to run after every
production deploy. Remind the user to run it; do not run it yourself.

## Report

Slug, position in `posts`, featured flip (if any), the three gate results, the a11y verdict,
the PR URL (if created), and the reminder about IndexNow.
