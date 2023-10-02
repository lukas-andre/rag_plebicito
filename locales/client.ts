'use client';

import { createI18nClient } from 'next-international/client';

export const {
  useI18n,
  useScopedI18n,
  I18nProviderClient,
  useChangeLocale,
  useCurrentLocale,
} = createI18nClient({
  'es-CL': () => import('./es_CL'),
  'en-US': () => import('./en_US'),
});
