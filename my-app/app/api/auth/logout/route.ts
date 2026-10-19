import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma.service";
import {
  verifyRefreshToken,
  ACCESS_TOKEN_COOKIE,
  REFRESH_TOKEN_COOKIE,
} from "@/shared/auth/auth.service";
import { HttpStatus } from "@/shared/common/http-status";
import { withErrorHandler } from "@/shared/utils";

export const POST = withErrorHandler(async (request: NextRequest) => {
  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;

  if (refreshToken) {
    const payload = await verifyRefreshToken(refreshToken);
    if (payload?.id) {
      await prisma.user
        .update({
          where: { id: payload.id },
          data: { refreshToken: null },
        })
        .catch(() => {});
    }
  }

  const response = NextResponse.json(
    {
      success: true,
      message: "Đăng xuất thành công!",
    },
    { status: HttpStatus.OK }
  );

  response.cookies.delete(ACCESS_TOKEN_COOKIE);
  response.cookies.delete(REFRESH_TOKEN_COOKIE);

  return response;
});

