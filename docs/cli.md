# CLI Reference

The OpenSpecPowers CLI (`openspecpowers`) provides terminal commands for project setup, validation, status inspection, and management. These commands complement the AI slash commands (like `/opsp:propose`) documented in [Commands](commands.md).

## Summary

| Category | Commands | Purpose |
|----------|----------|---------|
| **Setup** | `init`, `update` | Initialize and update OpenSpecPowers in your project |
| **Browsing** | `list`, `view`, `show` | Explore changes and specs |
| **Validation** | `validate` | Check changes and specs for issues |
| **Lifecycle** | `archive` | Finalize completed changes |
| **Workflow** | `status`, `instructions`, `templates`, `schemas` | Artifact-driven workflow support |
| **Schemas** | `schema init`, `schema fork`, `schema validate`, `schema which` | Create and manage custom workflows |
| **Config** | `config` | View and modify settings |
| **Utility** | `feedback`, `completion` | Feedback and shell integration |

---

## Human vs Agent Commands

Most CLI commands are designed for **human use** in a terminal. Some commands also support **agent/script use** via JSON output.

### Human-Only Commands

These commands are interactive and designed for terminal use:

| Command | Purpose |
|---------|---------|
| `openspecpowers init` | Initialize project (interactive prompts) |
| `openspecpowers view` | Interactive dashboard |
| `openspecpowers config edit` | Open config in editor |
| `openspecpowers feedback` | Submit feedback via GitHub |
| `openspecpowers completion install` | Install shell completions |

### Agent-Compatible Commands

These commands support `--json` output for programmatic use by AI agents and scripts:

| Command | Human Use | Agent Use |
|---------|-----------|-----------|
| `openspecpowers list` | Browse changes/specs | `--json` for structured data |
| `openspecpowers show <item>` | Read content | `--json` for parsing |
| `openspecpowers validate` | Check for issues | `--all --json` for bulk validation |
| `openspecpowers status` | See artifact progress | `--json` for structured status |
| `openspecpowers instructions` | Get next steps | `--json` for agent instructions |
| `openspecpowers templates` | Find template paths | `--json` for path resolution |
| `openspecpowers schemas` | List available schemas | `--json` for schema discovery |

---

## Global Options

These options work with all commands:

| Option | Description |
|--------|-------------|
| `--version`, `-V` | Show version number |
| `--no-color` | Disable color output |
| `--help`, `-h` | Display help for command |

---

## Setup Commands

### `openspecpowers init`

Initialize OpenSpecPowers in your project. Creates the folder structure and configures AI tool integrations.

Default behavior uses global config defaults: profile `core`, delivery `both`, workflows `propose, explore, apply, archive`.

```
openspecpowers init [path] [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `path` | No | Target directory (default: current directory) |

**Options:**

| Option | Description |
|--------|-------------|
| `--tools <list>` | Configure AI tools non-interactively. Use `all`, `none`, or comma-separated list |
| `--force` | Auto-cleanup legacy files without prompting |
| `--profile <profile>` | Override global profile for this init run (`core` or `custom`) |

`--profile custom` uses whatever workflows are currently selected in global config (`openspecpowers config profile`).

**Supported tool IDs (`--tools`):** `amazon-q`, `antigravity`, `auggie`, `claude`, `cline`, `codex`, `codebuddy`, `continue`, `costrict`, `crush`, `cursor`, `factory`, `gemini`, `github-copilot`, `iflow`, `kilocode`, `kiro`, `opencode`, `pi`, `qoder`, `qwen`, `roocode`, `trae`, `windsurf`

**Examples:**

```bash
# Interactive initialization
openspecpowers init

# Initialize in a specific directory
openspecpowers init ./my-project

# Non-interactive: configure for Claude and Cursor
openspecpowers init --tools claude,cursor

# Configure for all supported tools
openspecpowers init --tools all

# Override profile for this run
openspecpowers init --profile core

# Skip prompts and auto-cleanup legacy files
openspecpowers init --force
```

**What it creates:**

```
openspecpowers/
├── specs/              # Your specifications (source of truth)
├── changes/            # Proposed changes
└── config.yaml         # Project configuration

