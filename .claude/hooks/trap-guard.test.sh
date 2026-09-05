#!/bin/bash
# Exercises trap-guard.sh with representative commands. For the :3000 rule it briefly starts a
# python http.server on 127.0.0.1:3000 and kills it again. Never runs npm or playwright.
set -u
H="$(cd "$(dirname "$0")" && pwd)/trap-guard.sh"
pass=0; fail=0
srv=""
trap '[ -n "$srv" ] && kill "$srv" 2>/dev/null' EXIT
check() { # want_exit command...
  local want=$1; shift
  printf '{"tool_name":"Bash","tool_input":{"command":%s}}' "$(printf '%s' "$*" | jq -Rs .)" | bash "$H" >/dev/null 2>&1
  local got=$?
  if [ "$got" = "$want" ]; then pass=$((pass+1)); else fail=$((fail+1)); echo "FAIL want $want got $got: $*"; fi
}
# lint trap
check 2 'npm run lint'
check 2 'npm run lint:check'
check 2 'npx next lint'
check 2 'cd /Users/com/marg/margadeshaka && npm run lint'
# export/start trap
check 2 'npm start'
check 2 'npm run start'
check 2 'npx next start'
check 2 'npm run export'
# visual baselines
check 2 'npm run test:visual'
check 0 'npm run test:visual -- --update-snapshots'
# always fine
check 0 'npm run typecheck'
check 0 'npm run build'
check 0 'npm run dev'
check 0 'npm run preview'
check 0 'npm run verify:hosting'
check 0 'npm ci'
check 0 'git status'
check 0 'ls -la'

# :3000 rule — needs the port free to test both branches
if lsof -nP -iTCP:3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
  echo "SKIP :3000 cases — something is already listening on :3000 (own dev server?)"
  check 2 'npm test'   # whatever is there, the hook must block
else
  check 0 'npm test'
  check 0 'npx playwright test tests/smoke.spec.ts --project=chromium'
  python3 -m http.server 3000 --bind 127.0.0.1 >/dev/null 2>&1 &
  srv=$!
  for _ in 1 2 3 4 5 6 7 8 9 10; do lsof -nP -iTCP:3000 -sTCP:LISTEN -t >/dev/null 2>&1 && break; sleep 0.3; done
  check 2 'npm test'
  check 2 'npm run test:accessibility'
  check 2 'npx playwright test'
  check 0 'npm run typecheck'   # unrelated commands still pass while :3000 is busy
  kill "$srv" 2>/dev/null; wait "$srv" 2>/dev/null
  for _ in 1 2 3 4 5 6 7 8 9 10; do lsof -nP -iTCP:3000 -sTCP:LISTEN -t >/dev/null 2>&1 || break; sleep 0.3; done
  check 0 'npm test'
fi
echo "pass=$pass fail=$fail"; [ "$fail" = 0 ]
