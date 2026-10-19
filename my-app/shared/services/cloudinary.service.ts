import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  resourceType: "image" | "raw";
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export class CloudinaryService {
  /**
   * Upload file từ Buffer lên Cloudinary
   * @param buffer Buffer của file
   * @param folder Thư mục lưu trữ trên Cloudinary
   */
  static async uploadBuffer(
    buffer: Buffer,
    folder: string,
    options: {
      resourceType?: "image" | "raw";
      publicId?: string;
      optimizeImage?: boolean;
    } = {},
  ): Promise<CloudinaryUploadResult> {
    const resourceType = options.resourceType ?? "image";
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: resourceType,
          ...(options.publicId ? { public_id: options.publicId } : {}),
          ...(options.optimizeImage ? { transformation: [{ quality: "auto", fetch_format: "auto" }] } : {}),
        },
        (error, result?: UploadApiResponse) => {
          if (error || !result) {
            reject(error || new Error("Upload lên Cloudinary thất bại"));
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
              resourceType,
              width: result.width,
              height: result.height,
              format: result.format,
              bytes: result.bytes,
            });
          }
        },
      );

      uploadStream.end(buffer);
    });
  }

  /**
   * Upload chuỗi ảnh (Base64 data URI hoặc URL) lên Cloudinary
   * @param source Base64 string hoặc URL hình ảnh
   */
  static async uploadString(source: string): Promise<CloudinaryUploadResult> {
    const folder = process.env.CLOUDINARY_FOLDER?.trim();
    if (!folder || folder.includes("/") || folder.includes("\\")) {
      throw new Error("CLOUDINARY_FOLDER phải là tên một thư mục Cloudinary và không được để trống");
    }
    const result = await cloudinary.uploader.upload(source, {
      folder,
      resource_type: "image",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: "image",
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  }

  /**
   * Xóa ảnh trên Cloudinary qua publicId
   */
  static async deleteImage(publicId: string, resourceType: "image" | "raw" = "image"): Promise<unknown> {
    return cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  }
}
