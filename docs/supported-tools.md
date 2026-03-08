# Supported Tools

OpenSpecPowers works with many AI coding assistants. When you run `openspecpowers init`, OpenSpecPowers configures selected tools using your active profile/workflow selection and delivery mode.

## How It Works

For each selected tool, OpenSpecPowers can install:

1. **Skills** (if delivery includes skills): `.../skills/openspecpowers-*/SKILL.md`
2. **Commands** (if delivery includes commands): tool-specific `opsp-*` command files

By default, OpenSpecPowers uses the `core` profile, which includes:
- `propose`
- `explore`
- `apply`
- `archive`

You can enable expanded workflows (`new`, `continue`, `ff`, `verify`, `sync`, `bulk-archive`, `onboard`) via `openspecpowers config profile`, then run `openspecpowers update`.

## Tool Directory Reference

| Tool (ID) | Skills path pattern | Command path pattern |
|-----------|---------------------|----------------------|
| Amazon Q Developer (`amazon-q`) | `.amazonq/skills/openspecpowers-*/SKILL.md` | `.amazonq/prompts/opsp-<id>.md` |
| Antigravity (`antigravity`) | `.agent/skills/openspecpowers-*/SKILL.md` | `.agent/workflows/opsp-<id>.md` |
| Auggie (`auggie`) | `.augment/skills/openspecpowers-*/SKILL.md` | `.augment/commands/opsp-<id>.md` |
| Claude Code (`claude`) | `.claude/skills/openspecpowers-*/SKILL.md` | `.claude/commands/opsp/<id>.md` |
| Cline (`cline`) | `.cline/skills/openspecpowers-*/SKILL.md` | `.clinerules/workflows/opsp-<id>.md` |
| CodeBuddy (`codebuddy`) | `.codebuddy/skills/openspecpowers-*/SKILL.md` | `.codebuddy/commands/opsp/<id>.md` |
| Codex (`codex`) | `.codex/skills/openspecpowers-*/SKILL.md` | `$CODEX_HOME/prompts/opsp-<id>.md`\* |
| Continue (`continue`) | `.continue/skills/openspecpowers-*/SKILL.md` | `.continue/prompts/opsp-<id>.prompt` |
| CoStrict (`costrict`) | `.cospec/skills/openspecpowers-*/SKILL.md` | `.cospec/openspecpowers/commands/opsp-<id>.md` |
| Crush (`crush`) | `.crush/skills/openspecpowers-*/SKILL.md` | `.crush/commands/opsp/<id>.md` |
| Cursor (`cursor`) | `.cursor/skills/openspecpowers-*/SKILL.md` | `.cursor/commands/opsp-<id>.md` |
| Factory Droid (`factory`) | `.factory/skills/openspecpowers-*/SKILL.md` | `.factory/commands/opsp-<id>.md` |
| Gemini CLI (`gemini`) | `.gemini/skills/openspecpowers-*/SKILL.md` | `.gemini/commands/opsp/<id>.toml` |
| GitHub Copilot (`github-copilot`) | `.github/skills/openspecpowers-*/SKILL.md` | `.github/prompts/opsp-<id>.prompt.md`\*\* |
| iFlow (`iflow`) | `.iflow/skills/openspecpowers-*/SKILL.md` | `.iflow/commands/opsp-<id>.md` |
| Kilo Code (`kilocode`) | `.kilocode/skills/openspecpowers-*/SKILL.md` | `.kilocode/workflows/opsp-<id>.md` |
| Kiro (`kiro`) | `.kiro/skills/openspecpowers-*/SKILL.md` | `.kiro/prompts/opsp-<id>.prompt.md` |
| OpenCode (`opencode`) | `.opencode/skills/openspecpowers-*/SKILL.md` | `.opencode/commands/opsp-<id>.md` |
| Pi (`pi`) | `.pi/skills/openspecpowers-*/SKILL.md` | `.pi/prompts/opsp-<id>.md` |
| Qoder (`qoder`) | `.qoder/skills/openspecpowers-*/SKILL.md` | `.qoder/commands/opsp/<id>.md` |
| Qwen Code (`qwen`) | `.qwen/skills/openspecpowers-*/SKILL.md` | `.qwen/commands/opsp-<id>.toml` |
| RooCode (`roocode`) | `.roo/skills/openspecpowers-*/SKILL.md` | `.roo/commands/opsp-<id>.md` |
| Trae (`trae`) | `.trae/skills/openspecpowers-*/SKILL.md` | Not generated (no command adapter; use skill-based `/openspecpowers-*` invocations) |
| Windsurf (`windsurf`) | `.windsurf/skills/openspecpowers-*/SKILL.md` | `.windsurf/workflows/opsp-<id>.md` |

\* Codex commands are installed in the global Codex home (`$CODEX_HOME/prompts/` if set, otherwise `~/.codex/prompts/`), not your project directory.

\*\* GitHub Copilot prompt files are recognized as custom slash commands in IDE extensions (VS Code, JetBrains, Visual Studio). Copilot CLI does not currently consume `.github/prompts/*.prompt.md` directly.

## Non-Interactive Setup

For CI/CD or scripted setup, use `--tools` (and optionally `--profile`):

```bash
# Configure specific tools
openspecpowers init --tools claude,cursor

# Configure all supported tools
openspecpowers init --tools all

# Skip tool configuration
openspecpowers init --tools none

# Override profile for this init run
openspecpowers init --profile core
```

**Available tool IDs (`--tools`):** `amazon-q`, `antigravity`, `auggie`, `claude`, `cline`, `codex`, `codebuddy`, `continue`, `costrict`, `crush`, `cursor`, `factory`, `gemini`, `github-copilot`, `iflow`, `kilocode`, `kiro`, `opencode`, `pi`, `qoder`, `qwen`, `roocode`, `trae`, `windsurf`

## Workflow-Dependent Installation

OpenSpecPowers installs workflow artifacts based on selected workflows:

- **Core profile (default):** `propose`, `explore`, `apply`, `archive`
- **Custom selection:** any subset of all workflow IDs:
  `propose`, `explore`, `new`, `continue`, `apply`, `ff`, `sync`, `archive`, `bulk-archive`, `verify`, `onboard`

In other words, skill/command counts are profile-dependent and delivery-dependent, not fixed.

## Generated Skill Names

When selected by profile/workflow config, OpenSpecPowers generates these skills:

- `openspecpowers-propose`
- `openspecpowers-explore`
- `openspecpowers-new-change`
- `openspecpowers-continue-change`
- `openspecpowers-apply-change`
- `openspecpowers-ff-change`
- `openspecpowers-sync-specs`
- `openspecpowers-archive-change`
- `openspecpowers-bulk-archive-change`
- `openspecpowers-verify-change`
- `openspecpowers-onboard`

See [Commands](commands.md) for command behavior and [CLI](cli.md) for `init`/`update` options.

## Related

- [CLI Reference](cli.md) — Terminal commands
- [Commands](commands.md) — Slash commands and skills
- [Getting Started](getting-started.md) — First-time setup
