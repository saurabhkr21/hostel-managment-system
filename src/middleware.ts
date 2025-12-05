import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        if (path.startsWith("/admin") && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        if (path.startsWith("/staff") && token?.role !== "STAFF" && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }

        if (path.startsWith("/student") && token?.role !== "STUDENT" && token?.role !== "ADMIN") {
            return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
    },
    {
        secret: "temporary_debug_secret_123",
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);

export const config = {
    matcher: ["/admin/:path*", "/staff/:path*", "/student/:path*"],
};
