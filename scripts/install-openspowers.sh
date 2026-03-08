#!/usr/bin/env bash
set -euo pipefail

PACKAGE="${OPSP_PACKAGE:-@seanf-ai/openspecpowers@latest}"
PREFIX="${OPSP_PREFIX:-$HOME/.local}"
CACHE_DIR="${OPSP_NPM_CACHE:-/tmp/npm-cache-openspowers-install}"
INIT_PROJECT="${OPSP_INIT_PROJECT:-}"

usage() {
  cat <<'USAGE'
OpenSpecPowers one-command installer

Usage:
  install-openspowers.sh [--package <npm-package>] [--prefix <install-prefix>] [--init <project-path>]

Environment overrides:
  OPSP_PACKAGE      npm package to install (default: @seanf-ai/openspecpowers@latest)
  OPSP_PREFIX       local prefix for fallback install (default: $HOME/.local)
  OPSP_NPM_CACHE    npm cache directory (default: /tmp/npm-cache-openspowers-install)
  OPSP_INIT_PROJECT optional project path to run "openspecpowers init --tools codex --profile core"
USAGE
}

while [ "$#" -gt 0 ]; do
  case "$1" in
    --package)
      PACKAGE="$2"
      shift 2
      ;;
    --prefix)
      PREFIX="$2"
      shift 2
      ;;
    --init)
      INIT_PROJECT="$2"
      shift 2
      ;;
    -h|--help)
      usage
      exit 0
      ;;
    *)
      echo "[FAIL] Unknown option: $1"
      usage
      exit 1
      ;;
  esac
done

if ! command -v npm >/dev/null 2>&1; then
  echo "[FAIL] npm is required but not found in PATH"
  exit 1
fi

mkdir -p "$CACHE_DIR"

echo "Installing OpenSpecPowers package: $PACKAGE"

installed_scope="global"
global_root="$(npm root -g 2>/dev/null || true)"
can_write_global="false"
if [ -n "$global_root" ] && [ -d "$global_root" ]; then
  # Probe actual writeability (works better than -w in sandboxed environments).
  if probe_file="$(mktemp "$global_root/.opsp-write-test.XXXXXX" 2>/dev/null)"; then
    rm -f "$probe_file"
    can_write_global="true"
  fi
fi

if [ "$can_write_global" = "true" ] && npm install -g --cache "$CACHE_DIR" "$PACKAGE"; then
  echo "[OK] Installed globally"
else
  installed_scope="local-prefix"
  if [ "$can_write_global" = "true" ]; then
    echo "[WARN] Global install failed; falling back to prefix: $PREFIX"
  else
    echo "[INFO] Global npm path is not writable; using prefix: $PREFIX"
  fi
  mkdir -p "$PREFIX"
  npm install -g --prefix "$PREFIX" --cache "$CACHE_DIR" "$PACKAGE"
  echo "[OK] Installed in prefix: $PREFIX"
fi

BIN_PATH=""
if command -v openspecpowers >/dev/null 2>&1; then
  BIN_PATH="$(command -v openspecpowers)"
elif [ -x "$PREFIX/bin/openspecpowers" ]; then
  BIN_PATH="$PREFIX/bin/openspecpowers"
else
  echo "[FAIL] Installation completed but openspecpowers binary was not found"
  exit 1
fi

VERSION="$("$BIN_PATH" --version 2>/dev/null || true)"
echo "[OK] openspecpowers binary: $BIN_PATH (${VERSION:-version unknown})"

if [ "$installed_scope" = "local-prefix" ]; then
  echo
  echo "Add this to your shell profile if needed:"
  echo "  export PATH=\"$PREFIX/bin:\$PATH\""
fi

if [ -n "$INIT_PROJECT" ]; then
  if [ ! -d "$INIT_PROJECT" ]; then
    echo "[FAIL] --init project path not found: $INIT_PROJECT"
    exit 1
  fi
  echo
  echo "Initializing OpenSpecPowers in project: $INIT_PROJECT"
  (
    cd "$INIT_PROJECT"
    XDG_CONFIG_HOME="${XDG_CONFIG_HOME:-$INIT_PROJECT/.config}" \
    CODEX_HOME="${CODEX_HOME:-$INIT_PROJECT/.codex-home}" \
    "$BIN_PATH" init --tools codex --profile core
  )
  echo "[OK] Project initialized"
fi

echo
echo "Done. Start with:"
echo "  openspecpowers --help"
echo "  /opsp:propose \"your idea\""
