import { NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma.service";
import { getAuthUserFromRequest, hashPassword } from "@/shared/auth/auth.service";
import { sendSuccess, sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";
import { withErrorHandler } from "@/shared/utils";
import type { Role } from "@/prisma/generated/prisma/enums";

export const GET = withErrorHandler(async (request: NextRequest) => {
  const currentUser = await getAuthUserFromRequest(request);

  if (!currentUser) {
    return sendError("Yêu cầu đăng nhập", HttpStatus.UNAUTHORIZED);
  }

  if (currentUser.role !== "ADMIN") {
    return sendError(
      "Chỉ Quản trị viên tối cao (ADMIN) mới có quyền truy cập",
      HttpStatus.FORBIDDEN
    );
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      fullname: true,
      email: true,
      username: true,
      role: true,
      isActive: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return sendSuccess(users, "Lấy danh sách người dùng thành công");
});

export const POST = withErrorHandler(async (request: NextRequest) => {
  const currentUser = await getAuthUserFromRequest(request);

  if (!currentUser) {
    return sendError("Yêu cầu đăng nhập", HttpStatus.UNAUTHORIZED);
  }

  if (currentUser.role !== "ADMIN") {
    return sendError(
      "Chỉ Quản trị viên tối cao (ADMIN) mới có quyền tạo tài khoản",
      HttpStatus.FORBIDDEN
    );
  }

  const body = await request.json();
  const { fullname, email, password, role, isActive } = body;

  if (!fullname || typeof fullname !== "string" || !fullname.trim()) {
    return sendError("Vui lòng nhập họ và tên người dùng", HttpStatus.BAD_REQUEST);
  }

  const cleanEmail = String(email || "").trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!cleanEmail || !emailRegex.test(cleanEmail)) {
    return sendError("Vui lòng cung cấp địa chỉ email hợp lệ", HttpStatus.BAD_REQUEST);
  }

  if (!password || typeof password !== "string" || password.length < 6) {
    return sendError(
      "Mật khẩu phải có độ dài tối thiểu từ 6 ký tự",
      HttpStatus.BAD_REQUEST
    );
  }

  const validRoles: Role[] = ["ADMIN", "MANAGER", "USER"];
  const targetRole = validRoles.includes(role as Role) ? (role as Role) : "MANAGER";

  // Kiểm tra email trùng
  const existingUser = await prisma.user.findUnique({
    where: { email: cleanEmail },
  });

  if (existingUser) {
    return sendError(
      "Địa chỉ email này đã được sử dụng trong hệ thống",
      HttpStatus.CONFLICT
    );
  }

  const hashedPassword = await hashPassword(password);

  const newUser = await prisma.user.create({
    data: {
      fullname: fullname.trim(),
      email: cleanEmail,
      username: cleanEmail.split("@")[0] + "_" + Math.floor(Math.random() * 1000),
      password: hashedPassword,
      role: targetRole,
      isActive: isActive !== false,
    },
    select: {
      id: true,
      fullname: true,
      email: true,
      username: true,
      role: true,
      isActive: true,
      avatar: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return sendSuccess(
    newUser,
    "Tạo tài khoản người dùng thành công",
    HttpStatus.CREATED
  );
});

