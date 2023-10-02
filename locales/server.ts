import { createI18nServer } from 'next-international/server';

export const { getI18n, getScopedI18n, getStaticParams, getCurrentLocale } =
  createI18nServer({
    'es-CL': () => import('./es_CL'),
    'en-US': () => import('./en_US'),
  });
