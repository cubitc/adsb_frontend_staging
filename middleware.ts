import { NextRequest, NextResponse } from "next/server";
import { cookieName } from "./_frontend/enums/cookie";
import { routes } from "./constants/route";

const publicPath = [routes.auth.login, routes.auth.register];

export async function middleware(request: NextRequest) {
  const loginUrl = new URL(routes.auth.login, request.nextUrl.origin);

  const { cookies } = request;
  let jwt = cookies.get(cookieName.x_token)?.value;

  if (jwt === undefined || jwt === "undefined") {
    if (publicPath.some((path) => request.nextUrl.pathname.includes(path))) {
      return NextResponse.next();
    }

    return NextResponse.redirect(loginUrl);
  }
  try {
    if (jwt.startsWith("Bearer")) {
      jwt = jwt.replace("Bearer ", "");
    }

    if (publicPath.some((path) => request.nextUrl.pathname.includes(path))) {
      return NextResponse.redirect(
        new URL(routes.dashboard.index, request.url)
      );
    }
    return NextResponse.next();
  } catch (_) {
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|icon.png|images/*).*)",
  ],
};
