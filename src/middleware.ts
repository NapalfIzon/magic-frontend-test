import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname === "/Homepage") {
    return NextResponse.redirect(new URL("/", request.url));
  }
};

export const config = {
  matcher: "/Homepage",
};
