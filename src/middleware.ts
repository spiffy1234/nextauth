import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request?.nextUrl.pathname!;
  let isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/forgotpassword" ||
    path === "/resetpassword" ||
    path === "/verifyemail" ||
    path === "/" ||
    path === "/[slug]";

  const token = cookies().get("token")?.value;
  // console.log(token, "....");

  if ((path === "/login" || path === "/signup") && token) {
    return Response.redirect(new URL("/", request.nextUrl!));
  }

  if (!isPublicPath && !token) {
    return Response.redirect(new URL("/login", request.nextUrl!));
  }
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile",
    "/forgotpassword",
    "/resetpassword",
    "/verifyemail",
    "/posts",
    "/[slug]",
  ],
};
