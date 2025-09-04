export {
  calculateDuration,
  calculateTotalExperience,
  formatDateRange,
  isValidDate,
  getCurrentDateString,
} from './dateUtils';

export { isValidBase64Image } from './imageConverter';

export {
  pdfStyles,
  defaultPdfStyle,
  createHeaderSection,
  createDividerLine,
  createSkillsSection,
  createExperienceSection,
  createFooterSection,
  createProjectsSection,
  createPdfDocumentDefinition,
} from './pdfDocumentBuilder';

export type { FeatureFlags } from './featureFlags';
export { getFeatureFlags } from './featureFlags';

export { generateUniqueId, generateShortId } from './generateId';

export { getHeaderOffset, getScrollOffset } from './headerOffset';

export { Z_INDEX } from './zIndex';
