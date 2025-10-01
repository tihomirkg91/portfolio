# Frontend Software Engineer

A modern portfolio built with React 19, TypeScript, and Vite with **Progressive Web App (PWA)** capabilities.

## ✨ Features

- **🔧 PWA Enabled**: Installable app with offline support
- **📱 Responsive Design**: Mobile-first approach with optimal UX
- **🌐 Offline Capable**: Works without internet connection
- **⚡ Performance Optimized**: Lazy loading and smart caching
- **🎮 Interactive Game**: Falling Planet rhythm game included
- **📄 PDF Generation**: Downloadable CV with pdfMake
- **🔄 Context API**: Efficient state management
- **🛡️ Error Boundaries**: Graceful error handling
- **♿ Accessibility**: ARIA labels and keyboard navigation

## 🛠️ Tech Stack

### Core Technologies
- **React 19**: Latest React with concurrent features
- **TypeScript 5.8**: Type-safe development
- **Vite 7**: Lightning-fast build tool

### PWA & Performance
- **Vite PWA Plugin**: Service worker and manifest generation
- **Workbox**: Advanced caching strategies
- **Web App Manifest**: Native app-like installation

### Code Quality & Testing
- **ESLint 9**: Modern linting configuration
- **Prettier**: Consistent code formatting
- **TypeScript Strict**: Enhanced type checking
- **Vitest**: Fast unit testing framework

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/tihomirkg91/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production (includes PWA generation)
npm run build

# Preview production build
npm run preview
```

## 📱 PWA Features

This portfolio is a **Progressive Web App** with the following capabilities:

### Installation
- **Desktop**: Install via browser prompt or install button
- **Mobile**: Add to home screen for native app experience
- **Offline Access**: Full functionality without internet

### Offline Capabilities
- ✅ Complete UI navigation and portfolio browsing
- ✅ Falling Planet game works entirely offline
- ✅ Cached images and assets load instantly
- ✅ Graceful fallbacks for online-only features
- ❌ Contact form requires internet connection
- ❌ External links need active connection

### Performance Benefits
- **Instant Loading**: Cached resources load immediately
- **Background Updates**: New content downloads silently
- **Reduced Data Usage**: Only changed content re-downloads
- **Native Feel**: App-like experience with smooth navigation

For detailed PWA information, see [PWA_GUIDE.md](./PWA_GUIDE.md)

## Project Structure

```
portfolio/
├── .env
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── package-lock.json
├── portfolio.code-workspace
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── public/
│   ├── favicon-placeholder.txt
│   ├── favicon.svg
│   ├── game.webp
│   ├── manifest.json
│   ├── pic.webp
│   ├── prot-pic.webp
│   └── sw.js
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── vite-env.d.ts
│   ├── zIndex.css
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── About.css
│   │   ├── About.tsx
│   │   ├── ComingSoonModal.css
│   │   ├── ComingSoonModal.tsx
│   │   ├── Contact.css
│   │   ├── Contact.tsx
│   │   ├── DesktopMenu.css
│   │   ├── DesktopMenu.tsx
│   │   ├── ErrorBoundary.css
│   │   ├── ErrorBoundary.tsx
│   │   ├── Experience.css
│   │   ├── Experience.tsx
│   │   ├── Footer.css
│   │   ├── Footer.tsx
│   │   ├── GamePage.css
│   │   ├── GamePage.tsx
│   │   ├── Hero.css
│   │   ├── Hero.tsx
│   │   ├── LazyWrapper.tsx
│   │   ├── LoadingSpinner.css
│   │   ├── LoadingSpinner.tsx
│   │   ├── MobileMenu.css
│   │   ├── MobileMenu.tsx
│   │   ├── Navigation.css
│   │   ├── Navigation.tsx
│   │   ├── Projects.css
│   │   ├── Projects.tsx
│   │   ├── falling-planet/
│   │   │   ├── constants.ts
│   │   │   ├── FallingPlanet.css
│   │   │   ├── FallingPlanet.tsx
│   │   │   ├── GameArea.tsx
│   │   │   ├── GameControls.tsx
│   │   │   ├── GameInstructions.tsx
│   │   │   ├── GameOverModal.css
│   │   │   ├── GameOverModal.tsx
│   │   │   ├── types.ts
│   │   │   └── useGameLogic.ts
│   │   ├── pdf/
│   │   │   ├── CVDownloadButton.css
│   │   │   ├── CVDownloadButton.tsx
│   │   │   ├── imageConverter.ts
│   │   │   ├── pdfDocumentBuilder.ts
│   │   │   ├── useCvGenerator.ts
│   │   │   ├── useImageLoader.ts
│   │   │   └── usePdfGenerator.ts
│   │   └── pwa/
│   │       ├── PwaModal.css
│   │       ├── PwaModal.tsx
│   │       └── useInstallPrompt.ts
│   ├── context/
│   │   ├── PortfolioContext.tsx
│   │   ├── PortfolioContextTypes.ts
│   │   ├── ResponsiveContext.tsx
│   │   └── ResponsiveContextTypes.ts
│   ├── hooks/
│   │   ├── useActiveDetection.ts
│   │   ├── useActiveSection.ts
│   │   ├── useImageLoading.ts
│   │   ├── useMobileOptimizedScroll.ts
│   │   ├── useNavigationScroll.ts
│   │   ├── useNavItems.ts
│   │   ├── usePortfolio.ts
│   │   ├── useResponsive.ts
│   │   ├── useScrollNavigation.ts
│   │   └── useServiceWorker.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── featureFlags.ts
│       ├── generateId.ts
│       ├── headerOffset.ts
│       ├── pwaStorage.ts
│       └── zIndex.ts
└── test/
    ├── setup/
    │   ├── test-providers.tsx
    │   ├── test-setup.ts
    │   └── test-utils.tsx
    └── unit/
        ├── generateId.test.ts
        └── LoadingSpinner.test.tsx
        ├── generateId.test.ts
        └── LoadingSpinner.test.tsx
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Lint code
- `npm run test` - Run tests with Vitest

## Git Optimizations

- .gitattributes for line endings
- .gitignore for exclusions
- VS Code workspace config

