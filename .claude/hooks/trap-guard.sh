#!/bin/bash
# Claude Code PreToolUse hook (Bash) for margadeshaka: the documented traps from CLAUDE.md
# "Development Commands", enforced before the command runs. Exit 2 blocks with the reason;
# exit 0 allows. Any parse problem exits 0 — a broken hook must never lock the shell.
set -u
input=$(cat)
cmd=$(printf '%s' "$input" | jq -r '.tool_input.command // empty' 2>/dev/null) || exit 0
[ -n "$cmd" ] || exit 0

# Flatten: drop line-continuation backslashes, then join lines with spaces, so a command
# split across lines is matched as the single command bash will run (grep is line-based).
cmd="$(printf '%s' "$cmd" | sed -e 's/\\[[:space:]]*$//' | tr '\n' ' ')"

m() { printf '%s' "$cmd" | grep -Eq -- "$1"; }
B='(^|[[:space:];&|])'
E='([[:space:]]|$)'
block() { printf 'BLOCKED by .claude/hooks/trap-guard.sh — %s\n' "$1" >&2; exit 2; }

# 1. `next lint` with no ESLint config drops into an interactive setup prompt and hangs.
if m "${B}npm[[:space:]]+run[[:space:]]+lint(:check)?${E}|${B}(npx[[:space:]]+)?next[[:space:]]+lint${E}"; then
  block "this repo has no ESLint config, so 'next lint' opens an interactive setup prompt and hangs. CI deliberately skips lint and gates on 'npm run typecheck' + 'npm run build'; use those."
fi

# 2. output: 'export' makes `next start` hard-error; `next export` is obsolete.
if m "${B}npm[[:space:]]+(run[[:space:]]+)?start${E}|${B}(npx[[:space:]]+)?next[[:space:]]+start${E}|${B}npm[[:space:]]+run[[:space:]]+export${E}|${B}(npx[[:space:]]+)?next[[:space:]]+export${E}"; then
  block "output: 'export' makes 'next start' hard-error and 'next export' is obsolete. Use 'npm run preview' (builds, then serves /out on :3000) or 'npm run dev'."
fi

# 3. Visual regression has no committed baselines: the first run fails everywhere and silently writes new ones.
if m "${B}npm[[:space:]]+run[[:space:]]+test:visual${E}" && ! m '--update-snapshots'; then
  block "test:visual has no committed baselines — the first run fails everywhere and writes new snapshots nobody reviewed. If that is intended, run it with '-- --update-snapshots' and review the files it creates."
fi

# 4. Playwright reuses whatever is already on :3000 (reuseExistingServer: !CI) — a dev server
#    would be audited instead of the production export.
if m "${B}npm[[:space:]]+(run[[:space:]]+)?test(:[a-z]+)?${E}|${B}(npx[[:space:]]+)?playwright[[:space:]]+test${E}"; then
  pid=$(lsof -nP -iTCP:3000 -sTCP:LISTEN -t 2>/dev/null | head -1)
  if [ -n "$pid" ]; then
    block "something is already listening on :3000 (pid $pid, $(ps -p "$pid" -o comm= 2>/dev/null | tr -d ' ')). playwright.config.ts has reuseExistingServer: !CI, so the suite would audit THAT server instead of the production export in /out. Stop it first, then re-run."
  fi
fi
exit 0
