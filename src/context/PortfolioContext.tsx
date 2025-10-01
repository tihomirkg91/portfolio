import type { ReactNode } from 'react';
import { memo, useMemo } from 'react';
import type { ContactInfo, Experience, PersonalInfo, Project } from '../types';
import { generateShortId } from '../utils/generateId';
import type { PortfolioContextType } from './PortfolioContextTypes';
import { PortfolioContext } from './PortfolioContextTypes';

const personalInfo: PersonalInfo = {
  firstName: 'Tihomir',
  lastName: 'Tomovic',
  fullName: 'Tihomir Tomovic',
  title: 'Frontend Software Engineer',
  bio: 'Frontend Software Engineer focused on scalable architectures, reusable components, and modernizing legacy UIs with automation and AI tooling.',
  avatar: '/placeholder-avatar.jpg',
  avatarAlt: 'Tihomir - Frontend Software Engineer',
  tagline: 'Building digital experiences that matter',
  yearsOfExperience: 4,
  currentTechStack: [
    'React',
    'TypeScript',
    'Redux',
    'Next.js',
    'Vite',
    'Webpack',
    'npm',
    'Strapi',
    'NX Monorepos',
    'Prisma',
    'Node.js',
    'Express',
    'Azure AI Form Recognizer',
    'Microsoft Power Automate',
    'Azure',
    'App Insights',
    'Kusto Query Language',
    'Playwright',
    'Jest',
    'Vitest',
    'Fluent UI',
    'MUI',
    'Bootstrap',
    'Tailwind CSS',
  ],
  aboutMe:
    'I build scalable, component‑driven frontend architectures with React, TypeScript, and Next.js—modernizing legacy interfaces, improving delivery speed, and raising code quality. I led large refactors (including converting 30k+ lines of class components to hooks), created internal npm packages and reusable UI libraries, and automated critical flows with Playwright and custom tooling. Performance is a core focus: I reduce bundle sizes with route‑level code splitting and dynamic imports, aggressively eliminate render waterfalls via memoization and state isolation, leverage React Profiler to target slow renders, implement image optimization + responsive loading, and tune Lighthouse / Core Web Vitals (CLS, LCP, TTI) through lazy hydration and preloading strategies. I emphasize accessibility, DX, and sustainable patterns (composition, design tokens, controlled vs uncontrolled tradeoffs). I also integrate practical AI + automation (Azure AI Form Recognizer, Power Automate) to remove manual workflows and present emerging React capabilities to engineering teams.',
};

const projects: Project[] = [
  {
    id: generateShortId('project'),
    title: 'Falling Planet Rhythm Game',
    description:
      'An interactive rhythm game component built with React and TypeScript, featuring falling notes, scoring system, and fullscreen support.',
    technologies: [
      'React',
      'TypeScript',
      'HTML5 Audio API',
      'Responsive Design',
    ],
    links: [
      {
        url: '/falling-planet-rhythm',
        label: 'Play Game',
        type: 'demo',
      },
    ],
    imageUrl: '/game.webp',
    imageAlt: 'Falling Planet Rhythm Game Screenshot',
    featured: true,
    status: 'completed',
    dateCreated: '2024-09-06',
    tags: ['Game', 'Interactive', 'React Component', 'TypeScript'],
  },
];

