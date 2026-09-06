/**
 * Utility to calculate dynamic work experience from the start date (April 26, 2021).
 * Calculates the exact duration and rounds to the nearest half-year (0.5).
 * e.g., 5.36 years -> 5.5+ Years
 */
export function calculateExperience(startDateStr = '2021-04-26') {
  const startDate = new Date(startDateStr);
  const now = new Date();
  
  const diffTime = Math.abs(now.getTime() - startDate.getTime());
  const diffYears = diffTime / (1000 * 60 * 60 * 24 * 365.25);
  
  // Round to nearest 0.5 (half year)
  const rounded = Math.round(diffYears * 2) / 2;
  const displayYears = rounded % 1 === 0 ? `${rounded}.0` : `${rounded}`;

  return {
    rawYears: diffYears,
    yearsNumber: rounded,
    displayYears,
    formatted: `${displayYears}+ Years`, // e.g. "5.5+ Years"
    shortFormatted: `${displayYears}+ Yrs`,
  };
}
