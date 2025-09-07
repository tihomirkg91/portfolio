export interface FeatureFlags {
  featuredProjectsEnabled: boolean;
  /**
   * Controls game functionality behavior:
   * - false: Shows "Coming Soon" modal when clicking "Play Game"
   * - true: Navigates to the actual game page
   */
  gameEnabled: boolean;
}

const parseBoolean = (value: string | undefined): boolean => value === 'true';

export const getFeatureFlags = (): FeatureFlags => ({
  featuredProjectsEnabled: parseBoolean(
    import.meta.env.VITE_FEATURED_PROJECTS_ENABLED
  ),
  gameEnabled: parseBoolean(import.meta.env.VITE_GAME_ENABLED ?? 'false'),
});

export const useFeatureFlags = (): FeatureFlags => getFeatureFlags();

export const isFeatureEnabled = (featureName: keyof FeatureFlags): boolean => {
  const flags = getFeatureFlags();
  return flags[featureName];
};
