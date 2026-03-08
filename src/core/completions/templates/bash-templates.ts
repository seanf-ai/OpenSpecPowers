/**
 * Static template strings for Bash completion scripts.
 * These are Bash-specific helper functions that never change.
 */

export const BASH_DYNAMIC_HELPERS = `# Dynamic completion helpers

_openspecpowers_complete_changes() {
  local changes
  changes=$(openspecpowers __complete changes 2>/dev/null | cut -f1)
  COMPREPLY=($(compgen -W "$changes" -- "$cur"))
}

_openspecpowers_complete_specs() {
  local specs
  specs=$(openspecpowers __complete specs 2>/dev/null | cut -f1)
  COMPREPLY=($(compgen -W "$specs" -- "$cur"))
}

_openspecpowers_complete_items() {
  local items
  items=$(openspecpowers __complete changes 2>/dev/null | cut -f1; openspecpowers __complete specs 2>/dev/null | cut -f1)
  COMPREPLY=($(compgen -W "$items" -- "$cur"))
}`;
