import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma.service";
import {
  comparePassword,
  hashPassword,
  signAccessToken,
  signRefreshToken,
  getCookieOptions,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/shared/auth/auth.service";
import { sendSuccess, sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";
import { withErrorHandler } from "@/shared/utils";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json().catch(() => null);

  if (!body || !body.email || !body.password) {
    return sendError(
      "Vui lòng cung cấp đầy đủ email và mật khẩu.",
      HttpStatus.BAD_REQUEST
    );
  }

  const email = String(body.email).trim().toLowerCase();
  const password = String(body.password);

  // 1. Tìm người dùng theo email
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return sendError(
      "Email hoặc mật khẩu không chính xác.",
      HttpStatus.UNAUTHORIZED
    );
  }

  // 2. Kiểm tra trạng thái hoạt động của tài khoản
  if (!user.isActive) {
    return sendError(
      "Tài khoản này đã bị tạm khóa. Vui lòng liên hệ quản trị viên.",
      HttpStatus.FORBIDDEN
    );
  }

  // 3. Kiểm tra vai trò (Chỉ ADMIN hoặc MANAGER mới được phép đăng nhập vào hệ thống)
  if (user.role !== "ADMIN" && user.role !== "MANAGER") {
    return sendError(
      "Tài khoản không có quyền truy cập vào khu vực quản trị.",
      HttpStatus.FORBIDDEN
    );
  }

  // 4. Kiểm tra mật khẩu
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return sendError(
      "Email hoặc mật khẩu không chính xác.",
      HttpStatus.UNAUTHORIZED
    );
  }

  // 5. Khởi tạo Tokens
  const userPayload = {
    id: user.id,
    email: user.email,
    fullname: user.fullname,
    role: user.role,
    avatar: user.avatar,
  };

  const accessToken = await signAccessToken(userPayload);
  const refreshToken = await signRefreshToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  // 6. Lưu bản băm Refresh Token vào cơ sở dữ liệu
  const hashedRefreshToken = await hashPassword(refreshToken);
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken: hashedRefreshToken },
  });

  // 7. Tạo phản hồi và đính kèm HttpOnly Cookies
  const response = NextResponse.json(
    {
      success: true,
      message: "Đăng nhập thành công!",
      data: {
        user: userPayload,
      },
    },
    { status: HttpStatus.OK }
  );

  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    accessToken,
    getCookieOptions(false)
  );

  response.cookies.set(
    REFRESH_TOKEN_COOKIE,
    refreshToken,
    getCookieOptions(true)
  );

  return response;
});

