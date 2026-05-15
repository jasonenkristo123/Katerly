import { NextRequest, NextResponse } from "next/server";


export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const protectedRoutes = ['/dashboard', '/settings', '/bahan-baku', '/tambah-resep', 'daftar-belanja', 'buat-nota', 'history'];
    const publicRoutes = ['/login', '/register'];

    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))

    const isPublicRoute = publicRoutes.some((route) => path.startsWith(route));

    const cookie = request.cookies.get('refresh_token')?.value;

    if (isProtectedRoute && !cookie) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    if (isPublicRoute && cookie) {
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ]
}