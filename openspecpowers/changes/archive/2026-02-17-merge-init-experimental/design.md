## Context

Currently `openspecpowers init` and `openspecpowers experimental` are separate commands with distinct purposes:

- **init**: Creates `openspecpowers/` directory, generates `AGENTS.md`/`project.md`, configures tool config files (`CLAUDE.md`, etc.), generates old slash commands (`/openspecpowers:proposal`, etc.)
- **experimental**: Generates skills (9 per tool), generates opsp slash commands (`/opsp:new`, etc.), creates `config.yaml`

The skill-based workflow (experimental) is the direction we're going, so we're making it the default by merging into `init`.

## Goals / Non-Goals

**Goals:**
- Single `openspecpowers init` command that sets up the complete skill-based workflow
- Clean migration path for existing users with legacy artifacts
- Remove all code related to config files and old slash commands
- Keep the polished UX from experimental (animated welcome, searchable multi-select)

**Non-Goals:**
- Supporting both workflows simultaneously
- Providing options to use the old workflow
- Backward compatibility for `/openspecpowers:*` commands (breaking change)

## Decisions

### Decision 1: Merge into init, not into experimental

**Choice**: Rewrite `init` to do what `experimental` does, then delete `experimental`.

**Rationale**: `init` is the canonical setup command. Users expect `init` to set up their project. `experimental` was always meant to be temporary.

**Alternatives considered**:
- Keep `experimental` as the main command → confusing name for default behavior
- Create new command → unnecessary, `init` already exists

### Decision 2: Legacy cleanup with Y/N prompt

**Choice**: Detect legacy artifacts, show what was found, prompt `"Legacy files detected. Upgrade and clean up? [Y/n]"`, then remove if confirmed.

**Rationale**: Users should know what's being removed. A single Y/N is simple and decisive. No need for multiple options.

**Alternatives considered**:
- Multiple options (keep/remove/cancel) → overcomplicated
- Silent removal → users might be surprised
- Just warn without removing → leaves cruft

### Decision 3: Surgical removal of legacy content

**Choice**: For files with mixed content (OpenSpecPowers markers + user content), only remove the OpenSpecPowers marker block. For files that are 100% OpenSpecPowers content, delete the entire file.

**Rationale**: Respects user customizations. CLAUDE.md might have other instructions beyond OpenSpecPowers.

**Edge cases**:
- **Config files with mixed content**: Remove only `<!-- OPENSPEC:START -->` to `<!-- OPENSPEC:END -->` block
- **Config files that are 100% OpenSpecPowers**: Delete file entirely (check if content outside markers is empty/whitespace)
- **Old slash command directories** (`.claude/commands/openspecpowers/`): Delete entire directory (ours)
- **`openspecpowers/AGENTS.md`**: Delete (ours)
- **Root `AGENTS.md`**: Only remove OpenSpecPowers marker block, preserve rest

### Decision 6: Preserve project.md with migration hint

**Choice**: Do NOT auto-delete `openspecpowers/project.md`. Preserve it and show a message directing users to manually migrate content to `config.yaml`'s `context:` field.

**Rationale**:
- `project.md` may contain valuable user-written project documentation
- The new workflow uses `config.yaml.context` for the same purpose (auto-injected into artifacts)
- Auto-deleting would lose user content; auto-migrating is complex (needs LLM to compress)
- Users can migrate manually or use `/opsp:explore` to get AI assistance

**Migration path**:
1. During legacy cleanup, detect `openspecpowers/project.md` but do not delete
2. Show in output: "openspecpowers/project.md still exists - migrate content to config.yaml's context: field, then delete"
3. User migrates manually or asks Claude in explore mode: "help me migrate project.md to config.yaml"
4. User deletes project.md when ready

**Why not auto-migrate?**
- `project.md` is verbose (sections, headers, placeholders)
- `config.yaml.context` should be concise and dense
- LLM compression would be ideal but adds complexity and non-determinism to init
- Manual migration lets users decide what's actually important

### Decision 4: Hidden alias for experimental

**Choice**: Keep `openspecpowers experimental` as a hidden command that delegates to `init`.

**Rationale**: Users who learned `experimental` can still use it during transition. Hidden means it won't show in help.

### Decision 5: Reuse existing infrastructure

**Choice**: Reuse skill templates, command adapters, welcome screen, and multi-select from experimental.

