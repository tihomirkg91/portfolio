# Frontend Developer Portfolio

A modern portfolio built with React 19, TypeScript, and Vite.

## Features

- Responsive design with mobile-first approach
- Context API for state management
- Custom hooks and error boundaries
- PDF generation with pdfMake
- Performance optimized with lazy loading

## Tech Stack

- React 19, TypeScript 5.8, Vite 7
- ESLint 9, Prettier

## Installation

```bash
git clone https://github.com/tihomirkg91/portfolio.git
cd portfolio
npm install
npm run dev
```

## Project Structure

```
portfolio/
├── eslint.config.js
├── index.html
├── LICENSE
├── package.json
├── portfolio.code-workspace
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── public/
│   ├── favicon-placeholder.txt
│   ├── favicon.svg
│   ├── game.webp
│   ├── pic.webp
│   └── prot-pic.webp
└── src/
    ├── App.css
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── vite-env.d.ts
    ├── assets/
    │   └── react.svg
    ├── components/
    │   ├── About.css
    │   ├── About.tsx
    │   ├── ComingSoonModal.css
    │   ├── ComingSoonModal.tsx
    │   ├── Contact.css
    │   ├── Contact.tsx
    │   ├── CVDownloadButton.css
    │   ├── CVDownloadButton.tsx
    │   ├── DesktopMenu.css
    │   ├── DesktopMenu.tsx
    │   ├── ErrorBoundary.css
    │   ├── ErrorBoundary.tsx
    │   ├── Experience.css
    │   ├── Experience.tsx
    │   ├── Footer.css
    │   ├── Footer.tsx
    │   ├── GamePage.css
    │   ├── GamePage.tsx
    │   ├── Hero.css
    │   ├── Hero.tsx
    │   ├── LoadingSpinner.css
    │   ├── LoadingSpinner.tsx
    │   ├── MobileMenu.css
    │   ├── MobileMenu.tsx
    │   ├── Navigation.css
    │   ├── Navigation.tsx
    │   ├── PdfGenerator.tsx
    │   ├── Projects.css
    │   ├── Projects.tsx
    │   └── falling-planet/
    │       ├── constants.ts
    │       ├── FallingPlanet.css
    │       ├── FallingPlanet.tsx
    │       ├── GameArea.tsx
    │       ├── GameControls.tsx
    │       ├── GameInstructions.tsx
    │       ├── types.ts
    │       └── useGameLogic.ts
    ├── context/
    │   ├── PortfolioContext.tsx
    │   ├── PortfolioContextTypes.ts
    │   ├── ResponsiveContext.tsx
    │   └── ResponsiveContextTypes.ts
    ├── data/
    │   └── portfolioData.ts
    ├── hooks/
    │   ├── useActiveDetection.ts
    │   ├── useActiveSection.ts
    │   ├── useCvGenerator.ts
    │   ├── useImageLoader.ts
    │   ├── useImageLoading.ts
    │   ├── useMobileOptimizedScroll.ts
    │   ├── useNavigationScroll.ts
    │   ├── useNavItems.ts
    │   ├── usePdfGenerator.ts
    │   ├── usePortfolio.ts
    │   ├── useResponsive.ts
    │   ├── useScrollAnimation.ts
    │   └── useScrollNavigation.ts
    ├── styles/
    │   └── zIndex.css
    ├── types/
    │   └── index.ts
    └── utils/
        ├── dateUtils.ts
        ├── featureFlags.ts
        ├── generateId.ts
        ├── headerOffset.ts
        ├── imageConverter.ts
        ├── index.ts
        ├── pdfDocumentBuilder.ts
        └── zIndex.ts
```

## Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run lint` - Lint code

## Git Optimizations

- .gitattributes for line endings
- .gitignore for exclusions
- VS Code workspace config

