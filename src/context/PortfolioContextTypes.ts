import { createContext } from 'react';
import type { Project, Experience, ContactInfo, PersonalInfo } from '../types';

export interface PortfolioContextType {
  projects: Project[];
  experience: Experience[];
  contactInfo: ContactInfo;
  personalInfo: PersonalInfo;
}

export const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined
);
