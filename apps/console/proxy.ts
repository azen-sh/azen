import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if(pathname === "/") {
        return NextResponse.redirect(new URL("/dashboard", req.url))
    };

    return NextResponse.next();
};

export const config = {
    matcher: ["/"],
};