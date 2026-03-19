# 📁 REORG-SPEC — Root Cleanup & docs/ Migration

**Project:** TechLion Blog (`LionTechAI/techlion-blog`)
**Date:** 2026-03-19
**Status:** Ready for execution

---

## Goal

Reduce root from 15 `.md` files to 5 standard files. Move all project documentation into a structured `docs/` tree.

## Root Files (keep — 5)

| File | Purpose |
|---|---|
| `README.md` | Project overview |
| `CHANGELOG.md` | Active changelog |
| `CONTRIBUTING.md` | Contributor guide |
| `AGENTS.md` | AI agent config (must stay at root — tooling requirement) |
| `CLAUDE.md` | Claude config (must stay at root — tooling requirement) |

## Migration Map (10 files → docs/)

| Current Location | New Location |
|---|---|
| `DESIGN-SPEC.md` | `docs/design/DESIGN-SPEC.md` |
| `DESIGN-SPECS.md` | `docs/design/DESIGN-SPECS.md` |
| `GROWTH-STRATEGY.md` | `docs/strategy/GROWTH-STRATEGY.md` |
| `IMPROVEMENT-PLAN.md` | `docs/strategy/IMPROVEMENT-PLAN.md` |
| `PRODUCTION-SCOPE.md` | `docs/strategy/PRODUCTION-SCOPE.md` |
| `QA-REPORT.md` | `docs/qa/QA-REPORT.md` |
| `QA-REPORT-CHAT-IMAGES.md` | `docs/qa/QA-REPORT-CHAT-IMAGES.md` |
| `CONTENT-REVIEW.md` | `docs/qa/CONTENT-REVIEW.md` |
| `SUPPORT-SYSTEM-SPEC.md` | `docs/specs/SUPPORT-SYSTEM-SPEC.md` |
| `CHANGELOG-TEMPLATE.md` | `docs/templates/CHANGELOG-TEMPLATE.md` |

### docs/ Tree After Migration

```
docs/
├── REORG-SPEC.md          ← this file
├── design/
│   ├── DESIGN-SPEC.md
│   └── DESIGN-SPECS.md
├── strategy/
│   ├── GROWTH-STRATEGY.md
│   ├── IMPROVEMENT-PLAN.md
│   └── PRODUCTION-SCOPE.md
├── qa/
│   ├── QA-REPORT.md
│   ├── QA-REPORT-CHAT-IMAGES.md
│   └── CONTENT-REVIEW.md
├── specs/
│   └── SUPPORT-SYSTEM-SPEC.md
└── templates/
    └── CHANGELOG-TEMPLATE.md
```

## Cross-Reference Fixes Required

These internal `.md` links must be updated after migration:

| File (new path) | Reference | Old Target | New Target |
|---|---|---|---|
| `docs/qa/CONTENT-REVIEW.md` | line ~505 | `PRODUCTION-SCOPE.md` | `../strategy/PRODUCTION-SCOPE.md` |
| `docs/strategy/PRODUCTION-SCOPE.md` | line ~291 | `IMPROVEMENT-PLAN.md` | `IMPROVEMENT-PLAN.md` _(same dir, no change)_ |
| `docs/qa/QA-REPORT-CHAT-IMAGES.md` | line ~6 | `SUPPORT-SYSTEM-SPEC.md` | `../specs/SUPPORT-SYSTEM-SPEC.md` |
| `docs/qa/QA-REPORT-CHAT-IMAGES.md` | line ~6 | `DESIGN-SPEC.md` | `../design/DESIGN-SPEC.md` |
| `docs/qa/QA-REPORT.md` | line ~6 | `PRODUCTION-SCOPE.md` | `../strategy/PRODUCTION-SCOPE.md` |

## Execution Steps

```bash
# 1. Create directory structure
mkdir -p docs/{design,strategy,qa,specs,templates}

# 2. Move files (git mv preserves history)
git mv DESIGN-SPEC.md docs/design/
git mv DESIGN-SPECS.md docs/design/
git mv GROWTH-STRATEGY.md docs/strategy/
git mv IMPROVEMENT-PLAN.md docs/strategy/
git mv PRODUCTION-SCOPE.md docs/strategy/
git mv QA-REPORT.md docs/qa/
git mv QA-REPORT-CHAT-IMAGES.md docs/qa/
git mv CONTENT-REVIEW.md docs/qa/
git mv SUPPORT-SYSTEM-SPEC.md docs/specs/
git mv CHANGELOG-TEMPLATE.md docs/templates/

# 3. Fix cross-references (see table above)
# 4. Update README.md with 📚 Documentation section
# 5. Commit: "chore: reorganize .md files into docs/"
```

## README.md Update

Add this section to `README.md`:

```markdown
## 📚 Documentation

| Category | Files |
|---|---|
| **Design** | [Design Spec](docs/design/DESIGN-SPEC.md) · [Design Specs](docs/design/DESIGN-SPECS.md) |
| **Strategy** | [Growth Strategy](docs/strategy/GROWTH-STRATEGY.md) · [Improvement Plan](docs/strategy/IMPROVEMENT-PLAN.md) · [Production Scope](docs/strategy/PRODUCTION-SCOPE.md) |
| **QA** | [QA Report](docs/qa/QA-REPORT.md) · [Chat Images QA](docs/qa/QA-REPORT-CHAT-IMAGES.md) · [Content Review](docs/qa/CONTENT-REVIEW.md) |
| **Specs** | [Support System](docs/specs/SUPPORT-SYSTEM-SPEC.md) |
| **Templates** | [Changelog Template](docs/templates/CHANGELOG-TEMPLATE.md) |
| **Meta** | [Reorg Spec](docs/REORG-SPEC.md) |
```

## Acceptance Criteria

- [ ] Only 5 `.md` files in project root
- [ ] All 10 files exist at new `docs/` paths with identical content
- [ ] No broken cross-references between `.md` files
- [ ] `README.md` has "📚 Documentation" section with docs/ structure
- [ ] Git history preserved (`git mv` used for all moves)
- [ ] Build still passes (`npm run build` or equivalent)
- [ ] `.github/` templates unaffected

## Risks & Notes

- **Git history:** `git mv` = `mv` + `git add`. GitHub follows renames well with `-M` flag in `git log`.
- **`.github/` safe:** No `.github/` templates reference these files (verified — none exist or are unrelated).
- **Build:** These are documentation files only; no imports in source code. Build impact: zero.
