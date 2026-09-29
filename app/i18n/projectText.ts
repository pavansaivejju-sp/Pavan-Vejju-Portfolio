import { projectTranslations, type Locale } from './translations';

const germanMonths: Record<string, string> = {
  January: 'Januar', Jan: 'Jan',
  February: 'Februar', Feb: 'Feb',
  March: 'März', Mar: 'Mär',
  April: 'April', Apr: 'Apr',
  May: 'Mai',
  June: 'Juni', Jun: 'Jun',
  July: 'Juli', Jul: 'Jul',
  August: 'August', Aug: 'Aug',
  September: 'September', Sep: 'Sep',
  October: 'Oktober', Oct: 'Okt',
  November: 'November', Nov: 'Nov',
  December: 'Dezember', Dec: 'Dez',
};

export function getProjectText<T extends { slug: string; duration?: string; teamSize?: string }>(project: T, locale: Locale) {
  if (locale === 'en') return project;

  const translated = projectTranslations[project.slug as keyof typeof projectTranslations];
  const duration = project.duration
    ?.replace(/\b(January|Jan|February|Feb|March|Mar|April|Apr|May|June|Jun|July|Jul|August|Aug|September|Sep|October|Oct|November|Nov|December|Dec)\b/g, (month) => germanMonths[month])
    .replace(/\bPresent\b/g, 'heute');

  return {
    ...project,
    ...translated,
    ...(duration ? { duration } : {}),
    ...(translated?.teamSize ? { teamSize: translated.teamSize } : {}),
  };
}