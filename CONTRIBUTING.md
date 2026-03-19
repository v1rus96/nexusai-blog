# Contributing to LionTech

Welcome! This guide covers how we work. It's short on purpose — we're a small team (1 human + AI agents) and prefer shipping over process.

---

## Branching Strategy

| Branch | Purpose | Protection |
|--------|---------|------------|
| `main` | Production-ready code. **Protected** — no direct pushes. | ✅ Branch protection enabled |
| `feature/<name>` | New features. Branch from `main`. | Standard workflow |
| `fix/<name>` | Bug fixes. | Standard workflow |
| `hotfix/<name>` | Urgent production fixes. Branch from `main`. | Requires admin approval |
| `chore/<name>` | Refactors, deps, CI, docs — no behavior change. | Standard workflow |
| `docs/<name>` | Documentation updates only. | Standard workflow |

**Naming rules:**
- All lowercase, hyphens only: `feature/add-search-bar`
- Keep names short and descriptive
- Include issue number when applicable: `fix/42-broken-nav`

**Branch Protection Rules (enforced on `main`):**
- ✅ Require pull request reviews (minimum 1 approval)
- ✅ Require status checks to pass before merging
- ✅ Require linear history (squash merge only)
- ✅ Include administrators (no bypass allowed)
- ❌ Force pushes disabled
- ❌ Branch deletions disabled

---

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/). This keeps the git log clean and enables automated changelogs.

**Format:**
```
<type>(<scope>): <short description>

[optional body]

[optional footer: Closes #123]
```

**Types:**

| Type | When to use |
|------|------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change, no new feature or fix |
| `test` | Adding or updating tests |
| `chore` | Build, CI, deps, tooling |
| `perf` | Performance improvement |

**Examples:**
```
feat(blog): add MDX rendering for posts
fix(seo): correct meta tags on article pages
chore(deps): bump next to 16.1.0
docs: update README with setup instructions
```

**Breaking changes:** Add `!` after type or include `BREAKING CHANGE:` in footer:
```
feat(api)!: change auth endpoint response format
```

---

## Pull Request Process

1. **Create a branch** from `main` (or `develop` if active) using the naming convention above.
2. **Make your changes.** Keep PRs focused — one feature/fix per PR.
3. **Write clear commit messages** following Conventional Commits.
4. **Open a PR** against `main` (or `develop`). The PR template will guide you.
5. **Request review.** At least 1 approval required before merge.
6. **Address feedback.** Push fixes as new commits (don't force-push during review).
7. **Merge.** Use **Squash and merge** for feature branches to keep `main` clean.

**PR tips:**
- Link the issue (`Closes #42`) so it auto-closes on merge
- Keep the description short but useful — future you will thank you
- Add screenshots for UI changes

---

## Code Review Expectations

**For reviewers:**
- Respond within 24 hours (or flag if you can't)
- Focus on correctness, security, and maintainability
- Be specific — suggest fixes, don't just say "this is wrong"
- Approve when it's good enough, not perfect

**For authors:**
- Don't take feedback personally — we're improving the code, not judging you
- Explain non-obvious decisions in PR description or comments
- If you disagree with feedback, discuss — don't just ignore it

---

## Labels

We use a consistent label system across all repos. See the issue templates for default labels. Key ones:

- **Priority:** `critical` / `high` / `medium` / `low`
- **Type:** `bug` / `feature` / `task` / `docs` / `refactor` / `security`
- **Status:** `blocked` / `in-progress` / `in-review` / `ready`
- **Agent:** `agent: assigned` / `agent: human`

---

## Security & Quality Gates

**Required Checks (enforced via branch protection):**
- ✅ **CI Pipeline:** ESLint, TypeScript, build test must pass
- ✅ **Code Review:** At least 1 approval from CODEOWNERS
- ✅ **Linear History:** Only squash merges allowed
- ✅ **No Bypass:** Administrators must follow the same rules

**Code Quality Standards:**
- No `console.log` or debug statements in production code
- All TypeScript errors must be resolved
- ESLint warnings should be addressed or justified
- Follow conventional commit format for traceability
- Include tests for new features when applicable

**Security Practices:**
- Never commit secrets, API keys, or credentials
- Use environment variables for configuration
- Review dependencies for known vulnerabilities
- Follow secure coding practices for authentication/authorization
- Report security issues privately (see SECURITY.md when available)

---

## Getting Started

```bash
# Clone the repo
git clone git@github.com:LionTech/<repo-name>.git
cd <repo-name>

# Install dependencies
npm install

# Create your branch
git checkout -b feature/your-feature-name

# Make changes, commit, push
git add .
git commit -m "feat(scope): what you did"
git push origin feature/your-feature-name

# Open PR on GitHub
```

---

Questions? Open an issue or ping in the project board. Let's build. 🦁
