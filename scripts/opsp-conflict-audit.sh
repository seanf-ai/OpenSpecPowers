#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="${1:-$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)}"

failures=0
declare -a runtime_targets=()

if [ -d "$ROOT_DIR/src" ]; then
  runtime_targets+=("$ROOT_DIR/src")
fi
if [ -d "$ROOT_DIR/docs" ]; then
  runtime_targets+=("$ROOT_DIR/docs")
fi
if [ -f "$ROOT_DIR/README.md" ]; then
  runtime_targets+=("$ROOT_DIR/README.md")
fi
if [ -d "$ROOT_DIR/.codex/skills" ]; then
  runtime_targets+=("$ROOT_DIR/.codex/skills")
fi
if [ -d "$ROOT_DIR/.codex-home/prompts" ]; then
  runtime_targets+=("$ROOT_DIR/.codex-home/prompts")
fi

check_empty() {
  local label="$1"
  local pattern="$2"
  shift 2
  local hits
  if [ "$#" -eq 0 ]; then
    printf '[WARN] %s (skipped: no targets)\n' "$label"
    return 0
  fi
  hits="$(rg -n "$pattern" "$@" || true)"
  if [ -n "$hits" ]; then
    printf '[FAIL] %s\n' "$label"
    printf '%s\n' "$hits" | sed -n '1,20p'
    failures=$((failures + 1))
  else
    printf '[OK] %s\n' "$label"
  fi
}

echo "OpenSpecPowers conflict audit"
echo "Root: $ROOT_DIR"

# Runtime-critical source/docs should not use legacy trigger prefixes.
check_empty "No legacy /opsx trigger in runtime artifacts" '/opsx:' "${runtime_targets[@]}"
check_empty "No legacy opsx- command token in runtime artifacts" 'opsx-' "${runtime_targets[@]}"
if [ -d "$ROOT_DIR/src" ]; then
  check_empty "No legacy openspec- skill prefix in runtime src" 'openspec-' "$ROOT_DIR/src"
else
  echo "[WARN] Legacy openspec- src scan skipped (src/ not present)"
fi

# Ensure current runtime prefix exists.
if [ "${#runtime_targets[@]}" -gt 0 ] && rg -n '/opsp:' "${runtime_targets[@]}" >/dev/null 2>&1; then
  echo "[OK] New /opsp trigger prefix present"
else
  if [ "${#runtime_targets[@]}" -eq 0 ]; then
    echo "[WARN] New /opsp trigger prefix check skipped (no targets)"
  else
    echo "[FAIL] New /opsp trigger prefix missing"
    failures=$((failures + 1))
  fi
fi

# Optional local environment collision check.
if [ -d "$HOME/.codex/superpowers/skills" ] && [ -d "$ROOT_DIR/.codex/skills" ]; then
  tmp1="$(mktemp)"
  tmp2="$(mktemp)"
  find "$HOME/.codex/superpowers/skills" -type f -name SKILL.md \
    -exec awk '/^name:/{print $2; exit}' {} \; | sort -u > "$tmp1"
  find "$ROOT_DIR/.codex/skills" -type f -name SKILL.md \
    -exec awk '/^name:/{print $2; exit}' {} \; | sort -u > "$tmp2"
  overlap="$(comm -12 "$tmp1" "$tmp2" || true)"
  rm -f "$tmp1" "$tmp2"
  if [ -n "$overlap" ]; then
    echo "[FAIL] Skill name overlap with installed SuperPowers:"
    echo "$overlap"
    failures=$((failures + 1))
  else
    echo "[OK] No skill-name overlap with installed SuperPowers"
  fi
else
  echo "[WARN] Skipped local installed-skill overlap check (paths missing)"
fi

echo
if [ "$failures" -gt 0 ]; then
  echo "Conflict audit failed ($failures failure(s))"
  exit 1
fi
echo "Conflict audit passed"
