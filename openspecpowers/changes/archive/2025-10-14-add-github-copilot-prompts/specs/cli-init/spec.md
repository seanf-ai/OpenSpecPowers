## MODIFIED Requirements

### Requirement: Slash Command Configuration
The init command SHALL generate slash command files for supported editors using shared templates.

#### Scenario: Generating slash commands for Claude Code
- **WHEN** the user selects Claude Code during initialization
- **THEN** create `.claude/commands/openspecpowers/proposal.md`, `.claude/commands/openspecpowers/apply.md`, and `.claude/commands/openspecpowers/archive.md`
- **AND** populate each file from shared templates so command text matches other tools
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for Cursor
- **WHEN** the user selects Cursor during initialization
- **THEN** create `.cursor/commands/openspecpowers-proposal.md`, `.cursor/commands/openspecpowers-apply.md`, and `.cursor/commands/openspecpowers-archive.md`
- **AND** populate each file from shared templates so command text matches other tools
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for OpenCode
- **WHEN** the user selects OpenCode during initialization
- **THEN** create `.opencode/commands/openspecpowers-proposal.md`, `.opencode/commands/openspecpowers-apply.md`, and `.opencode/commands/openspecpowers-archive.md`
- **AND** populate each file from shared templates so command text matches other tools
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for Windsurf
- **WHEN** the user selects Windsurf during initialization
- **THEN** create `.windsurf/workflows/openspecpowers-proposal.md`, `.windsurf/workflows/openspecpowers-apply.md`, and `.windsurf/workflows/openspecpowers-archive.md`
- **AND** populate each file from shared templates (wrapped in OpenSpecPowers markers) so workflow text matches other tools
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for Kilo Code
- **WHEN** the user selects Kilo Code during initialization
- **THEN** create `.kilocode/workflows/openspecpowers-proposal.md`, `.kilocode/workflows/openspecpowers-apply.md`, and `.kilocode/workflows/openspecpowers-archive.md`
- **AND** populate each file from shared templates (wrapped in OpenSpecPowers markers) so workflow text matches other tools
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for Codex
- **WHEN** the user selects Codex during initialization
- **THEN** create global prompt files at `~/.codex/prompts/openspecpowers-proposal.md`, `~/.codex/prompts/openspecpowers-apply.md`, and `~/.codex/prompts/openspecpowers-archive.md` (or under `$CODEX_HOME/prompts` if set)
- **AND** populate each file from shared templates that map the first numbered placeholder (`$1`) to the primary user input (e.g., change identifier or question text)
- **AND** wrap the generated content in OpenSpecPowers markers so `openspecpowers update` can refresh the prompts without touching surrounding custom notes

#### Scenario: Generating slash commands for GitHub Copilot
- **WHEN** the user selects GitHub Copilot during initialization
- **THEN** create `.github/prompts/openspecpowers-proposal.prompt.md`, `.github/prompts/openspecpowers-apply.prompt.md`, and `.github/prompts/openspecpowers-archive.prompt.md`
- **AND** populate each file with YAML frontmatter containing a `description` field that summarizes the workflow stage
- **AND** include `$ARGUMENTS` placeholder to capture user input
- **AND** wrap the shared template body with OpenSpecPowers markers so `openspecpowers update` can refresh the content
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage
