import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma.service";
import {
  verifyAccessToken,
  verifyRefreshToken,
  signAccessToken,
  signRefreshToken,
  hashPassword,
  comparePassword,
  getCookieOptions,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/shared/auth/auth.service";
import { sendSuccess, sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";
import { withErrorHandler } from "@/shared/utils";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;

  // 1. Nếu có Access Token và còn hiệu lực
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken);
    if (payload) {
      return sendSuccess(
        { user: payload },
        "Lấy thông tin người dùng thành công"
      );
    }
  }

  // 2. Nếu Access Token hết hạn, thử Refresh Token
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  if (!refreshToken) {
    return sendError("Chưa đăng nhập", HttpStatus.UNAUTHORIZED);
  }

  const refreshPayload = await verifyRefreshToken(refreshToken);
  if (!refreshPayload) {
    return sendError("Phiên làm việc đã hết hạn", HttpStatus.UNAUTHORIZED);
  }

  const user = await prisma.user.findUnique({
    where: { id: refreshPayload.id },
  });

  if (!user || !user.isActive || !user.refreshToken) {
    return sendError("Tài khoản không hợp lệ", HttpStatus.UNAUTHORIZED);
  }

  const isMatch = await comparePassword(refreshToken, user.refreshToken);
  if (!isMatch) {
    return sendError("Phiên làm việc không hợp lệ", HttpStatus.UNAUTHORIZED);
  }

  // Cấp mới cặp token
  const userPayload = {
    id: user.id,
    email: user.email,
    fullname: user.fullname,
    role: user.role,
    avatar: user.avatar,
  };

  const newAccessToken = await signAccessToken(userPayload);
  const newRefreshToken = await signRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: await hashPassword(newRefreshToken) },
  });

  const response = NextResponse.json(
    {
      success: true,
      message: "Lấy thông tin người dùng thành công",
      data: { user: userPayload },
    },
    { status: HttpStatus.OK }
  );

  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    newAccessToken,
    getCookieOptions(false)
  );
  response.cookies.set(
    REFRESH_TOKEN_COOKIE,
    newRefreshToken,
    getCookieOptions(true)
  );

  return response;
});