**Rationale**: Already built and working. Just needs to be called from init instead of experimental.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Users with custom `/openspecpowers:*` commands lose them | Document in release notes; old commands are in git history |
| Mixed-content detection might be imperfect | Conservative approach: if unsure, preserve the file and warn |
| Users confused by missing config files | Clear messaging in init output about what changed |
| `openspecpowers update` might break | Review and update `update` command to work with new structure |

## Architecture

### What init creates (after merge)

```
openspecpowers/
  ├── config.yaml           # Schema settings (from experimental)
  ├── specs/                # Empty, for user's specs
  └── changes/              # Empty, for user's changes
      └── archive/

.<tool>/skills/             # 9 skills per selected tool
  ├── openspecpowers-explore/SKILL.md
  ├── openspecpowers-new-change/SKILL.md
  ├── openspecpowers-continue-change/SKILL.md
  ├── openspecpowers-apply-change/SKILL.md
  ├── openspecpowers-ff-change/SKILL.md
  ├── openspecpowers-verify-change/SKILL.md
  ├── openspecpowers-sync-specs/SKILL.md
  ├── openspecpowers-archive-change/SKILL.md
  └── openspecpowers-bulk-archive-change/SKILL.md

.<tool>/commands/opsp/      # 9 slash commands per selected tool
  ├── explore.md
  ├── new.md
  ├── continue.md
  ├── apply.md
  ├── ff.md
  ├── verify.md
  ├── sync.md
  ├── archive.md
  └── bulk-archive.md
```

### What init no longer creates

- `CLAUDE.md`, `.cursorrules`, `.windsurfrules`, etc. (config files)
- `openspecpowers/AGENTS.md`
- `openspecpowers/project.md`
- Root `AGENTS.md` stub
- `.claude/commands/openspecpowers/` (old slash commands)

### Legacy detection targets

| Artifact Type | Detection Method | Removal Method |
|--------------|------------------|----------------|
| Config files (CLAUDE.md, etc.) | File exists AND contains OpenSpecPowers markers | Remove marker block; delete file if empty after |
| Old slash command dirs | Directory exists at `.<tool>/commands/openspecpowers/` | Delete entire directory |
| openspecpowers/AGENTS.md | File exists at `openspecpowers/AGENTS.md` | Delete file |
| openspecpowers/project.md | File exists at `openspecpowers/project.md` | **Preserve** - show migration hint only |
| Root AGENTS.md | File exists at `AGENTS.md` AND contains OpenSpecPowers markers | Remove marker block; delete file if empty after |

### Code to remove

- `src/core/configurators/` - entire directory (ToolRegistry, all config generators)
- `src/core/configurators/slash/` - entire directory (SlashCommandRegistry, old command generators)
- `src/core/templates/slash-command-templates.ts` - old `/openspecpowers:*` content
- `src/core/templates/claude-template.ts`
- `src/core/templates/cline-template.ts`
- `src/core/templates/costrict-template.ts`
- `src/core/templates/agents-template.ts`
- `src/core/templates/agents-root-stub.ts`
- `src/core/templates/project-template.ts`
- `src/commands/experimental/` - entire directory (merged into init)
- Related test files

### Code to migrate into init

- Animated welcome screen (`src/ui/welcome-screen.ts`) - keep, call from init
- Searchable multi-select (`src/prompts/searchable-multi-select.ts`) - keep, call from init
- Skill templates (`src/core/templates/skill-templates.ts`) - keep
- Command generation (`src/core/command-generation/`) - keep
- Tool states detection (from `experimental/setup.ts`) - move to init

## Open Questions

1. **What happens to `openspecpowers update`?** - RESOLVED

   **Current behavior**: Updates `openspecpowers/AGENTS.md`, config files (`CLAUDE.md`, etc.) via `ToolRegistry`, and old slash commands (`/openspecpowers:*`) via `SlashCommandRegistry`.

   **New behavior**: Rewrite to refresh skills and opsp commands instead:
   - Detect which tools have skills installed (check for `.claude/skills/openspecpowers-*/`, etc.)
   - Refresh all 9 skill files per installed tool using `skill-templates.ts`
   - Refresh all 9 opsp command files per installed tool using `command-generation/` adapters
   - Remove imports of `ToolRegistry`, `SlashCommandRegistry`, `agentsTemplate`
   - Update output messaging to reflect skills/commands instead of config files

   **Key principle**: Same as current update - only refresh existing tools, don't add new ones.

2. **Should we keep `openspecpowers schemas` and other experimental subcommands?** - RESOLVED

   **Decision**: Yes, keep them. Remove "[Experimental]" label from all subcommands (status, instructions, schemas, etc.). See task 4.3.
