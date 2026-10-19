import { NextRequest } from "next/server";
import { prisma } from "@/prisma/prisma.service";
import { getAuthUserFromRequest, hashPassword } from "@/shared/auth/auth.service";
import { sendSuccess, sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";
import { withErrorHandler, RouteContext } from "@/shared";
import type { Role } from "@/prisma/generated/prisma/enums";

export const PATCH = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const currentUser = await getAuthUserFromRequest(request);

    if (!currentUser) {
      return sendError("Yêu cầu đăng nhập", HttpStatus.UNAUTHORIZED);
    }

    if (currentUser.role !== "ADMIN") {
      return sendError(
        "Chỉ Quản trị viên tối cao (ADMIN) mới có quyền chỉnh sửa tài khoản",
        HttpStatus.FORBIDDEN
      );
    }

    const { id } = await context.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      return sendError("ID người dùng không hợp lệ", HttpStatus.BAD_REQUEST);
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return sendError("Không tìm thấy tài khoản người dùng", HttpStatus.NOT_FOUND);
    }

    const body = await request.json();
    const { fullname, email, role, isActive, password } = body;

    const updateData: {
      fullname?: string;
      email?: string;
      role?: Role;
      isActive?: boolean;
      password?: string;
      refreshToken?: string | null;
    } = {};

    // 1. Kiểm tra an toàn cho chính tài khoản đang đăng nhập
    const isSelf = currentUser.id === userId;

    if (isSelf && isActive === false) {
      return sendError(
        "Bạn không thể tự vô hiệu hóa tài khoản của chính mình",
        HttpStatus.BAD_REQUEST
      );
    }

    if (isSelf && role !== undefined && role !== "ADMIN") {
      return sendError(
        "Bạn không thể tự hạ quyền Quản trị viên tối cao của chính mình",
        HttpStatus.BAD_REQUEST
      );
    }

    // 2. Cập nhật Họ và tên
    if (fullname !== undefined) {
      if (typeof fullname !== "string" || !fullname.trim()) {
        return sendError("Họ và tên không được để trống", HttpStatus.BAD_REQUEST);
      }
      updateData.fullname = fullname.trim();
    }

    // 3. Cập nhật Email
    if (email !== undefined) {
      const cleanEmail = String(email).trim().toLowerCase();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!cleanEmail || !emailRegex.test(cleanEmail)) {
        return sendError("Địa chỉ email không hợp lệ", HttpStatus.BAD_REQUEST);
      }

      if (cleanEmail !== targetUser.email) {
        const emailExists = await prisma.user.findFirst({
          where: {
            email: cleanEmail,
            NOT: { id: userId },
          },
        });
        if (emailExists) {
          return sendError(
            "Địa chỉ email này đã được sử dụng bởi tài khoản khác",
            HttpStatus.CONFLICT
          );
        }
        updateData.email = cleanEmail;
      }
    }

    // 4. Cập nhật Vai trò
    if (role !== undefined) {
      const validRoles: Role[] = ["ADMIN", "MANAGER", "USER"];
      if (!validRoles.includes(role as Role)) {
        return sendError("Vai trò phân quyền không hợp lệ", HttpStatus.BAD_REQUEST);
      }
      // Nếu hạ quyền admin xuống manager, kiểm tra xem có còn admin khác không
      if (targetUser.role === "ADMIN" && role !== "ADMIN") {
        const remainingAdmins = await prisma.user.count({
          where: { role: "ADMIN", NOT: { id: userId } },
        });
        if (remainingAdmins === 0) {
          return sendError(
            "Hệ thống phải duy trì ít nhất 1 Quản trị viên tối cao (ADMIN)",
            HttpStatus.BAD_REQUEST
          );
        }
      }
      updateData.role = role as Role;
    }

    // 5. Cập nhật trạng thái kích hoạt
    if (isActive !== undefined) {
      if (typeof isActive !== "boolean") {
        return sendError("Trạng thái kích hoạt không hợp lệ", HttpStatus.BAD_REQUEST);
      }
      // Nếu khoá admin, kiểm tra xem còn admin khác đang hoạt động không
      if (targetUser.role === "ADMIN" && !isActive) {
        const activeAdmins = await prisma.user.count({
          where: { role: "ADMIN", isActive: true, NOT: { id: userId } },
        });
        if (activeAdmins === 0) {
          return sendError(
            "Không thể khóa vì đây là Quản trị viên tối cao đang hoạt động duy nhất",
            HttpStatus.BAD_REQUEST
          );
        }
      }
      updateData.isActive = isActive;
    }

    // 6. Cập nhật / Đổi mật khẩu mới
    if (password !== undefined && password !== "") {
      if (typeof password !== "string" || password.length < 6) {
        return sendError(
          "Mật khẩu mới phải có tối thiểu 6 ký tự",
          HttpStatus.BAD_REQUEST
        );
      }
      updateData.password = await hashPassword(password);
      // Hủy token hiện tại để người dùng phải đăng nhập lại với mật khẩu mới
      updateData.refreshToken = null;
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
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

    return sendSuccess(updatedUser, "Cập nhật thông tin tài khoản thành công");
  }
);

export const DELETE = withErrorHandler(
  async (request: NextRequest, context: RouteContext<{ id: string }>) => {
    const currentUser = await getAuthUserFromRequest(request);

    if (!currentUser) {
      return sendError("Yêu cầu đăng nhập", HttpStatus.UNAUTHORIZED);
    }

    if (currentUser.role !== "ADMIN") {
      return sendError(
        "Chỉ Quản trị viên tối cao (ADMIN) mới có quyền xóa tài khoản",
        HttpStatus.FORBIDDEN
      );
    }

    const { id } = await context.params;
    const userId = Number(id);

    if (isNaN(userId)) {
      return sendError("ID người dùng không hợp lệ", HttpStatus.BAD_REQUEST);
    }

    // Không được tự xóa tài khoản của chính mình
    if (currentUser.id === userId) {
      return sendError(
        "Bạn không thể tự xóa tài khoản của chính mình đang đăng nhập",
        HttpStatus.BAD_REQUEST
      );
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!targetUser) {
      return sendError("Không tìm thấy tài khoản người dùng", HttpStatus.NOT_FOUND);
    }

    // Kiểm tra số lượng ADMIN còn lại
    if (targetUser.role === "ADMIN") {
      const adminCount = await prisma.user.count({
        where: { role: "ADMIN" },
      });
      if (adminCount <= 1) {
        return sendError(
          "Hệ thống phải duy trì ít nhất 1 Quản trị viên tối cao (ADMIN). Không thể xóa tài khoản này.",
          HttpStatus.BAD_REQUEST
        );
      }
    }

    await prisma.user.delete({
      where: { id: userId },
    });

    return sendSuccess(null, "Xóa tài khoản người dùng thành công");
  }
);

