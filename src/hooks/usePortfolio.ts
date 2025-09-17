import { useContext } from 'react';
import { PortfolioContext } from '../context/PortfolioContextTypes';
import type { PortfolioContextType } from '../context/PortfolioContextTypes';

export const usePortfolio = (): PortfolioContextType => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
