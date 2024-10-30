import { verifySession } from "app/auth/session";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(req: NextRequest, next) {
  console.log("middleware ...");

  if (!(await authenticate(req))) {
    return NextResponse.redirect(new URL("/login", req.nextUrl), 307);
  }

  return NextResponse.next();
}

export const authenticate = async (req: NextRequest) => {
  const sessionDetails = await verifySession();

  if (sessionDetails?.userId) {
    console.log("User is authenticated");
    return true;
  }

  console.log("User is NOT authenticated");
  return false;
};

export const config = {
  matcher: "/dashboard/:path*",
};
