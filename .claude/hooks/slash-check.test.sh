#!/bin/bash
# Exercises slash-check.sh against fixtures in a temp "project" and against this repo's own
# app/ tree (which must be clean — CI's verify-trailing-slashes would already have failed otherwise).
set -u
H="$(cd "$(dirname "$0")" && pwd)/slash-check.sh"
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
T=$(mktemp -d); mkdir -p "$T/app/components" "$T/app/data"
trap 'rm -rf "$T"' EXIT
pass=0; fail=0
run() { CLAUDE_PROJECT_DIR="$1" bash -c "printf '{\"tool_name\":\"Edit\",\"tool_input\":{\"file_path\":\"%s\"}}' '$2' | bash '$H'" 2>/dev/null; echo $?; }
check() { if [ "$1" = "$2" ]; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL $3: want $1 got $2"; fi; }

w() { printf '%s\n' "$2" > "$1"; }
F="$T/app/components/Fixture.tsx"
w "$F" '<Link href="/blog">x</Link>';                      check 2 "$(run "$T" "$F")" 'href="/blog" flagged'
w "$F" "<Link href='/compliance'>x</Link>";                check 2 "$(run "$T" "$F")" "href='/compliance' flagged"
w "$F" '<Link href={`/privacy`}>x</Link>';                 check 2 "$(run "$T" "$F")" 'template href flagged'
w "$F" '<Link href="/blog/">x</Link>';                     check 0 "$(run "$T" "$F")" 'trailing slash ok'
w "$F" '<Link href="/">x</Link>';                          check 0 "$(run "$T" "$F")" 'root ok'
w "$F" '<a href="/#team">x</a>';                           check 0 "$(run "$T" "$F")" 'fragment ok'
w "$F" '<link rel="icon" href="/favicon.ico" />';          check 0 "$(run "$T" "$F")" 'asset ok'
w "$F" '<Link href={ROUTES.blog}>x</Link>';                check 0 "$(run "$T" "$F")" 'ROUTES ok'
w "$F" '<Link href={`/blog/${slug}`}>x</Link>';            check 0 "$(run "$T" "$F")" 'interpolated template skipped'
w "$F" '<a href="https://sakha.live/app">x</a>';           check 0 "$(run "$T" "$F")" 'external ok'
w "$F" '<Link href="/blog/?page=2">x</Link>';              check 0 "$(run "$T" "$F")" 'query after slash ok'
D="$T/app/data/blogPosts.ts"
w "$D" "text: 'see [why](/blog/why-margadeshaka) for more'"; check 2 "$(run "$T" "$D")" 'in-post link flagged'
w "$D" "text: 'see [why](/blog/why-margadeshaka/) for more'"; check 0 "$(run "$T" "$D")" 'in-post link ok'
w "$D" "text: 'see [WHO](https://www.who.int/x) for more'";   check 0 "$(run "$T" "$D")" 'external in-post ok'
w "$T/app/globals.css" 'a { color: red } /* href="/blog" */'; check 0 "$(run "$T" "$T/app/globals.css")" 'non-ts file ignored'
w "$T/README.md" 'href="/blog"';                            check 0 "$(run "$T" "$T/README.md")" 'outside app/ ignored'
w "$F" ' * links are written as [label](/href) and split at render time'; check 0 "$(run "$T" "$F")" 'JSDoc line skipped'
w "$F" '// e.g. href="/blog" would be wrong here';                      check 0 "$(run "$T" "$F")" 'line comment skipped'

# the real tree must be clean
bad=0
while IFS= read -r f; do r=$(run "$REPO" "$f"); [ "$r" = 0 ] || { bad=$((bad+1)); echo "  real tree finding in $f"; CLAUDE_PROJECT_DIR="$REPO" bash -c "printf '{\"tool_input\":{\"file_path\":\"%s\"}}' '$f' | bash '$H'"; }; done < <(find "$REPO/app" -type f \( -name '*.tsx' -o -name '*.ts' \) -not -path '*/node_modules/*')
check 0 "$bad" "today's app/ tree is clean"
echo "pass=$pass fail=$fail"; [ "$fail" = 0 ]
