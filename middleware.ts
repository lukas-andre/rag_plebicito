import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { createI18nMiddleware } from 'next-international/middleware';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';



const I18nMiddleware = createI18nMiddleware({
  locales: ['en-US', 'es-CL'],
  defaultLocale: 'es-CL',
  urlMappingStrategy: 'redirect',
});

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();


  const i18nResult = I18nMiddleware(req);

  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  return i18nResult;
}

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next|favicon.ico|robots.txt).*)'],
};
