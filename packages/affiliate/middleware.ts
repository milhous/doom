import { NextResponse, NextRequest } from 'next/server';
import acceptLanguage from 'accept-language';
import { cookieLngName, supportedLngs, getLng } from '@app/libs/i18n/settings';

acceptLanguage.languages(supportedLngs);

// 匹配路径
export const config = {
    matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)'
}

export function middleware(req: NextRequest): NextResponse {
  if (!req.cookies.has(cookieLngName)) {
    const acceptLng = req.headers.get('Accept-Language');
    const lng = getLng('', acceptLng);
    const response = NextResponse.next();

    response.cookies.set(cookieLngName, lng);

    return response;
  }

  return NextResponse.next();
}