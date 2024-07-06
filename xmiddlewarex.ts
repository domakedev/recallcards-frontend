// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { cookies } from "next/headers";

// // This function can be marked `async` if using `await` inside
// export const middleware = (request: NextRequest) => {
//   let cookieSAAAAAAA = request.cookies.get('authjs.session-token')
//   // console.log("🚀 ~ middleware ~ cookieSAAAAAAA:", cookieSAAAAAAA)
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const cookieToken = cookies().get("authjs.session-token");
//   // console.log("🚀 ~ middleware ~ cookieToken:", cookieToken)
//   if (!cookieToken) {
//     // console.log("🚀 ~ middleware ~ cookieToken:", "HOLIOSIS")
//   }
//   //route condition === /create-deck
//   if ( request.nextUrl.pathname.startsWith('/create-deck')) {
//     if (!cookieSAAAAAAA) {
//       //got to dashboard
//       const url = request.nextUrl.clone()
//       url.pathname = '/auth/login'
//       return NextResponse.redirect(url)
//     }
//   }
//   if ( request.nextUrl.pathname.startsWith('/create-card')) {
//     if (!cookieToken) {
//       //got to dashboard
//       const url = request.nextUrl.clone()
//       url.pathname = '/auth/login'
//       return NextResponse.redirect(url)
//     }
    
//   }
//   return NextResponse.next();
// };

// // See "Matching Paths" below to learn more
// export const config = {
//   //match only in /[cards]/[card]
//   matcher: ["/create-deck", "/create-card", "/:path*"],
// };
