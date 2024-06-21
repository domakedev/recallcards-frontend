import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export const middleware = (request: NextRequest) => {
  const cookieToken = cookies().get("token");
  return NextResponse.next();
};

// See "Matching Paths" below to learn more
export const config = {
  //match only in /[cards]/[card]
  matcher: ["/:path*"],
};