.claude/skills/         # Claude Code skills (if claude selected)
.cursor/skills/         # Cursor skills (if cursor selected)
.cursor/commands/       # Cursor OPSP commands (if delivery includes commands)
... (other tool configs)
```

---

### `openspecpowers update`

Update OpenSpecPowers instruction files after upgrading the CLI. Re-generates AI tool configuration files using your current global profile, selected workflows, and delivery mode.

```
openspecpowers update [path] [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `path` | No | Target directory (default: current directory) |

**Options:**

| Option | Description |
|--------|-------------|
| `--force` | Force update even when files are up to date |

**Example:**

```bash
# Update instruction files after npm upgrade
npm update @seanf-ai/openspecpowers
openspecpowers update
```

---

## Browsing Commands

### `openspecpowers list`

List changes or specs in your project.

```
openspecpowers list [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--specs` | List specs instead of changes |
| `--changes` | List changes (default) |
| `--sort <order>` | Sort by `recent` (default) or `name` |
| `--json` | Output as JSON |

**Examples:**

```bash
# List all active changes
openspecpowers list

# List all specs
openspecpowers list --specs

# JSON output for scripts
openspecpowers list --json
```

**Output (text):**

```
Active changes:
  add-dark-mode     UI theme switching support
  fix-login-bug     Session timeout handling
```

---

### `openspecpowers view`

Display an interactive dashboard for exploring specs and changes.

```
openspecpowers view
```

Opens a terminal-based interface for navigating your project's specifications and changes.

---

### `openspecpowers show`

Display details of a change or spec.

```
openspecpowers show [item-name] [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `item-name` | No | Name of change or spec (prompts if omitted) |

**Options:**

| Option | Description |
|--------|-------------|
| `--type <type>` | Specify type: `change` or `spec` (auto-detected if unambiguous) |
| `--json` | Output as JSON |
| `--no-interactive` | Disable prompts |

**Change-specific options:**

| Option | Description |
|--------|-------------|
| `--deltas-only` | Show only delta specs (JSON mode) |

**Spec-specific options:**

| Option | Description |
|--------|-------------|
| `--requirements` | Show only requirements, exclude scenarios (JSON mode) |
| `--no-scenarios` | Exclude scenario content (JSON mode) |
| `-r, --requirement <id>` | Show specific requirement by 1-based index (JSON mode) |

**Examples:**

```bash
# Interactive selection
openspecpowers show

# Show a specific change
openspecpowers show add-dark-mode

# Show a specific spec
openspecpowers show auth --type spec

# JSON output for parsing
openspecpowers show add-dark-mode --json
```

---

## Validation Commands

### `openspecpowers validate`

Validate changes and specs for structural issues.

```
openspecpowers validate [item-name] [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `item-name` | No | Specific item to validate (prompts if omitted) |

**Options:**

| Option | Description |
|--------|-------------|
| `--all` | Validate all changes and specs |
| `--changes` | Validate all changes |
| `--specs` | Validate all specs |
| `--type <type>` | Specify type when name is ambiguous: `change` or `spec` |
| `--strict` | Enable strict validation mode |
| `--json` | Output as JSON |
| `--concurrency <n>` | Max parallel validations (default: 6, or `OPENSPEC_CONCURRENCY` env) |
| `--no-interactive` | Disable prompts |

**Examples:**

```bash
# Interactive validation
openspecpowers validate

# Validate a specific change
openspecpowers validate add-dark-mode

# Validate all changes
openspecpowers validate --changes

# Validate everything with JSON output (for CI/scripts)
openspecpowers validate --all --json

# Strict validation with increased parallelism
openspecpowers validate --all --strict --concurrency 12
```

**Output (text):**

```
Validating add-dark-mode...
  ✓ proposal.md valid
  ✓ specs/ui/spec.md valid
  ⚠ design.md: missing "Technical Approach" section

1 warning found
```

**Output (JSON):**

```json
{
  "version": "1.0.0",
  "results": {
    "changes": [
      {
        "name": "add-dark-mode",
        "valid": true,
        "warnings": ["design.md: missing 'Technical Approach' section"]
      }
    ]
  },
  "summary": {
    "total": 1,
    "valid": 1,
    "invalid": 0
  }
}
```

---

## Lifecycle Commands

### `openspecpowers archive`

Archive a completed change and merge delta specs into main specs.

```
openspecpowers archive [change-name] [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `change-name` | No | Change to archive (prompts if omitted) |

**Options:**

| Option | Description |
|--------|-------------|
| `-y, --yes` | Skip confirmation prompts |
| `--skip-specs` | Skip spec updates (for infrastructure/tooling/doc-only changes) |
| `--no-validate` | Skip validation (requires confirmation) |

**Examples:**

```bash
# Interactive archive
openspecpowers archive

# Archive specific change
openspecpowers archive add-dark-mode

# Archive without prompts (CI/scripts)
openspecpowers archive add-dark-mode --yes

# Archive a tooling change that doesn't affect specs
openspecpowers archive update-ci-config --skip-specs
```

**What it does:**

1. Validates the change (unless `--no-validate`)
2. Prompts for confirmation (unless `--yes`)
3. Merges delta specs into `openspecpowers/specs/`
4. Moves change folder to `openspecpowers/changes/archive/YYYY-MM-DD-<name>/`

---

## Workflow Commands

These commands support the artifact-driven OPSP workflow. They're useful for both humans checking progress and agents determining next steps.

### `openspecpowers status`

Display artifact completion status for a change.

```
openspecpowers status [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--change <id>` | Change name (prompts if omitted) |
| `--schema <name>` | Schema override (auto-detected from change's config) |
| `--json` | Output as JSON |

**Examples:**

```bash
# Interactive status check
openspecpowers status

# Status for specific change
openspecpowers status --change add-dark-mode

# JSON for agent use
openspecpowers status --change add-dark-mode --json
```

**Output (text):**

```
Change: add-dark-mode
Schema: spec-driven
Progress: 2/4 artifacts complete

[x] proposal
[ ] design
[x] specs
[-] tasks (blocked by: design)
```

**Output (JSON):**

```json
{
  "changeName": "add-dark-mode",
  "schemaName": "spec-driven",
  "isComplete": false,
  "applyRequires": ["tasks"],
  "artifacts": [
    {"id": "proposal", "outputPath": "proposal.md", "status": "done"},
    {"id": "design", "outputPath": "design.md", "status": "ready"},
    {"id": "specs", "outputPath": "specs/**/*.md", "status": "done"},
    {"id": "tasks", "outputPath": "tasks.md", "status": "blocked", "missingDeps": ["design"]}
  ]
}
```

---

### `openspecpowers instructions`

Get enriched instructions for creating an artifact or applying tasks. Used by AI agents to understand what to create next.

```
openspecpowers instructions [artifact] [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `artifact` | No | Artifact ID: `proposal`, `specs`, `design`, `tasks`, or `apply` |

**Options:**

| Option | Description |
|--------|-------------|
| `--change <id>` | Change name (required in non-interactive mode) |
| `--schema <name>` | Schema override |
| `--json` | Output as JSON |

**Special case:** Use `apply` as the artifact to get task implementation instructions.

**Examples:**

```bash
# Get instructions for next artifact
openspecpowers instructions --change add-dark-mode

# Get specific artifact instructions
openspecpowers instructions design --change add-dark-mode

# Get apply/implementation instructions
openspecpowers instructions apply --change add-dark-mode

# JSON for agent consumption
openspecpowers instructions design --change add-dark-mode --json
```

**Output includes:**

- Template content for the artifact
- Project context from config
- Content from dependency artifacts
- Per-artifact rules from config

---

### `openspecpowers templates`

Show resolved template paths for all artifacts in a schema.

```
openspecpowers templates [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--schema <name>` | Schema to inspect (default: `spec-driven`) |
| `--json` | Output as JSON |

**Examples:**

```bash
# Show template paths for default schema
openspecpowers templates

# Show templates for custom schema
openspecpowers templates --schema my-workflow

# JSON for programmatic use
openspecpowers templates --json
```

**Output (text):**

```
Schema: spec-driven

Templates:
  proposal  → ~/.openspecpowers/schemas/spec-driven/templates/proposal.md
  specs     → ~/.openspecpowers/schemas/spec-driven/templates/specs.md
  design    → ~/.openspecpowers/schemas/spec-driven/templates/design.md
  tasks     → ~/.openspecpowers/schemas/spec-driven/templates/tasks.md
```

---

### `openspecpowers schemas`

List available workflow schemas with their descriptions and artifact flows.

```
openspecpowers schemas [options]
```

**Options:**

| Option | Description |
|--------|-------------|
| `--json` | Output as JSON |

**Example:**

```bash
openspecpowers schemas
```

**Output:**

```
Available schemas:

  spec-driven (package)
    The default spec-driven development workflow
    Flow: proposal → specs → design → tasks

  my-custom (project)
    Custom workflow for this project
    Flow: research → proposal → tasks
```

---

## Schema Commands

Commands for creating and managing custom workflow schemas.

### `openspecpowers schema init`

Create a new project-local schema.

```
openspecpowers schema init <name> [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `name` | Yes | Schema name (kebab-case) |

**Options:**

| Option | Description |
|--------|-------------|
| `--description <text>` | Schema description |
| `--artifacts <list>` | Comma-separated artifact IDs (default: `proposal,specs,design,tasks`) |
| `--default` | Set as project default schema |
| `--no-default` | Don't prompt to set as default |
| `--force` | Overwrite existing schema |
| `--json` | Output as JSON |

**Examples:**

```bash
# Interactive schema creation
openspecpowers schema init research-first

# Non-interactive with specific artifacts
openspecpowers schema init rapid \
  --description "Rapid iteration workflow" \
  --artifacts "proposal,tasks" \
  --default
```

**What it creates:**

```
openspecpowers/schemas/<name>/
├── schema.yaml           # Schema definition
└── templates/
    ├── proposal.md       # Template for each artifact
    ├── specs.md
    ├── design.md
    └── tasks.md
```

---

### `openspecpowers schema fork`

Copy an existing schema to your project for customization.

```
openspecpowers schema fork <source> [name] [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `source` | Yes | Schema to copy |
| `name` | No | New schema name (default: `<source>-custom`) |

**Options:**

| Option | Description |
|--------|-------------|
| `--force` | Overwrite existing destination |
| `--json` | Output as JSON |

**Example:**

```bash
# Fork the built-in spec-driven schema
openspecpowers schema fork spec-driven my-workflow
```

---

### `openspecpowers schema validate`

Validate a schema's structure and templates.

```
openspecpowers schema validate [name] [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `name` | No | Schema to validate (validates all if omitted) |

**Options:**

| Option | Description |
|--------|-------------|
| `--verbose` | Show detailed validation steps |
| `--json` | Output as JSON |

**Example:**

```bash
# Validate a specific schema
openspecpowers schema validate my-workflow

# Validate all schemas
openspecpowers schema validate
```

---

### `openspecpowers schema which`

Show where a schema resolves from (useful for debugging precedence).

```
openspecpowers schema which [name] [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `name` | No | Schema name |

**Options:**

| Option | Description |
|--------|-------------|
| `--all` | List all schemas with their sources |
| `--json` | Output as JSON |

**Example:**

```bash
# Check where a schema comes from
openspecpowers schema which spec-driven
```

**Output:**

```
spec-driven resolves from: package
  Source: /usr/local/lib/node_modules/@seanf-ai/openspecpowers/schemas/spec-driven
```

**Schema precedence:**

1. Project: `openspecpowers/schemas/<name>/`
2. User: `~/.local/share/openspecpowers/schemas/<name>/`
3. Package: Built-in schemas

---

## Configuration Commands

### `openspecpowers config`

View and modify global OpenSpecPowers configuration.

```
openspecpowers config <subcommand> [options]
```

**Subcommands:**

| Subcommand | Description |
|------------|-------------|
| `path` | Show config file location |
| `list` | Show all current settings |
| `get <key>` | Get a specific value |
| `set <key> <value>` | Set a value |
| `unset <key>` | Remove a key |
| `reset` | Reset to defaults |
| `edit` | Open in `$EDITOR` |
| `profile [preset]` | Configure workflow profile interactively or via preset |

**Examples:**

```bash
# Show config file path
openspecpowers config path

# List all settings
openspecpowers config list

# Get a specific value
openspecpowers config get telemetry.enabled

# Set a value
openspecpowers config set telemetry.enabled false

# Set a string value explicitly
openspecpowers config set user.name "My Name" --string

# Remove a custom setting
openspecpowers config unset user.name

# Reset all configuration
openspecpowers config reset --all --yes

# Edit config in your editor
openspecpowers config edit

# Configure profile with action-based wizard
openspecpowers config profile

# Fast preset: switch workflows to core (keeps delivery mode)
openspecpowers config profile core
```

`openspecpowers config profile` starts with a current-state summary, then lets you choose:
- Change delivery + workflows
- Change delivery only
- Change workflows only
- Keep current settings (exit)

If you keep current settings, no changes are written and no update prompt is shown.
If there are no config changes but the current project files are out of sync with your global profile/delivery, OpenSpecPowers will show a warning and suggest running `openspecpowers update`.
Pressing `Ctrl+C` also cancels the flow cleanly (no stack trace) and exits with code `130`.
In the workflow checklist, `[x]` means the workflow is selected in global config. To apply those selections to project files, run `openspecpowers update` (or choose `Apply changes to this project now?` when prompted inside a project).

**Interactive examples:**

```bash
# Delivery-only update
openspecpowers config profile
# choose: Change delivery only
# choose delivery: Skills only

# Workflows-only update
openspecpowers config profile
# choose: Change workflows only
# toggle workflows in the checklist, then confirm
```

---

## Utility Commands

### `openspecpowers feedback`

Submit feedback about OpenSpecPowers. Creates a GitHub issue.

```
openspecpowers feedback <message> [options]
```

**Arguments:**

| Argument | Required | Description |
|----------|----------|-------------|
| `message` | Yes | Feedback message |

**Options:**

| Option | Description |
|--------|-------------|
| `--body <text>` | Detailed description |

**Requirements:** GitHub CLI (`gh`) must be installed and authenticated.

**Example:**

```bash
openspecpowers feedback "Add support for custom artifact types" \
  --body "I'd like to define my own artifact types beyond the built-in ones."
```

---

### `openspecpowers completion`

Manage shell completions for the OpenSpecPowers CLI.

```
openspecpowers completion <subcommand> [shell]
```

**Subcommands:**

| Subcommand | Description |
|------------|-------------|
| `generate [shell]` | Output completion script to stdout |
| `install [shell]` | Install completion for your shell |
| `uninstall [shell]` | Remove installed completions |

**Supported shells:** `bash`, `zsh`, `fish`, `powershell`

**Examples:**

```bash
# Install completions (auto-detects shell)
openspecpowers completion install

# Install for specific shell
openspecpowers completion install zsh

# Generate script for manual installation
openspecpowers completion generate bash > ~/.bash_completion.d/openspecpowers

# Uninstall
openspecpowers completion uninstall
```

---

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | Error (validation failure, missing files, etc.) |

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `OPENSPEC_CONCURRENCY` | Default concurrency for bulk validation (default: 6) |
| `EDITOR` or `VISUAL` | Editor for `openspecpowers config edit` |
| `NO_COLOR` | Disable color output when set |

---

## Related Documentation

- [Commands](commands.md) - AI slash commands (`/opsp:propose`, `/opsp:apply`, etc.)
- [Workflows](workflows.md) - Common patterns and when to use each command
- [Customization](customization.md) - Create custom schemas and templates
- [Getting Started](getting-started.md) - First-time setup guide