const experience: Experience[] = [
  {
    id: generateShortId('experience'),
    company: 'Greco Tech Hub',
    position: 'Frontend Software Engineer',
    startDate: '2022-04',
    duration: '3.5 years',
    type: 'full-time',
    description: [
      'Implemented responsive designs and ensured cross-browser compatibility',
      'Participated in agile development processes and sprint planning',
      'Optimized web performance and accessibility for large-scale projects',
      'Led efforts to keep all projects updated with the latest React versions and best practices, starting from React 16',
      'Created and maintained npm packages for internal usage to streamline development and ensure code reusability',
      'Developed scalable applications using React, TypeScript, Vite, and Webpack for fast builds and maintainable codebases.',
      'Developed frontend-focused scripts and automation tools with Node.js and Express, enhancing build processes, asset management, and integration workflows.',
      'Automated document processing and workflow solutions with Azure AI Form Recognizer and Microsoft Power Automate.',
      'Enhanced monitoring and analytics using Azure App Insights and Kusto Query Language for data-driven decision making.',
      'Ensured high-quality releases with Playwright for end-to-end testing and Fluent UI for consistent, accessible interfaces.',
      'Implemented secure authentication flows with Msal, supporting enterprise-grade security requirements.',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'Webpack',
      'npm',
      'Node.js',
      'Express',
      'Azure AI Form Recognizer',
      'Microsoft Power Automate',
      'Azure',
      'App Insights',
      'Kusto Query Language',
      'Playwright',
      'Fluent UI',
      'Msal authentication',
    ],
    location: 'Belgrade, Serbia',
    companyUrl: 'https://rs.linkedin.com/showcase/greco-tech-hub/',
  },
  {
    id: generateShortId('experience'),
    company: 'Private Projects',
    position: 'Frontend Software Engineer',
    startDate: '2023-02',
    endDate: '2024-09',
    duration: '',
    type: 'freelance',
    description: [
      'Built and deployed modern web applications using Next.js and TypeScript, leveraging server-side rendering and static site generation for improved SEO and performance.',
      'Integrated Strapi as a headless CMS for dynamic content management and flexible API connectivity.',
      'Architected NX Monorepos for efficient code sharing and streamlined development across projects.',
      'Implemented Zustand for lightweight, scalable state management with minimal boilerplate and excellent TypeScript support.',
      'Implemented Prisma ORM for robust data modeling and optimized database interactions.',
      'Styled responsive UIs with Tailwind CSS, ensuring mobile-first design and accessibility.',
      'Implemented comprehensive testing strategies using Jest for unit testing and Vitest for modern, fast testing with native ES modules support.',
      'Integrated Stripe for secure payment processing and e-commerce functionality.',
      'Utilized TensorFlow.js for client-side machine learning tasks, enabling AI-powered features in web applications.',
    ],
    technologies: [
      'Next.js',
      'Strapi',
      'Zustand',
      'NX Monorepos',
      'Prisma',
      'Jest',
      'Vitest',
      'Tailwind CSS',
      'Stripe',
      'TensorFlow.js',
    ],
    location: 'Remote - Part time',
    companyUrl: '',
  },
  {
    id: generateShortId('experience'),
    company: 'Freelance Clients',
    position: 'Frontend Developer',
    startDate: '2021-01',
    endDate: '2022-03',
    duration: '1+ years',
    type: 'freelance',
    description: [
      'Developed responsive web applications for various clients using React, Redux, and Context for state management.',
      'Implemented custom designs and user interfaces with Fluent UI, MUI, and Bootstrap, ensuring consistency and accessibility.',
      'Configured and optimized build processes with Webpack and npm for efficient development workflows.',
    ],
    technologies: [
      'React',
      'Context',
      'Redux',
      'Webpack',
      'npm',
      'MUI',
      'Bootstrap',
      'CSS',
      'ES6',
    ],
    location: 'Remote',
    companyUrl: '',
  },
];

const contactInfo: ContactInfo = {
  email: 'tomovicfd@gmail.com',
  phone: '+381 64 4553038',
  location: 'Belgrade, Serbia',
  socialLinks: [
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/tomovicfd?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      icon: 'linkedin',
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/tihomirkg91/portfolio',
      icon: 'github',
    },
    {
      platform: 'Portfolio',
      url: 'https://portfolio-alpha-pearl-24.vercel.app',
      icon: 'website',
    },
  ],
  linkedin:
    'https://www.linkedin.com/in/tomovicfd?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
  github: 'https://github.com/tihomirkg91/portfolio',
  portfolio: 'https://portfolio-alpha-pearl-24.vercel.app',
};

interface PortfolioProviderProps {
  readonly children: ReactNode;
}

export const PortfolioProvider = memo(
  ({ children }: PortfolioProviderProps) => {
    const value: PortfolioContextType = useMemo(
      () => ({
        projects,
        experience,
        contactInfo,
        personalInfo,
      }),
      []
    );

    return <PortfolioContext value={value}>{children}</PortfolioContext>;
  }
);

PortfolioProvider.displayName = 'PortfolioProvider';
