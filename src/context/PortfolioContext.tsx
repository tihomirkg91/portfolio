import type { ReactNode } from 'react';
import { memo, useMemo } from 'react';
import {
  contactInfo,
  experience,
  personalInfo,
  projects,
} from '../data/portfolioData';
import type { PortfolioContextType } from './PortfolioContextTypes';
import { PortfolioContext } from './PortfolioContextTypes';

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
