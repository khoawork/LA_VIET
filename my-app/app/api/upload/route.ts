import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";
import { CloudinaryService } from "@/shared/services/cloudinary.service";
import { sendSuccess, sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";
import { withErrorHandler } from "@/shared/utils";

// Danh sách các định dạng ảnh hợp lệ
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  "image/gif",
  "image/svg+xml",
];

// Giới hạn dung lượng tối đa: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * POST /api/upload
 * Nhận FormData chứa file ảnh và upload lên Cloudinary (hoặc fallback lưu cục bộ vào /public/uploads)
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder =
    (formData.get("folder") as string)?.trim() || "La_Viet_Cloudinary";

  if (!file) {
    return sendError("Vui lòng chọn file hình ảnh cần tải lên", HttpStatus.BAD_REQUEST);
  }

  // 1. Kiểm tra định dạng file
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return sendError(
      "Định dạng file không hợp lệ. Chỉ chấp nhận các định dạng: JPG, PNG, WEBP, GIF, SVG",
      HttpStatus.BAD_REQUEST
    );
  }

  // 2. Kiểm tra kích thước file
  if (file.size > MAX_FILE_SIZE) {
    return sendError(
      "Dung lượng file vượt quá giới hạn cho phép (tối đa 10MB)",
      HttpStatus.BAD_REQUEST
    );
  }

  // 3. Chuyển File sang Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let result: { url: string; publicId: string } | null = null;

  // 4. Nếu có cấu hình Cloudinary, ưu tiên tải lên Cloudinary
  if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY) {
    try {
      result = await CloudinaryService.uploadBuffer(buffer, folder);
    } catch (error) {
      console.warn("Cloudinary upload failed, falling back to local storage:", error);
    }
  }

  // 5. Fallback lưu vào thư mục public/uploads
  if (!result) {
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadsDir, { recursive: true });

    const originalName = file.name || "uploaded-image.png";
    const ext = path.extname(originalName) || ".png";
    const baseName = path.basename(originalName, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueFilename = `${baseName}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}${ext}`;
    const destinationPath = path.join(uploadsDir, uniqueFilename);

    await fs.writeFile(destinationPath, buffer);
    result = {
      url: `/uploads/${uniqueFilename}`,
      publicId: uniqueFilename,
    };
  }

  return sendSuccess(
    result,
    "Tải ảnh thành công",
    HttpStatus.CREATED
  );
});

/**
 * DELETE /api/upload
 * Xóa ảnh trên Cloudinary theo publicId
 */
export const DELETE = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json().catch(() => null);
  const publicId = body?.publicId;

  if (!publicId) {
    return sendError("Vui lòng cung cấp publicId của ảnh cần xóa", HttpStatus.BAD_REQUEST);
  }

  const result = await CloudinaryService.deleteImage(publicId);
  return sendSuccess(result, "Xóa ảnh trên Cloudinary thành công");
});

