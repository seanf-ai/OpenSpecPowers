## MODIFIED Requirements
### Requirement: AI Tool Configuration
The command SHALL configure AI coding assistants with OpenSpecPowers instructions using a marker system.
#### Scenario: Prompting for AI tool selection
- **WHEN** run interactively
- **THEN** prompt the user with "Which AI tools do you use?" using a multi-select menu
- **AND** list every available tool with a checkbox:
  - Claude Code (creates or refreshes CLAUDE.md and slash commands)
  - Cursor (creates or refreshes `.cursor/commands/*` slash commands)
  - OpenCode (creates or refreshes `.opencode/command/openspecpowers-*.md` slash commands)
  - Windsurf (creates or refreshes `.windsurf/workflows/openspecpowers-*.md` workflows)
  - Kilo Code (creates or refreshes `.kilocode/workflows/openspecpowers-*.md` workflows)
  - Codex (creates or refreshes global prompts at `~/.codex/prompts/openspecpowers-*.md`)
  - AGENTS.md standard (creates or refreshes AGENTS.md with OpenSpecPowers markers)
- **AND** show "(already configured)" beside tools whose managed files exist so users understand selections will refresh content
- **AND** treat disabled tools as "coming soon" and keep them unselectable
- **AND** allow confirming with Enter after selecting one or more tools

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
- **THEN** create `.opencode/command/openspecpowers-proposal.md`, `.opencode/command/openspecpowers-apply.md`, and `.opencode/command/openspecpowers-archive.md`
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
