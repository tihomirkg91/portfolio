export interface FeatureFlags {
  featuredProjectsEnabled: boolean;
}

const parseBoolean = (value: string | undefined): boolean => value === "true";

export const getFeatureFlags = (): FeatureFlags => ({
  featuredProjectsEnabled: parseBoolean(import.meta.env.VITE_FEATURED_PROJECTS_ENABLED),
});

export const useFeatureFlags = (): FeatureFlags => getFeatureFlags();

export const isFeatureEnabled = (featureName: keyof FeatureFlags): boolean => {
  const flags = getFeatureFlags();
  return flags[featureName];
};
