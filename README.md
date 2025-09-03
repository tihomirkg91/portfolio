# Frontend Developer Portfolio

A modern, responsive portfolio website built with React 19, TypeScript, and Vite. Features a clean architecture with Context API for state management, comprehensive TypeScript interfaces, and advanced React patterns.

## ✨ Features

- **Modern Tech Stack**: React 19, TypeScript 5.8, Vite 7
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox
- **Context-Based Architecture**: React Context for data management (no prop drilling)
- **Advanced React Patterns**: Custom hooks, error boundaries, responsive contexts
- **Professional Sections**:
  - Dynamic hero section with smooth animations
  - Interactive about section with skills showcase
  - Featured projects with live demos and GitHub links
  - Work experience timeline with detailed descriptions
  - Contact form with validation and PDF generation
  - Mobile-optimized navigation with active section detection
- **Clean Code**: Separate CSS files, TypeScript interfaces, modular architecture
- **Performance Optimized**:
  - Lazy loading and image optimization
  - Memoized context values and callbacks
  - Efficient scroll handling and animation
  - Mobile-optimized interactions
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Developer Experience**: ESLint 9, comprehensive tooling, VS Code workspace configuration

## 🚀 Tech Stack & Performance Optimization

- **Frontend**: React 19, TypeScript 5.8
- **Build Tool**: Vite 7
- **Styling**: CSS3 with custom properties
- **State Management**: React Context API
- **Linting**: ESLint 9 with React hooks plugin

### Vite Manual Chunks Implementation

To optimize bundle size and improve performance, this portfolio uses Vite's manual chunks feature. This allows splitting large dependencies into separate chunks, enabling better caching and faster initial load times.

- **pdfMake Optimization**: The `pdfMake` library, used for PDF generation, is loaded as a separate chunk using Vite's manualChunks configuration. This ensures that heavy libraries like `pdfMake` do not bloat the main bundle and are only loaded when needed (e.g., when generating a PDF from the contact form).This approach keeps the main bundle lightweight and ensures optimal loading for users, especially on mobile devices.

## 📁 Project Structure

```
src/
├── components/          # React components with CSS
│   ├── Navigation.tsx   # Navigation header with mobile menu
│   ├── Hero.tsx        # Landing section with animations
│   ├── About.tsx       # About section with skills
│   ├── Projects.tsx    # Featured projects showcase
│   ├── Experience.tsx  # Work experience timeline
│   ├── Contact.tsx     # Contact form with validation
│   ├── Footer.tsx      # Site footer
│   ├── ErrorBoundary.tsx # Error boundary wrapper
│   ├── LoadingSpinner.tsx # Loading component
│   ├── PdfGenerator.tsx # PDF generation utilities
│   └── *.css          # Component-specific styles
├── context/            # React Context providers
│   ├── PortfolioContext.tsx # Main portfolio data context
│   ├── PortfolioContextTypes.ts # Portfolio context types
│   ├── ResponsiveContext.tsx # Responsive breakpoint context
│   └── ResponsiveContextTypes.ts # Responsive context types
├── hooks/              # Custom React hooks
│   ├── usePortfolio.ts # Portfolio data consumption
│   ├── useResponsive.ts # Responsive breakpoint detection
│   ├── useActiveSection.ts # Active section detection
│   ├── useScrollAnimation.ts # Scroll-based animations
│   ├── useNavigationScroll.ts # Navigation scroll handling
│   ├── usePdfGenerator.ts # PDF generation logic
│   └── useImageLoader.ts # Image loading optimization
├── data/               # Static data and content
│   └── portfolioData.ts # Portfolio content and configuration
├── types/              # TypeScript definitions
│   └── index.ts        # Shared type interfaces
├── utils/              # Utility functions
│   ├── dateUtils.ts    # Date formatting utilities
│   ├── generateId.ts   # ID generation helpers
│   ├── imageConverter.ts # Image processing utilities
│   ├── pdfDocumentBuilder.ts # PDF document creation
│   ├── headerOffset.ts # Header offset calculations
│   ├── featureFlags.ts # Feature flag management
│   └── zIndex.ts       # Z-index management
├── styles/             # Global styles
│   └── zIndex.css      # Z-index layer definitions
├── App.tsx            # Main app component
├── App.css            # Global app styles
├── index.css          # Base styles and CSS variables
└── main.tsx           # Application entry point
```

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone "https://github.com/tihomirkg91/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🔧 Development Workflow

### VS Code Workspace

This project includes a VS Code workspace configuration (`portfolio.code-workspace`) with:

- Recommended extensions for React/TypeScript development
- Optimized settings for auto-formatting and import organization
- File nesting patterns for better project organization
- ESLint and Prettier integration

**To use:**

```bash
code portfolio.code-workspace
```

### Git Configuration

The repository is optimized for Git with:

- **`.gitignore`**: Comprehensive ignore patterns for Node.js, TypeScript, and VS Code
- **`.gitattributes`**: Line ending normalization and binary file handling
- **File organization**: Clean separation of source code and build artifacts

### Available Scripts

The following scripts are available via `npm run <script>`:

- `dev` — Start the Vite development server with hot reload
- `build` — Type-check and build the app for production (output in `dist/`)
- `preview` — Locally preview the production build
- `lint` — Run ESLint for code quality and formatting
- `check-circular` — Check for circular dependencies in the `src/` folder (requires Madge)
- `reset` — Remove `node_modules`, clean npm cache, and reinstall dependencies

## 🔧 Git Optimization Features

This repository includes several Git optimizations:

- **Line ending normalization**: `.gitattributes` ensures consistent line endings across platforms
- **Binary file handling**: Proper handling of images, fonts, and other binary assets
- **Comprehensive .gitignore**: Excludes build artifacts, dependencies, and OS-specific files
- **VS Code integration**: Workspace settings for consistent development experience
