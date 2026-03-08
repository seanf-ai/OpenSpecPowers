# Delta for CLI Init

## MODIFIED Requirements
### Requirement: Slash Command Configuration
The init command SHALL generate slash command files for supported editors using shared templates.

#### Scenario: Generating slash commands for Antigravity
- **WHEN** the user selects Antigravity during initialization
- **THEN** create `.agent/workflows/openspecpowers-proposal.md`, `.agent/workflows/openspecpowers-apply.md`, and `.agent/workflows/openspecpowers-archive.md`
- **AND** ensure each file begins with YAML frontmatter that contains only a `description: <stage summary>` field followed by the shared OpenSpecPowers workflow instructions wrapped in managed markers
- **AND** populate the workflow body with the same proposal/apply/archive guidance used for other tools so Antigravity behaves like Windsurf while pointing to the `.agent/workflows/` directory

#### Scenario: Generating slash commands for Claude Code
- **WHEN** the user selects Claude Code during initialization
- **THEN** create `.claude/commands/openspecpowers/proposal.md`, `.claude/commands/openspecpowers/apply.md`, and `.claude/commands/openspecpowers/archive.md`
- **AND** populate each file from shared templates so command text matches other tools
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for CodeBuddy Code
- **WHEN** the user selects CodeBuddy Code during initialization
- **THEN** create `.codebuddy/commands/openspecpowers/proposal.md`, `.codebuddy/commands/openspecpowers/apply.md`, and `.codebuddy/commands/openspecpowers/archive.md`
- **AND** populate each file from shared templates so command text matches other tools
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for Cline
- **WHEN** the user selects Cline during initialization
- **THEN** create `.clinerules/workflows/openspecpowers-proposal.md`, `.clinerules/workflows/openspecpowers-apply.md`, and `.clinerules/workflows/openspecpowers-archive.md`
- **AND** populate each file from shared templates so command text matches other tools
- **AND** include Cline-specific Markdown heading frontmatter
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for Crush
- **WHEN** the user selects Crush during initialization
- **THEN** create `.crush/commands/openspecpowers/proposal.md`, `.crush/commands/openspecpowers/apply.md`, and `.crush/commands/openspecpowers/archive.md`
- **AND** populate each file from shared templates so command text matches other tools
- **AND** include Crush-specific frontmatter with OpenSpecPowers category and tags
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for Cursor
- **WHEN** the user selects Cursor during initialization
- **THEN** create `.cursor/commands/openspecpowers-proposal.md`, `.cursor/commands/openspecpowers-apply.md`, and `.cursor/commands/openspecpowers-archive.md`
- **AND** populate each file from shared templates so command text matches other tools
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for Factory Droid
- **WHEN** the user selects Factory Droid during initialization
- **THEN** create `.factory/commands/openspecpowers-proposal.md`, `.factory/commands/openspecpowers-apply.md`, and `.factory/commands/openspecpowers-archive.md`
- **AND** populate each file from shared templates that include Factory-compatible YAML frontmatter for the `description` and `argument-hint` fields
- **AND** include the `$ARGUMENTS` placeholder in the template body so droid receives any user-supplied input
- **AND** wrap the generated content in OpenSpecPowers managed markers so `openspecpowers update` can safely refresh the commands

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

#### Scenario: Generating slash commands for Gemini CLI
- **WHEN** the user selects Gemini CLI during initialization
- **THEN** create `.gemini/commands/openspecpowers/proposal.toml`, `.gemini/commands/openspecpowers/apply.toml`, and `.gemini/commands/openspecpowers/archive.toml`
- **AND** populate each file as TOML that sets a stage-specific `description = "<summary>"` and a multi-line `prompt = """` block with the shared OpenSpecPowers template
- **AND** wrap the OpenSpecPowers managed markers (`<!-- OPENSPEC:START -->` / `<!-- OPENSPEC:END -->`) inside the `prompt` value so `openspecpowers update` can safely refresh the body between markers without touching the TOML framing
- **AND** ensure the slash-command copy matches the existing proposal/apply/archive templates used by other tools

#### Scenario: Generating slash commands for iFlow CLI
- **WHEN** the user selects iFlow CLI during initialization
- **THEN** create `.iflow/commands/openspecpowers-proposal.md`, `.iflow/commands/openspecpowers-apply.md`, and `.iflow/commands/openspecpowers-archive.md`
- **AND** populate each file from shared templates so command text matches other tools
- **AND** include YAML frontmatter with `name`, `id`, `category`, and `description` fields for each command
- **AND** wrap the generated content in OpenSpecPowers managed markers so `openspecpowers update` can safely refresh the commands
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage

#### Scenario: Generating slash commands for RooCode
- **WHEN** the user selects RooCode during initialization
- **THEN** create `.roo/commands/openspecpowers-proposal.md`, `.roo/commands/openspecpowers-apply.md`, and `.roo/commands/openspecpowers-archive.md`
- **AND** populate each file from shared templates so command text matches other tools
- **AND** include simple Markdown headings (e.g., `# OpenSpecPowers: Proposal`) without YAML frontmatter
- **AND** wrap the generated content in OpenSpecPowers managed markers where applicable so `openspecpowers update` can safely refresh the commands
- **AND** each template includes instructions for the relevant OpenSpecPowers workflow stage
