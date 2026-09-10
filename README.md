# OOP Cards

A beginner-friendly card game for learning object-oriented programming. Read a short explanation, answer five card challenges, then connect the idea to a TypeScript example.

## Included

- Classes and objects
- Properties and methods
- Encapsulation
- Inheritance
- Polymorphism

All five lessons are playable in any order. Wrong answers include explanations and unlimited retries. Completed concepts are saved in local storage on the current browser, with a reset option. A concept library provides a quick reference. Answer buttons support keyboard and touch interaction.

## Languages

Use the **English / Eesti** switch in the header at any time. The interface, all five lessons, challenge feedback, and concept library are available in both languages. Switching preserves the current card, selected answer, and completed lessons.

The language choice is saved separately from learning progress. On a first visit, a browser whose primary language is Estonian starts in Estonian; other browsers start in English. TypeScript identifiers and examples remain the same in both languages.

## Run locally

Use Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Verify

```sh
npm test
```

Tests cover all 25 challenges in English and Estonian, language selection and persistence, switching during a challenge, wrong-answer retries, theory revisits, lesson completion, saved progress, replay behavior, and independent TypeScript checking of every teaching example.

## Build and preview

```sh
npm run build
npm run preview
```

The build type-checks the application and creates the static site in `dist/`. No backend, API keys, or accounts are required. Fonts load from Google Fonts, with local sans-serif fallbacks when unavailable.

## Deploy to GitHub Pages

1. Push the project to the repository's `main` or `master` branch.
2. In GitHub, open **Settings → Pages → Build and deployment** and choose **GitHub Actions** as the source.
3. The **Deploy to GitHub Pages** workflow builds and publishes the site. If the initial run happened before Pages was enabled, rerun it from the Actions tab or run it manually.

For this repository, the expected address is **https://tluhk.github.io/oop/** once deployment succeeds. The workflow also reports the deployed URL.

Vite uses relative asset paths (`base: './'`), so the build works beneath the repository path and at a domain root. Navigation stays inside the page, with no server routing required.

Deployment follows the official [Vite static deployment guide](https://vite.dev/guide/static-deploy#github-pages) and [GitHub Pages workflow documentation](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

## Editing the game

- `src/lessons.ts`: theory, challenge cards, correct answers, explanations, and TypeScript examples.
- `src/lessons.et.ts`: Estonian lesson content; shares answer indices, icons, and code with English.
- `src/i18n.ts`: interface translations and language preference handling.
- `src/main.ts`: lesson flow, rendering, answer checking, and saved progress.
- `src/style.css`: responsive styles.
- `.github/workflows/deploy.yml`: production build and Pages deployment.

Examples are read-only teaching material, not an in-browser code editor. Each example is standalone. To add a challenge, update its lesson in `src/lessons.ts`; the initial version is designed around five challenges per lesson.
