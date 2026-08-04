# Umbracore Dynamics Website

Client-facing, multilingual website for **Umbracore Dynamics**, built with HTML, CSS, Vanilla JavaScript, and a C++17 security policy engine validated through GitHub Actions.

> Strength in Protection. Precision in Strategy.

## Features

- Responsive executive website
- Original Umbracore Dynamics logo artwork
- Dark and light themes
- English, Spanish, French, German, and Portuguese
- Banking, FinTech, Automotive, and Aerospace expertise
- Blue, Red, and Purple service pathways
- ISO management-system readiness pathways
- Consent-aware Google Analytics 4 pipeline
- WhatsApp, Email, LinkedIn, Medium, and X contact workflows
- WCAG 2.2 Level AA alignment target
- C++17 default-deny contact policy engine
- GitHub Pages validation and deployment workflows

## Repository structure

```text
umbracore-dynamics-site-v2/
├── README.md
├── LICENSE.md
├── CHANGELOG.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── SECURITY.md
├── ACCESSIBILITY.md
├── PRIVACY.md
├── TERMS.md
├── ANALYTICS.md
├── DEPLOYMENT.md
├── POLICY-ENGINE.md
├── CONTACT-WORKFLOWS.md
├── index.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── .nojekyll
├── .gitignore
├── assets/
├── css/
├── js/
├── localization/
├── policy-engine/
├── docs/
└── .github/
```

## Recommended commit order

1. **Foundation** — README, license, security, contributing, code of conduct, and changelog.
2. **Website** — HTML, CSS, JavaScript, assets, localization, 404, robots, sitemap, and `.nojekyll`.
3. **Documentation** — ordered documentation sections, privacy, accessibility, analytics, terms, deployment, and workflows.
4. **Automation** — GitHub workflows, issue templates, and pull-request template.
5. **C++ policy engine** — source, tests, and generated policy manifest.
6. **Production configuration** — GA4 Measurement ID, final GitHub Pages URL, optional custom domain, and protected contact backend.

## Local preview

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## C++ validation

```bash
cmake -S policy-engine -B build
cmake --build build
ctest --test-dir build --output-on-failure
```

## GitHub Pages

1. Push to `main`.
2. Open **Settings → Pages**.
3. Select **GitHub Actions**.
4. Run the included validation and deployment workflows.

## Configuration required

- Replace `G-XXXXXXXXXX` in `js/app.js`.
- Replace placeholder URLs in `robots.txt` and `sitemap.xml`.
- Review legal and privacy drafts with qualified counsel.
- Keep the inquiry form in demo mode until a protected backend is deployed.

## License

Copyright © 2026 Umbracore Dynamics. All rights reserved.
