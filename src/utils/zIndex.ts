export const Z_INDEX = {
  BACKGROUND: -1,
  BACKGROUND_DECORATION: -1,

  BASE: 0,

  DECORATION: 1,
  CONTENT_OVERLAY: 2,

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

  OVERLAY: 2000,
  MODAL: 2100,
  TOAST: 2200,

  LOADING: 3000,
  ERROR_BOUNDARY: 3100,
  DEBUG: 9999,
} as const;

export type ZIndexValue = (typeof Z_INDEX)[keyof typeof Z_INDEX];

export const getZIndexVar = (layer: keyof typeof Z_INDEX): string => {
  const varMap: Record<keyof typeof Z_INDEX, string> = {
    BACKGROUND: '--z-background',
    BACKGROUND_DECORATION: '--z-background-decoration',
    BASE: '--z-base',
    DECORATION: '--z-decoration',
    CONTENT_OVERLAY: '--z-content-overlay',
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
    OVERLAY: '--z-overlay',
    MODAL: '--z-modal',
    TOAST: '--z-toast',
    LOADING: '--z-loading',
    ERROR_BOUNDARY: '--z-error-boundary',
    DEBUG: '--z-debug',
  };

  return varMap[layer];
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
