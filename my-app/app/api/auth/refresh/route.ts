import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma.service";
import {
  comparePassword,
  hashPassword,
  signAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  getCookieOptions,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/shared/auth/auth.service";
import { sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";
import { withErrorHandler } from "@/shared/utils";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (!refreshToken) {
    return sendError(
      "Không tìm thấy Refresh Token. Vui lòng đăng nhập lại.",
      HttpStatus.UNAUTHORIZED
    );
  }

  // 1. Xác thực Refresh Token
  const tokenPayload = await verifyRefreshToken(refreshToken);
  if (!tokenPayload) {
    const errorResponse = sendError(
      "Refresh Token đã hết hạn hoặc không hợp lệ. Vui lòng đăng nhập lại.",
      HttpStatus.UNAUTHORIZED
    );
    errorResponse.cookies.delete(ACCESS_TOKEN_COOKIE);
    errorResponse.cookies.delete(REFRESH_TOKEN_COOKIE);
    return errorResponse;
  }

  // 2. Tìm người dùng trong DB
  const user = await prisma.user.findUnique({
    where: { id: tokenPayload.id },
  });

  if (!user || !user.isActive || !user.refreshToken) {
    const errorResponse = sendError(
      "Phiên làm việc không còn hiệu lực. Vui lòng đăng nhập lại.",
      HttpStatus.UNAUTHORIZED
    );
    errorResponse.cookies.delete(ACCESS_TOKEN_COOKIE);
    errorResponse.cookies.delete(REFRESH_TOKEN_COOKIE);
    return errorResponse;
  }

  // 3. Đối chiếu Refresh Token với bản lưu trữ trong DB
  const isTokenValid = await comparePassword(refreshToken, user.refreshToken);
  if (!isTokenValid) {
    // Phát hiện token không khớp (có thể bị tái sử dụng) -> Hủy session
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken: null },
    });
    const errorResponse = sendError(
      "Phát hiện phiên làm việc bất thường. Vui lòng đăng nhập lại.",
      HttpStatus.UNAUTHORIZED
    );
    errorResponse.cookies.delete(ACCESS_TOKEN_COOKIE);
    errorResponse.cookies.delete(REFRESH_TOKEN_COOKIE);
    return errorResponse;
  }

  // 4. Cấp phát Access Token mới và luân chuyển Refresh Token mới
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

  // Lưu Refresh Token mới vào DB
  const newHashedRT = await hashPassword(newRefreshToken);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: newHashedRT },
  });

  // 5. Cập nhật Cookies
  const response = NextResponse.json(
    {
      success: true,
      message: "Cấp mới Access Token thành công!",
      data: {
        user: userPayload,
      },
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

