# Frontend Software Engineer

A modern portfolio built with React 19, TypeScript, and Vite with **Progressive Web App (PWA)** capabilities.

## ✨ Features

- **🔧 PWA Enabled**: Installable app with offline support and 31 cached assets
- **📱 Responsive Design**: Mobile-first approach with optimal UX
- **🌐 Offline Capable**: Browse portfolio and content offline
- **⚡ Performance Optimized**: Tree shaking, lazy loading and smart caching
- **🛍️ Marketplace Integration**: Showcase of a live e-commerce platform
- **📄 PDF Generation**: Downloadable CV with pdfMake
- **🔄 Context API**: Efficient state management
- **🛡️ Error Boundaries**: Graceful error handling
- **♿ Accessibility**: ARIA labels and keyboard navigation

## 🛠️ Tech Stack

### Core Technologies
- **React 19**: Latest React with concurrent features
- **TypeScript 5.9**: Strict type-safe development
- **Vite 7**: Lightning-fast build tool with tree shaking

### Backend & Database (Marketplace)
- **PostgreSQL**: Relational database
- **Supabase**: Backend-as-a-service platform
- **Prisma**: Modern ORM for database interactions

### PWA & Performance
- **Vite PWA Plugin**: Service worker and manifest generation with 31 precached entries
- **Workbox**: Advanced caching strategies (31 assets, 2.3MB precache)
- **Web App Manifest**: Native app-like installation
- **Tree Shaking**: Aggressive dead code elimination

### Code Quality & Testing
- **ESLint 9**: Modern linting configuration
- **Prettier**: Consistent code formatting
- **TypeScript Strict**: Enhanced type checking with full strictness
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
- **Offline Access**: Browse your portfolio without internet

### Offline Capabilities
- ✅ Complete UI navigation and portfolio section browsing
- ✅ All cached assets load instantly (31 precached files)
- ✅ Portfolio content, experience, and about sections available
- ✅ Graceful fallbacks for online-only features
- ❌ Contact form requires internet connection
- ❌ Marketplace showcase requires internet for full interactivity
- ❌ External links need active connection

### Performance Benefits
- **Instant Loading**: 31 precached assets (2.3MB) load immediately
- **Background Updates**: New content downloads silently
- **Reduced Data Usage**: Only changed content re-downloads
- **Smart Caching**: Fonts cached for 365 days, images for 30 days
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
│   │   ├── Hero.css
│   │   ├── Hero.tsx
│   │   ├── LazyWrapper.tsx
│   │   ├── LoadingSpinner.css
│   │   ├── LoadingSpinner.tsx
│   │   ├── Marketplace.css
│   │   ├── Marketplace.tsx
│   │   ├── MobileMenu.css
│   │   ├── MobileMenu.tsx
│   │   ├── Navigation.css
│   │   ├── Navigation.tsx
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

- `npm run dev` - Start development server with hot reload (localhost:5173)
- `npm run build` - Build for production with PWA generation and optimizations
- `npm run preview` - Preview production build locally
- `npm run lint` - Lint code with ESLint
- `npm run test` - Run unit tests with Vitest
- `npm run format` - Format code with Prettier
- `npm run check-circular` - Check for circular dependencies

## 🚀 Build Optimizations

The production build includes several performance optimizations:

### Code Splitting
- **React bundle**: Separate chunk for React and React-DOM
- **Icons chunk**: react-icons in dedicated bundle
- **Moment chunk**: Separate moment.js bundle
- **Vendor misc**: Other dependencies grouped together

### Tree Shaking
- Aggressive dead code elimination enabled
- Module side effects: false (safe removal of unused exports)
- Property read side effects optimized
- Rollup configuration for maximum unused code elimination

### PWA Caching
- **31 precached assets** (2369.10 KiB total)
- **Fonts**: 365-day cache (Google Fonts, gstatic)
- **Images**: 30-day cache with max 100 entries
- **Auto updates**: Service worker checks for new content

### File Size
- **Minification**: esbuild for optimal compression
- **Gzip compression**: Significant reduction in transfer size
- **Assets optimized**: PNG, WebP, SVG, and font files

## Git Optimizations

- .gitattributes for line endings
- .gitignore for exclusions
- VS Code workspace config

