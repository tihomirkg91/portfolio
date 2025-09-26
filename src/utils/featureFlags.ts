export interface FeatureFlags {
  readonly featuredProjectsEnabled: boolean;
  readonly gameEnabled: boolean;
}

const parseBoolean = (value: string | undefined): boolean => value === 'true';

const getFeatureFlags = (): FeatureFlags => ({
  featuredProjectsEnabled: parseBoolean(
    import.meta.env['VITE_FEATURED_PROJECTS_ENABLED']
  ),
  gameEnabled: parseBoolean(import.meta.env['VITE_GAME_ENABLED'] ?? 'false'),
});

export const useFeatureFlags = (): FeatureFlags => getFeatureFlags();
