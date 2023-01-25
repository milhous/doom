import {NextResponse, NextRequest} from 'next/server';
import {cookieLngName, getLng} from '@app/libs/i18n/settings';
import {getQueryParam, removeQueryParam} from '@app/libs/utils';

// 匹配路径
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
};

export function middleware(req: NextRequest): NextResponse {
  const {origin, pathname, search} = req.nextUrl;

  if (search.includes(`${cookieLngName}=`)) {
    let url = origin + pathname;
    const searchs = removeQueryParam(cookieLngName, search);

    if (searchs !== '') {
      url += '?' + searchs;
    }

    return NextResponse.redirect(url);
  }

  if (!req.cookies.has(cookieLngName)) {
    const acceptLng = req.headers.get('Accept-Language');
    const lng = getLng('', acceptLng);
    const response = NextResponse.next();

    response.cookies.set(cookieLngName, lng);

    return response;
  }

  return NextResponse.next();
}
