import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ja", "en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";

function getLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") || "";
  if (acceptLanguage.includes("zh")) return "zh";
  if (acceptLanguage.includes("en")) return "en";
  return "ja";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const matchedLocale =
      locales.find(
        (l) => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
      ) || defaultLocale;
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-locale", matchedLocale);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Redirect to locale-prefixed path
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
