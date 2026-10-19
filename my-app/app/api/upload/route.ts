import { NextRequest } from "next/server";
import path from "path";
import fs from "fs/promises";
import { CloudinaryService } from "@/shared/services/cloudinary.service";
import { sendSuccess, sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";
import { withErrorHandler } from "@/shared/utils";
import { randomUUID } from "node:crypto";

const IMAGE_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
  "image/gif",
  "image/svg+xml",
]);
const WORD_MIME_TYPES: Record<string, string> = {
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;

function isManagedPublicId(publicId: string, folder: string): boolean {
  if (!publicId.startsWith(`${folder}/`)) return false;
  const relativeId = publicId.slice(folder.length + 1);
  return (
    /^[^/]+$/.test(relativeId) ||
    /^admin\/(?:news|projects|products)\/[^/]+$/.test(relativeId)
  );
}

function assetFromManagedUrl(
  value: string,
  folder: string,
): { publicId: string; resourceType: "image" | "raw" } | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "res.cloudinary.com")
      return null;
    const parts = url.pathname.split("/").filter(Boolean);
    const resourceType = parts[1];
    if (
      parts[0] !== process.env.CLOUDINARY_CLOUD_NAME ||
      (resourceType !== "image" && resourceType !== "raw") ||
      parts[2] !== "upload"
    ) {
      return null;
    }
    const versionIndex = parts.findIndex(
      (part, index) => index >= 3 && /^v\d+$/.test(part),
    );
    if (versionIndex < 0) return null;
    const assetPath = decodeURIComponent(
      parts.slice(versionIndex + 1).join("/"),
    );
    const publicId =
      resourceType === "raw"
        ? assetPath
        : assetPath.replace(/\.(?:jpe?g|png|webp|gif|svg|avif|pdf)$/i, "");
    if (
      !isManagedPublicId(publicId, folder) ||
      (publicId === assetPath && resourceType === "image")
    )
      return null;
    return { publicId, resourceType };
  } catch {
    return null;
  }
}

/**
 * POST /api/upload
 * Nhận FormData chứa file ảnh và upload trực tiếp lên Cloudinary
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const formData = await request.formData();
  const file = formData.get("file");
  const folder = process.env.CLOUDINARY_FOLDER?.trim();

  if (!folder || folder.includes("/") || folder.includes("\\")) {
    return sendError(
      "CLOUDINARY_FOLDER phải là tên một thư mục Cloudinary và không được để trống",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  if (!(file instanceof File)) {
    return sendError("Vui lòng chọn file cần tải lên", HttpStatus.BAD_REQUEST);
  }

  const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
  const isImage = IMAGE_MIME_TYPES.has(file.type);
  const isPdf = extension === "pdf" && file.type === "application/pdf";
  const isWord = WORD_MIME_TYPES[extension] === file.type;
  if (!isImage && !isPdf && !isWord) {
    return sendError(
      "Chỉ chấp nhận ảnh JPG, PNG, WEBP, GIF, SVG, file PDF, DOC hoặc DOCX",
      HttpStatus.BAD_REQUEST,
    );
  }

  // 2. Kiểm tra kích thước file
  if (file.size > MAX_FILE_SIZE) {
    return sendError(
      "Dung lượng file vượt quá giới hạn cho phép (tối đa 10MB)",
      HttpStatus.BAD_REQUEST,
    );
  }

  // 3. Chuyển File sang Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const result = await CloudinaryService.uploadBuffer(buffer, folder, {
    resourceType: isWord ? "raw" : "image",
    ...(isWord ? { publicId: `${randomUUID()}.${extension}` } : {}),
    optimizeImage: isImage,
  });

  return sendSuccess(
    result,
    "Tải file lên Cloudinary thành công",
    HttpStatus.CREATED,
  );
});

/**
 * DELETE /api/upload
 * Xóa file thuộc thư mục Cloudinary đã cấu hình theo URL hoặc publicId.
 */
export const DELETE = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json().catch(() => null);
  const folder = process.env.CLOUDINARY_FOLDER?.trim();
  if (!folder || folder.includes("/") || folder.includes("\\")) {
    return sendError(
      "CLOUDINARY_FOLDER phải là tên một thư mục Cloudinary và không được để trống",
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  const fromUrl = typeof body?.url === "string";
  const asset = fromUrl
    ? assetFromManagedUrl(body.url, folder)
    : { publicId: body?.publicId, resourceType: body?.resourceType ?? "image" };

  if (fromUrl && !asset)
    return sendSuccess(
      { result: "skipped" },
      "File không thuộc thư mục Cloudinary đã cấu hình",
    );

  if (
    !asset ||
    typeof asset.publicId !== "string" ||
    !isManagedPublicId(asset.publicId, folder) ||
    (asset.resourceType !== "image" && asset.resourceType !== "raw")
  ) {
    return sendError(
      "File không thuộc thư mục Cloudinary đã cấu hình",
      HttpStatus.BAD_REQUEST,
    );
  }

  const result = await CloudinaryService.deleteImage(
    asset.publicId,
    asset.resourceType,
  );
  return sendSuccess(result, "Xóa file trên Cloudinary thành công");
});

