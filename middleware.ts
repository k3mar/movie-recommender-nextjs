import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "./app/lib/supabase/serverClient";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next();
  console.log("middleware ran");

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectedFrom", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
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
