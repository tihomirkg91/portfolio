export type ID = string | number;

export type URL = string;

// Feature Flags
export interface FeatureFlags {
  featuredProjectsEnabled: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  number: string;
  icon?: React.ComponentType | string;
}

export interface ProjectLink {
  url: URL;
  label: string;
  type: "github" | "live" | "demo" | "docs";
}

export interface Project {
  readonly id: ID;
  title: string;
  description: string;
  longDescription?: string;
  technologies: readonly string[];
  links: readonly ProjectLink[];
  imageUrl: string;
  imageAlt?: string;
  featured?: boolean;
  status: "completed" | "in-progress" | "archived";
  dateCreated: string;
  tags?: readonly string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface ExperienceAchievement {
  description: string;
  impact?: string;
}

export interface Experience {
  readonly id: ID;
  company: string;
  position: string;
  location?: string;
  startDate: string;
  endDate?: string;
  duration: string;
  description: string | string[];
  achievements?: readonly ExperienceAchievement[];
  technologies: readonly string[];
  companyUrl?: URL;
  companyLogo?: string;
  type: "full-time" | "part-time" | "contract" | "freelance" | "internship";
}

export interface SocialLink {
  platform: string;
  url: URL;
  username?: string;
  icon?: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  timezone?: string;
  socialLinks: readonly SocialLink[];
  linkedin?: string;
  github?: string;
  portfolio?: string;
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  fullName: string;
  title: string;
  bio: string;
  avatar: string;
  avatarAlt?: string;
  tagline?: string;
  yearsOfExperience: number;
  currentTechStack?: readonly string[];
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: readonly Project[];
  experience: readonly Experience[];
  contactInfo: ContactInfo;
}

export type ProjectStatus = Project["status"];
export type ExperienceType = Experience["type"];

export { Z_INDEX, type ZIndexValue } from "../utils/zIndex";
