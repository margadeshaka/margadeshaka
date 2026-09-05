#!/bin/bash
# Claude Code PostToolUse hook (Edit|Write) for margadeshaka: early warning for the
# trailing-slash convention. `next.config.js` sets trailingSlash: true AND
# skipTrailingSlashRedirect: true, so /blog is not broken, it is silently one 301 slower on
# every click — the convention has regressed twice (see app/lib/routes.ts). The authority is
# scripts/verify-trailing-slashes.mjs against the built export (CI); this hook just catches
# the literal before the build does. Exit 2 = findings on stderr (fed back to the model).
set -u
input=$(cat)
f=$(printf '%s' "$input" | jq -r '.tool_input.file_path // empty' 2>/dev/null) || exit 0
[ -n "$f" ] && [ -f "$f" ] || exit 0
root="${CLAUDE_PROJECT_DIR:-}"
[ -n "$root" ] || exit 0
case "$f" in "$root"/app/*.tsx|"$root"/app/*.ts) ;; *) exit 0 ;; esac

python3 - "$f" <<'PY'
import re
import sys

path = sys.argv[1]
try:
    lines = open(path, encoding="utf-8").read().splitlines()
except OSError:
    sys.exit(0)

HREF = re.compile(r'''href=(?:"(/[^"]*)"|'(/[^']*)'|\{`(/[^`]*)`\})''')
MDLINK = re.compile(r'\]\((/[^)\s]*)\)')


def suspicious(p: str) -> bool:
    if "${" in p:                      # interpolated template — cannot classify
        return False
    core = p.split("#", 1)[0].split("?", 1)[0]
    if core in ("", "/") or core.endswith("/"):
        return False
    return "." not in core.rsplit("/", 1)[-1]   # a dot in the last segment = an asset


bad = []
for n, line in enumerate(lines, 1):
    stripped = line.lstrip()
    if stripped.startswith(("//", "/*", "*")):
        continue
    for m in HREF.finditer(line):
        p = next(g for g in m.groups() if g is not None)
        if suspicious(p):
            bad.append((n, p))
    for m in MDLINK.finditer(line):
        if suspicious(m.group(1)):
            bad.append((n, m.group(1)))

if not bad:
    sys.exit(0)
err = sys.stderr
print(f"slash-check: {len(bad)} internal path(s) without a trailing slash in {path}", file=err)
for n, p in bad:
    print(f"  line {n}: {p}  ->  {p}/", file=err)
print("Route paths come from app/lib/routes.ts (ROUTES, blogPost(slug), homeSection(id)); every page URL ends in '/'.", file=err)
print("Do NOT slash usePathname() comparisons - those strip the slash on purpose (Navbar, SectionLink).", file=err)
print("scripts/verify-trailing-slashes.mjs (post-build, in CI) is the authority; this is early warning.", file=err)
sys.exit(2)
PY
