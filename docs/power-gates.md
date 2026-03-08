# OpenSpecPowers Quality Gates

OpenSpecPowers fuses OpenSpecPowers artifact workflows with renamed SuperPowers-style enforcement gates.

## Why gates exist

Artifact generation alone does not guarantee implementation quality. Gates are applied during propose, apply, and verify phases.

## Gate set

| Gate | Phase | Purpose |
|---|---|---|
| `power-clarity-gate` | propose | Ensure tasks are concrete and testable |
| `power-scope-gate` | propose | Ensure tasks remain within approved change scope |
| `power-risk-gate` | propose | Force risky assumptions into explicit notes |
| `power-red-green-gate` | apply | Enforce test-first execution before production changes |
| `power-root-cause-gate` | apply | Enforce structured debugging instead of patch guessing |
| `power-evidence-gate` | apply/verify | Require evidence before marking work complete |
| `power-review-gate` | verify | Require focused review of risky code paths |
| `power-regression-gate` | verify | Confirm changed behaviors are covered |

## Legacy-to-new trigger mapping

These replacements avoid collisions with external SuperPowers installs:

| Legacy term | OpenSpecPowers term |
|---|---|
| `test-driven-development` | `power-red-green-gate` |
| `systematic-debugging` | `power-root-cause-gate` |
| `verification-before-completion` | `power-evidence-gate` |
| `requesting-code-review` | `power-review-gate` |

## Operator rule

If an artifact step says complete but gate evidence is missing, the step is treated as incomplete.
