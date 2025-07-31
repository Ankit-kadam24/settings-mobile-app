# Settings App

A cross-platform mobile and web application built with [Ionic Framework](https://ionicframework.com/), [Angular](https://angular.io/), and [Capacitor](https://capacitorjs.com/). This project serves as a starter template for building modern, performant apps targeting Android and the web.

## Features
- Ionic UI components for a native look and feel
- Angular 20+ for robust SPA development
- Capacitor for native functionality and Android builds
- Ready-to-customize Home page
- SCSS-based theming

## Project Structure
```
settings/
├── android/                # Android native project (Capacitor)
├── src/
│   ├── app/                # Angular app source code
│   │   ├── home/           # Home page module/component
│   │   └── ...
│   ├── assets/             # Static assets (icons, images, etc.)
│   ├── environments/       # Angular environment configs
│   ├── theme/              # SCSS theme variables
│   └── global.scss         # Global styles
├── capacitor.config.ts     # Capacitor configuration
├── package.json            # NPM dependencies and scripts
├── angular.json            # Angular CLI configuration
└── ...
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)
- [Android Studio](https://developer.android.com/studio) (for Android builds)

### Installation
```bash
npm install
```

### Running the App (Web)
```bash
ionic serve
```
Or directly with Angular CLI:
```bash
npm start
```

### Building the App (Web)
```bash
npm run build
```
The output will be in the `www/` directory (as configured for Capacitor).

### Running on Android
1. Build the web assets:
   ```bash
   npm run build
   ```
2. Sync with Capacitor:
   ```bash
   npx cap sync android
        or 
    ionic cap sync
   ```
3. Open Android Studio:
   ```bash
   npx cap open android
        or 
    ionic cap build android
    ionic cap build android --prod
   ```
4. Build and run from Android Studio or use a connected device/emulator.

## NPM Scripts
- `npm start` — Start the development server
- `npm run build` — Build the app for production
- `npm run test` — Run unit tests
- `npm run lint` — Lint the codebase

## Capacitor Configuration
- **App ID:** `io.ionic.starter`
- **App Name:** `settings`
- **Web Directory:** `www`
- **Platforms:** Android (native), Web

## Customization
- Edit `src/app/home/` for the Home page
- Add new pages/components using the Ionic CLI or Angular CLI
- Customize styles in `src/global.scss` and `src/theme/variables.scss`

## Learn More
- [Ionic Docs](https://ionicframework.com/docs)
- [Angular Docs](https://angular.io/docs)
- [Capacitor Docs](https://capacitorjs.com/docs)

---

© Ionic Framework. Starter template for your next app.
