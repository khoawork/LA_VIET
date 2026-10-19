interface UploadedImage {
  url: string;
  publicId: string;
}

async function responseError(response: Response, fallback: string): Promise<Error> {
  const body = await response.json().catch(() => null);
  return new Error(body?.message || fallback);
}

function isCloudinaryUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" &&
      url.hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
}

async function uploadImage(file: File): Promise<UploadedImage> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/upload", { method: "POST", body: formData });
  if (!response.ok) throw await responseError(response, "Không thể tải ảnh lên Cloudinary.");
  const body = await response.json();
  if (!body.success || !body.data?.url || !body.data?.publicId) {
    throw new Error(body.message || "Cloudinary không trả về URL ảnh.");
  }
  return { url: body.data.url, publicId: body.data.publicId };
}

async function deleteImage(body: { publicId: string } | { url: string }): Promise<void> {
  const response = await fetch("/api/upload", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw await responseError(response, "Không thể xóa ảnh trên Cloudinary.");
}

export async function deleteManagedImageByUrl(url: string): Promise<void> {
  if (isCloudinaryUrl(url)) await deleteImage({ url });
}

export async function saveWithImage(options: {
  file: File | null;
  currentUrl?: string;
  imageUrl: string;
  save: (url: string) => Promise<void>;
}): Promise<{ cleanupWarning: string | null }> {
  const uploaded = options.file ? await uploadImage(options.file) : null;
  const nextUrl = uploaded?.url ?? options.imageUrl.trim();

  try {
    await options.save(nextUrl);
  } catch (error) {
    if (uploaded) {
      try {
        await deleteImage({ publicId: uploaded.publicId });
      } catch (cleanupError) {
        console.error("Không thể dọn ảnh vừa tải lên sau lỗi lưu dữ liệu:", cleanupError);
      }
    }
    throw error;
  }

  if (options.currentUrl && options.currentUrl !== nextUrl) {
    try {
      await deleteManagedImageByUrl(options.currentUrl);
    } catch (error) {
      return {
        cleanupWarning: error instanceof Error ? error.message : "Không thể xóa ảnh cũ.",
      };
    }
  }
  return { cleanupWarning: null };
}
