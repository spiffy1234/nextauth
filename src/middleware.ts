import { cookies } from "next/headers";

export function middleware(request: Request) {
  const path = request.nextUrl.pathname;
  let isPublicPath = path == "/login" || path == "/signup";

  const token = cookies().get("token")?.value;
  // console.log(token, "....");

  if (isPublicPath && token) {
    return Response.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return Response.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/profile"],
};
