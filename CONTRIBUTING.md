# Contributing to OpenSpecPowers

Thanks for contributing. This guide keeps contributions consistent and reviewable.

## Ground Rules

- Keep pull requests focused on one change.
- Include tests for behavior changes.
- Avoid unrelated refactors in the same PR.
- Follow the Code of Conduct in [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## Local Setup

Requirements:

- Node.js `>=20.19.0`
- pnpm `9.x` (recommended)

Install and run checks:

```bash
pnpm install
pnpm run build
pnpm test
pnpm lint
```

## Development Workflow

1. Fork the repository and create a branch from `main`.
2. Implement your change with tests.
3. Run `pnpm run build && pnpm test && pnpm lint`.
4. Open a PR using the PR template.

## Commit Style

Use conventional commit prefixes:

- `feat:`
- `fix:`
- `docs:`
- `refactor:`
- `test:`
- `chore:`

Example:

```text
feat(cli): add profile sync warning for stale config
```

## Change Proposals

For significant behavior changes, open a proposal first under `openspecpowers/changes/` and align on:

- problem statement
- user impact
- rollout and migration

## Review Expectations

- CI must pass.
- New functionality should include tests.
- Breaking changes require migration notes.

## Release Notes

This repo uses Changesets. If your PR affects users, add a changeset:

```bash
pnpm changeset
```

