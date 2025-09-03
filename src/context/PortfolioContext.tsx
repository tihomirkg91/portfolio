import { useMemo } from "react";
import type { ReactNode } from "react";
import { PortfolioContext } from "./PortfolioContextTypes";
import type { PortfolioContextType } from "./PortfolioContextTypes";
import { projects, experience, contactInfo, personalInfo } from "../data/portfolioData";

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

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
};
