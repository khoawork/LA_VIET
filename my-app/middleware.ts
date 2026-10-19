import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET ||
    process.env.JWT_SECRET ||
    "la_viet_access_jwt_secret_key_secure_2026_v1_!"
);

const REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET ||
    "la_viet_refresh_jwt_secret_key_secure_2026_v1_!"
);

const ACCESS_TOKEN_COOKIE = "laviet_access_token";
const REFRESH_TOKEN_COOKIE = "laviet_refresh_token";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  let isAuthenticated = false;
  let userRole: string | null = null;

  // 1. Kiểm tra Access Token
  if (accessToken) {
    try {
      const { payload } = await jwtVerify(accessToken, ACCESS_SECRET);
      if (payload && (payload.role === "ADMIN" || payload.role === "MANAGER")) {
        isAuthenticated = true;
        userRole = payload.role as string;
      }
    } catch {
      // Access token hết hạn hoặc không hợp lệ -> Tiếp tục kiểm tra refresh token
    }
  }

  // 2. Nếu Access Token không hợp lệ nhưng có Refresh Token hợp lệ
  if (!isAuthenticated && refreshToken) {
    try {
      const { payload } = await jwtVerify(refreshToken, REFRESH_SECRET);
      if (payload && (payload.role === "ADMIN" || payload.role === "MANAGER")) {
        isAuthenticated = true;
        userRole = payload.role as string;
      }
    } catch {
      // Refresh token cũng không hợp lệ
    }
  }

  // 3. Nếu người dùng đang vào trang Login
  if (pathname === "/admin/login") {
    // Nếu đã đăng nhập thành công trước đó thì chuyển hướng thẳng vào dashboard
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // 4. Bảo vệ toàn bộ khu vực /admin/*
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Chỉ có ADMIN mới có quyền truy cập trang quản trị tài khoản hệ thống
    if (pathname.startsWith("/admin/system/users") && userRole !== "ADMIN") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

