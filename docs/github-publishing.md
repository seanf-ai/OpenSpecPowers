# GitHub Publishing Checklist

This document covers what is needed to publish `OpenSpecPowers` to your own GitHub account and keep it as a healthy open-source project.

## 1) Inputs Required

Provide these values before automation:

- GitHub username (or org): `YOUR_GITHUB_OWNER`
- Repository name: usually `OpenSpecPowers`
- Visibility: `public` or `private`
- Git commit identity:
  - `GIT_NAME`
  - `GIT_EMAIL`
- Personal Access Token (classic or fine-grained) with:
  - repo administration/write access for target repo
  - contents: read/write
  - pull requests: read/write
  - workflows: read/write (if editing workflow files by push)

## 2) Optional but Recommended

- npm scope/package plan (`@your-scope/openspecpowers` or keep current)
- project website URL
- security contact email
- support channel (Discussions/Discord/Email)

## 3) Pre-Publish Local Checks

```bash
npm run build
npm test
bash scripts/opsp-conflict-audit.sh .
```

## 4) Create Repo and Push

```bash
# Set identity in this repo
git config user.name "YOUR_NAME"
git config user.email "YOUR_EMAIL"

# Point remote to your repository
git remote set-url origin https://github.com/YOUR_GITHUB_OWNER/OpenSpecPowers.git

# Push current branch
git push -u origin main
```

If the repository does not exist yet, create it first in GitHub UI or via API, then run the commands above.

## 5) GitHub Repository Settings

After first push, configure:

- Description
- Topics: `ai`, `cli`, `spec-driven-development`, `openspecpowers`
- Homepage URL
- Enable Issues
- Enable Discussions (optional, recommended)
- Default labels and issue templates
- Repository secret: `NPM_TOKEN` for automated npm publishing

## 5.1) Automatic npm Publishing

This repository uses tag-driven publishing.

Release flow:

```bash
npm version patch
git push origin main --follow-tags
```

GitHub Actions will:

- verify the pushed tag matches `package.json`
- build and test the package
- publish to npm using `NPM_TOKEN`
- create a GitHub Release for the tag

## 6) Open-Source Baseline Files

This repo includes:

- `LICENSE`
- `README.md`
- `CONTRIBUTING.md`
- `CODE_OF_CONDUCT.md`
- `SECURITY.md`
- `SUPPORT.md`
- `.github/ISSUE_TEMPLATE/*`
- `.github/pull_request_template.md`

## 7) Personal Profile Checklist

For your GitHub profile page:

- avatar
- display name
- bio
- location
- website link
- profile README (optional but useful)
- pinned repositories
