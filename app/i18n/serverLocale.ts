import { cookies, headers } from 'next/headers';
import type { Locale } from './translations';

export function resolveLocale(
  savedLocale: string | undefined,
  country: string | null | undefined,
  acceptLanguage: string | undefined,
): Locale {
  if (savedLocale === 'en' || savedLocale === 'de') return savedLocale;

  const normalizedCountry = country?.trim().toUpperCase();
  if (normalizedCountry) return normalizedCountry === 'DE' ? 'de' : 'en';

  const preferredLanguage = acceptLanguage?.split(',')[0]?.split(';')[0]?.trim().toLowerCase();
  return preferredLanguage === 'de' || preferredLanguage?.startsWith('de-') ? 'de' : 'en';
}

export async function getRequestLocale(): Promise<Locale> {
  const [cookieStore, requestHeaders] = await Promise.all([cookies(), headers()]);
  const savedLocale = cookieStore.get('portfolio-locale')?.value;
  const country = [
    requestHeaders.get('x-vercel-ip-country'),
    requestHeaders.get('cf-ipcountry'),
    requestHeaders.get('cloudfront-viewer-country'),
    requestHeaders.get('x-country-code'),
  ].find((value) => Boolean(value?.trim()));

  return resolveLocale(savedLocale, country, requestHeaders.get('accept-language') ?? undefined);
}