// import {
//   DASHBOARD_ROUTE,
//   LANDING_PAGE_ROUTE,
//   LOGIN_ROUTE,
//   SIGNUP_ROUTE,
// } from "@/constants/route";
// import * as jose from "jose";
// import { NextRequest, NextResponse } from "next/server";

// const publicPath = [LOGIN_ROUTE, SIGNUP_ROUTE, LANDING_PAGE_ROUTE];

// const jwtConfig = {
//   secret: new TextEncoder().encode(process.env.JWT_SECRET),
// };

// export async function middleware(request: NextRequest) {
//   const loginUrl = new URL(LOGIN_ROUTE, request.nextUrl.origin);

//   const { cookies } = request;
//   let jwt = cookies.get("x-token")?.value;

//   console.log(jwt);

//   if (jwt === undefined || jwt === "undefined") {
//     if (publicPath.some((path) => request.nextUrl.pathname.includes(path))) {
//       return NextResponse.next();
//     }

//     return NextResponse.redirect(loginUrl);
//   }
//   try {
//     if (jwt.startsWith("Bearer")) {
//       jwt = jwt.replace("Bearer ", "");
//     }
//     const decoded = await jose.jwtVerify(jwt, jwtConfig.secret);
//     if (decoded.payload) {
//       if (publicPath.some((path) => request.nextUrl.pathname.includes(path))) {
//         return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
//       }
//       return NextResponse.next();
//     } else {
//       return NextResponse.redirect(loginUrl);
//     }
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (_) {
//     return NextResponse.redirect(loginUrl);
//   }
// }

// export const config = {
//   matcher: [
//     "/((?!api|_next/static|_next/image|favicon.ico|icon.png|images/*).*)",
//   ],
// };
