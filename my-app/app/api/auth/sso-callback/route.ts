import { NextRequest, NextResponse } from "next/server";
import {
  exchangeCodeWithKeycloak,
  extractKeycloakProfile,
  syncUserFromSSO,
} from "@/shared/auth/keycloak.service";
import {
  getCookieOptions,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
  ACCESS_TOKEN_MAX_AGE,
  REFRESH_TOKEN_MAX_AGE,
} from "@/shared/auth/auth.service";
import { sendSuccess, sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => null);
    const code = body?.code;
    const redirectUri = body?.redirectUri || body?.redirect_uri;
    const codeVerifier = body?.codeVerifier || body?.code_verifier;

    if (!code || !redirectUri) {
      return sendError(
        "Thiếu authorization code hoặc redirect URI.",
        HttpStatus.BAD_REQUEST
      );
    }

    // 1. Trao đổi lấy Token từ Keycloak
    const { accessToken: kcAccessToken, idToken: kcIdToken } =
      await exchangeCodeWithKeycloak(code, redirectUri, codeVerifier);

    // 2. Trích xuất thông tin người dùng
    const profile = extractKeycloakProfile(kcIdToken, kcAccessToken);

    // 3. Đồng bộ tài khoản vào cơ sở dữ liệu Là Việt và ký Token nội bộ
    const { user, accessToken, refreshToken } = await syncUserFromSSO(profile);

    // 4. Trả về kết quả và thiết lập HttpOnly Cookies
    const response = NextResponse.json(
      {
        success: true,
        message: `Chào mừng ${user.fullname} đã đăng nhập thành công qua SSO!`,
        data: {
          user: {
            id: user.id,
            email: user.email,
            fullname: user.fullname,
            role: user.role,
            avatar: user.avatar,
          },
        },
      },
      { status: HttpStatus.OK }
    );

    // Thiết lập cookies an toàn
    response.cookies.set(
      ACCESS_TOKEN_COOKIE,
      accessToken,
      getCookieOptions(ACCESS_TOKEN_MAX_AGE)
    );
    response.cookies.set(
      REFRESH_TOKEN_COOKIE,
      refreshToken,
      getCookieOptions(REFRESH_TOKEN_MAX_AGE)
    );

    return response;
  } catch (error: any) {
    console.error("[SSO CALLBACK ERROR]:", error);
    return sendError(
      error.message || "Xác thực SSO thất bại. Vui lòng thử lại.",
      HttpStatus.UNAUTHORIZED
    );
  }
}

