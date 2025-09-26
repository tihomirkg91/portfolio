export const calculateDuration = (
  startDate: string,
  endDate?: string
): string => {
  const start = new Date(startDate + '-01');
  const end =
    endDate && endDate.trim() ? new Date(endDate + '-01') : new Date();

  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

  if (diffYears >= 1) {
    const years = Math.floor(diffYears);
    const months = Math.round((diffYears - years) * 12);

    if (months === 0) {
      return years === 1 ? '1 year' : `${years} years`;
    } else if (years === 0) {
      return months === 1 ? '1 month' : `${months} months`;
    } else {
      return `${years} year${years > 1 ? 's' : ''} ${months} month${months > 1 ? 's' : ''}`;
    }
  } else {
    const months = Math.max(1, Math.round(diffYears * 12));
    return months === 1 ? '1 month' : `${months} months`;
  }
};

export const calculateTotalExperience = (
  experience: readonly { startDate: string; endDate?: string }[]
): number => {
  if (experience.length === 0) return 0;

  const firstExperience = experience[0];
  if (!firstExperience) return 0;

  const earliestStartDate = experience.reduce((earliest, exp) => {
    const currentStart = new Date(exp.startDate + '-01');
    const earliestStart = new Date(earliest + '-01');
    return currentStart < earliestStart ? exp.startDate : earliest;
  }, firstExperience.startDate);

  const start = new Date(earliestStartDate + '-01');
  const now = new Date();

  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);

  return Math.floor(diffYears);
};
