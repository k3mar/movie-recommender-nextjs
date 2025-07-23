import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/serverClient";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const method = request.method;
  const timestamp = new Date().toISOString();

  console.log(`[MIDDLEWARE] ${timestamp} — ${method} ${path} — Checking auth`);

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.warn(
      `[MIDDLEWARE] ${timestamp} — Error fetching user: ${error.message}`
    );
  }

  if (!user) {
    const redirectUrl = new URL("/signin", request.url);
    redirectUrl.searchParams.set("redirectedFrom", path);

    console.log(
      `[MIDDLEWARE] ${timestamp} — No user. Redirecting to /signin from ${path}`
    );
    return NextResponse.redirect(redirectUrl);
  }

  console.log(
    `[MIDDLEWARE] ${timestamp} — Authenticated user: ${user.email || user.id}`
  );
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - /api routes
     * - /_next/static (build files)
     * - /_next/image (image optimization)
     * - /favicon.ico and other static files
     */
    "/",
    "/about",
  ],
};
