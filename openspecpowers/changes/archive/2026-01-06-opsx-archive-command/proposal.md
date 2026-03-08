## Why

The experimental workflow (OPSP) provides a schema-driven, artifact-by-artifact approach to creating changes with `/opsp:new`, `/opsp:continue`, `/opsp:ff`, `/opsp:apply`, and `/opsp:sync`. However, there's no corresponding archive command to finalize and archive completed changes. Users must currently fall back to the regular `openspecpowers archive` command, which doesn't integrate with the OPSP philosophy of agent-driven spec syncing and schema-aware artifact tracking.

## What Changes

- Add `/opsp:archive` slash command for archiving changes in the experimental workflow
- Use artifact graph to check completion status (schema-aware) instead of just validating proposal + specs
- Prompt for `/opsp:sync` before archiving instead of programmatically applying specs
- Preserve `.openspecpowers.yaml` schema metadata when moving to archive
- Integrate with existing OPSP commands for a cohesive workflow

## Capabilities

### New Capabilities

- `opsp-archive-skill`: Slash command and skill for archiving completed changes in the experimental workflow. Checks artifact completion via artifact graph, verifies task completion, optionally syncs specs via `/opsp:sync`, and moves the change to `archive/YYYY-MM-DD-<name>/`.

### Modified Capabilities

(none - this is a new skill that doesn't modify existing specs)

## Impact

- New file: `.claude/commands/opsp/archive.md`
- New skill definition (generated via `openspecpowers artifact-experimental-setup`)
- No changes to existing archive command or other OPSP commands
- Completes the OPSP command suite for full lifecycle management
