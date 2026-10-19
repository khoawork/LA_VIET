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
  width?: number;
  height?: number;
  format?: string;
  bytes?: number;
}

export class CloudinaryService {
  /**
   * Upload file từ Buffer lên Cloudinary
   * @param buffer Buffer của file ảnh
   * @param folder Thư mục lưu trữ trên Cloudinary (mặc định: "La_Viet_Cloudinary")
   */
  static async uploadBuffer(
    buffer: Buffer,
    folder: string = "La_Viet_Cloudinary",
  ): Promise<CloudinaryUploadResult> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: "image",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result?: UploadApiResponse) => {
          if (error || !result) {
            reject(error || new Error("Upload lên Cloudinary thất bại"));
          } else {
            resolve({
              url: result.secure_url,
              publicId: result.public_id,
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
   * @param folder Thư mục lưu trữ trên Cloudinary
   */
  static async uploadString(
    source: string,
    folder: string = "La_Viet",
  ): Promise<CloudinaryUploadResult> {
    const result = await cloudinary.uploader.upload(source, {
      folder,
      resource_type: "image",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    });

    return {
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
    };
  }

  /**
   * Xóa ảnh trên Cloudinary qua publicId
   */
  static async deleteImage(publicId: string): Promise<unknown> {
    return cloudinary.uploader.destroy(publicId);
  }
}
