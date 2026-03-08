## Why
Google is rolling out Antigravity, a Windsurf-derived IDE that discovers workflows from `.agent/workflows/*.md`. Today OpenSpecPowers can only scaffold slash commands for Windsurf directories, so Antigravity users cannot run the proposal/apply/archive flows from the IDE.

## What Changes
- Add Antigravity as a selectable native tool in `openspecpowers init` so it creates `.agent/workflows/openspecpowers-proposal.md`, `openspecpowers-apply.md`, and `openspecpowers-archive.md` with YAML frontmatter containing only a `description` field plus the standard OpenSpecPowers-managed body.
- Ensure `openspecpowers update` refreshes the body of any existing Antigravity workflows inside `.agent/workflows/` without creating missing files, mirroring the Windsurf behavior.
- Share e2e/template coverage confirming the generator writes the proper directory, filename casing, and frontmatter format so Antigravity picks up the workflows.

## Impact
- Affected specs: `specs/cli-init`, `specs/cli-update`
- Expected code: CLI init/update tool registries, slash-command templates, associated tests
