export const Z_INDEX = {
  BACKGROUND: -1,
  BACKGROUND_DECORATION: -1,

  BASE: 0,

  DECORATION: 1,
  ELEMENT_BASE: 1,
  CONTENT_OVERLAY: 2,
  ELEMENT_SECONDARY: 2,
  ELEMENT_TERTIARY: 3,
  GAME_CONTROLS: 10,

  DROPDOWN: 100,
  TOOLTIP: 200,
  POPOVER: 300,

  MAIN_CONTENT: 400,
  HERO_SECTION: 410,
  ABOUT_SECTION: 420,
  PROJECTS_SECTION: 430,
  EXPERIENCE_SECTION: 440,
  CONTACT_SECTION: 450,
  FOOTER_SECTION: 460,

  STICKY_NAV: 500,
  FIXED_NAVIGATION: 1000,
  FIXED_HEADER: 1000,
  MOBILE_MENU: 1100,
  MOBILE_MENU_TOGGLE: 1200,
  GAME_OVERLAY: 1001,

  OVERLAY: 2000,
  MODAL: 2100,
  TOAST: 2200,

  LOADING: 3000,
  ERROR_BOUNDARY: 3100,

  COMING_SOON_MODAL: 9999,
  GAME_FULLSCREEN: 9999,
  GAME_MODAL: 10001,
  DEBUG: 9999,
} as const;

export type ZIndexValue = (typeof Z_INDEX)[keyof typeof Z_INDEX];

const Z_INDEX_VAR_MAP = {
  BACKGROUND: '--z-background',
  BACKGROUND_DECORATION: '--z-background-decoration',
  BASE: '--z-base',
  DECORATION: '--z-decoration',
  ELEMENT_BASE: '--z-element-base',
  CONTENT_OVERLAY: '--z-content-overlay',
  ELEMENT_SECONDARY: '--z-element-secondary',
  ELEMENT_TERTIARY: '--z-element-tertiary',
  GAME_CONTROLS: '--z-game-controls',
  DROPDOWN: '--z-dropdown',
  TOOLTIP: '--z-tooltip',
  POPOVER: '--z-popover',
  MAIN_CONTENT: '--z-main-content',
  HERO_SECTION: '--z-hero-section',
  ABOUT_SECTION: '--z-about-section',
  PROJECTS_SECTION: '--z-projects-section',
  EXPERIENCE_SECTION: '--z-experience-section',
  CONTACT_SECTION: '--z-contact-section',
  FOOTER_SECTION: '--z-footer-section',
  STICKY_NAV: '--z-sticky-nav',
  FIXED_NAVIGATION: '--z-fixed-navigation',
  FIXED_HEADER: '--z-fixed-header',
  MOBILE_MENU: '--z-mobile-menu',
  MOBILE_MENU_TOGGLE: '--z-mobile-menu-toggle',
  GAME_OVERLAY: '--z-game-overlay',
  OVERLAY: '--z-overlay',
  MODAL: '--z-modal',
  TOAST: '--z-toast',
  LOADING: '--z-loading',
  ERROR_BOUNDARY: '--z-error-boundary',
  COMING_SOON_MODAL: '--z-coming-soon-modal',
  GAME_FULLSCREEN: '--z-game-fullscreen',
  GAME_MODAL: '--z-game-modal',
  DEBUG: '--z-debug',
} as const satisfies Record<keyof typeof Z_INDEX, string>;

export const getZIndexVar = (layer: keyof typeof Z_INDEX): string => {
  return Z_INDEX_VAR_MAP[layer];
};

export const applyZIndex = (
  element: HTMLElement,
  layer: keyof typeof Z_INDEX
): void => {
  const cssVar = getZIndexVar(layer);
  element.style.zIndex = `var(${cssVar})`;
};

export const useZIndex = (layer: keyof typeof Z_INDEX) => {
  return {
    zIndex: `var(${getZIndexVar(layer)})`,
  };
};
