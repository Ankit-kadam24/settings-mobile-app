# Settings App

A cross-platform mobile and web application built with [Ionic Framework](https://ionicframework.com/), [Angular](https://angular.io/), and [Capacitor](https://capacitorjs.com/). This project serves as a starter template for building modern, performant apps targeting Android and the web.

## Features
- Ionic UI components for a native look and feel
- Angular 20+ for robust SPA development
- Capacitor for native functionality and Android builds
- Device info display on Home page (with copy-to-clipboard functionality)
- Android runtime permissions management
- SCSS-based theming

## Project Structure
```
settings/
├── android/                # Android native project (Capacitor, Gradle, Java sources)
│   ├── app/                # Android app module
│   └── ...
├── src/
│   ├── app/
│   │   ├── home/           # Home page module/component
│   │   │   ├── home.page.ts
│   │   │   ├── home.page.html
│   │   │   ├── home.page.scss
│   │   │   └── ...
│   │   └── services/
│   │       └── common.service.ts  # Device info and permissions logic
│   ├── assets/             # Static assets (icons, images, etc.)
│   ├── environments/       # Angular environment configs
│   ├── theme/              # SCSS theme variables
│   └── global.scss         # Global styles
├── capacitor.config.ts     # Capacitor configuration
├── package.json            # NPM dependencies and scripts
├── angular.json            # Angular CLI configuration
└── ...
```

## Device Info & Permissions
- The Home page displays device information (model, platform, OS version, manufacturer, etc.) using a grid view.
- Each value can be copied to clipboard individually.
- Device info and UUID are provided by `CommonService` (`src/app/services/common.service.ts`) using Capacitor plugins:
  - `@capacitor/device` for device details
  - `@capacitor/preferences` for persistent UUID
- Android runtime permissions (camera, location, storage, etc.) are managed using `@awesome-cordova-plugins/android-permissions`.

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
- Edit `src/app/home/` for the Home page UI and logic
- Edit `src/app/services/common.service.ts` for device info and permissions logic
- Add new pages/components using the Ionic CLI or Angular CLI
- Customize styles in `src/global.scss` and `src/theme/variables.scss`

## Learn More
- [Ionic Docs](https://ionicframework.com/docs)
- [Angular Docs](https://angular.io/docs)
- [Capacitor Docs](https://capacitorjs.com/docs)
- [Awesome Cordova Plugins](https://ionicframework.com/docs/native/community)

---

© Ionic Framework. Starter template for your next app.
