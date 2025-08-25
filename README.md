# Stripe Comic Reader

A modern comic strip reader application built with React, TypeScript, Vite, and React Query. Inspired by classic Italian comics like Zagor, this app allows users to browse and read different comic strips with an intuitive interface.

## Features

- 📚 Browse comic collection
- 📖 Read comic strips with navigation
- 🔍 Comic information and metadata
- 📱 Responsive design for all devices
- ⚡ Fast loading with Vite
- 🔄 Efficient data fetching with React Query
- 🎨 Modern UI with smooth animations

## Tech Stack

- **React 19** - Latest React with enhanced performance and features
- **TypeScript 5.9** - Latest TypeScript with improved type inference
- **Vite 7** - Ultra-fast build tool and dev server
- **React Query 5.6** - Powerful data fetching and caching
- **React Router 7** - Client-side routing with latest features
- **CSS3** - Modern styling with flexbox and grid
- **ESLint 9** - Latest linting with improved rules

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd stripe-comic-reader
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Header.tsx      # Navigation header
├── pages/              # Page components
│   ├── HomePage.tsx    # Landing page
│   ├── ComicListPage.tsx  # Comic collection
│   └── ComicReaderPage.tsx # Strip reader
├── types/              # TypeScript type definitions
│   └── index.ts        # Comic and strip interfaces
├── hooks/              # Custom React hooks
├── App.tsx             # Main app component
├── App.css             # Global styles
├── main.tsx            # App entry point
└── index.css           # Base styles
```

## Features Overview

### Home Page

- Welcome section with featured comics
- Quick access to comic collection
- Responsive card layout

### Comic Collection

- Grid layout of available comics
- Comic metadata (author, genre, strip count)
- Search and filtering capabilities (coming soon)

### Comic Reader

- Full-screen strip viewing
- Navigation between strips
- Thumbnail strip selector
- Progress tracking

## Mock Data

Currently uses mock data for demonstration. In a production environment, you would:

1. Replace mock API functions with real API calls
2. Set up a backend server with comic data
3. Implement user authentication and preferences
4. Add search and filtering capabilities

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by classic Italian comics (Zagor, Dylan Dog, Tex)
- Built with modern web technologies
- Designed for comic enthusiasts
