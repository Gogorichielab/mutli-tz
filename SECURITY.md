# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues,
discussions, or pull requests.**

Instead, report them privately through GitHub's built-in vulnerability reporting:

1. Go to the repository's **Security** tab.
2. Click **Report a vulnerability** (GitHub Private Vulnerability Reporting).
3. Provide as much of the following as you can:
   - A description of the vulnerability and its impact
   - Steps to reproduce (proof of concept, if possible)
   - Affected version(s) and environment
   - Any suggested remediation

If Private Vulnerability Reporting is not available to you, open a minimal issue
that says only "requesting a private security contact" (with **no** vulnerability
details) so a maintainer can follow up privately.

### Response expectations

- We aim to acknowledge new reports within **48 hours**.
- We aim to provide a status update at least every **5 business days** until the
  report is resolved.
- Once a fix is available, we will coordinate disclosure with the reporter.

## Security Measures

This project applies the following baseline controls:

- Dependencies (npm) and GitHub Actions are scanned and updated via Dependabot.
- `npm audit` runs against a `moderate` severity baseline (see `.npmrc`).
- External map data and web fonts are bundled locally rather than loaded from
  third-party CDNs, and a Content-Security-Policy restricts resources to the
  app's own origin.
- CI/CD workflows run with least-privilege `GITHUB_TOKEN` permissions.
