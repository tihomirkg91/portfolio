import type { ReactNode } from 'react';
import { useMemo } from 'react';
import {
  contactInfo,
  experience,
  personalInfo,
  projects,
} from '../data/portfolioData';
import type { PortfolioContextType } from './PortfolioContextTypes';
import { PortfolioContext } from './PortfolioContextTypes';

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider = ({ children }: PortfolioProviderProps) => {
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
};
