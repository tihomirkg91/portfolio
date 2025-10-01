export type ID = string | number;

export type URL = string;

export interface FeatureFlags {
  readonly featuredProjectsEnabled: boolean;
}

export interface NavItem {
  readonly id: string;
  readonly label: string;
  readonly number: string;
  readonly icon?: React.ComponentType | string;
}

export interface ProjectLink {
  readonly url: string;
  readonly label: string;
  readonly type: 'github' | 'live' | 'demo' | 'docs';
}

export interface Project {
  readonly id: ID;
  readonly title: string;
  readonly description: string;
  readonly longDescription?: string;
  readonly technologies: readonly string[];
  readonly links: readonly ProjectLink[];
  readonly imageUrl: string;
  readonly imageAlt?: string;
  readonly featured?: boolean;
  readonly status: 'completed' | 'in-progress' | 'archived';
  readonly dateCreated: string;
  readonly tags?: readonly string[];
  readonly githubUrl?: string;
  readonly liveUrl?: string;
}

export interface ExperienceAchievement {
  readonly description: string;
  readonly impact?: string;
}

export interface Experience {
  readonly id: ID;
  readonly company: string;
  readonly position: string;
  readonly location?: string;
  readonly startDate: string;
  readonly endDate?: string;
  readonly duration: string;
  readonly description: string | string[];
  readonly achievements?: readonly ExperienceAchievement[];
  readonly technologies: readonly string[];
  readonly companyUrl?: string;
  readonly companyLogo?: string;
  readonly type:
    | 'full-time'
    | 'part-time'
    | 'contract'
    | 'freelance'
    | 'internship';
}

export interface SocialLink {
  readonly platform: string;
  readonly url: string;
  readonly username?: string;
  readonly icon?: string;
}

export interface ContactInfo {
  readonly email: string;
  readonly phone?: string;
  readonly location?: string;
  readonly socialLinks: readonly SocialLink[];
  readonly linkedin?: string;
  readonly github?: string;
  readonly portfolio?: string;
}

export interface PersonalInfo {
  readonly firstName: string;
  readonly lastName: string;
  readonly fullName: string;
  readonly title: string;
  readonly bio: string;
  readonly avatar: string;
  readonly avatarAlt?: string;
  readonly tagline?: string;
  readonly yearsOfExperience: number;
  readonly currentTechStack?: readonly string[];
  readonly aboutMe?: string;
}

export interface PortfolioData {
  readonly personalInfo: PersonalInfo;
  readonly projects: readonly Project[];
  readonly experience: readonly Experience[];
  readonly contactInfo: ContactInfo;
}

export type ProjectStatus = Project['status'];
export type ExperienceType = Experience['type'];

export { Z_INDEX, type ZIndexValue } from '../utils/zIndex';
