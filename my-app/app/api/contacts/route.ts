import { NextRequest } from "next/server";
import { sendSuccess, sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";
import { withErrorHandler } from "@/shared/utils";
import { pageContactService } from "@/modules/pages/page-contact/page-contact.service";
import { GoogleSheetsService } from "@/shared/services/google-sheets.service";

/**
 * POST /api/contacts
 * Tiếp nhận thông tin gửi từ Dynamic Form trên trang Liên hệ
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return sendError("Dữ liệu gửi lên không hợp lệ", HttpStatus.BAD_REQUEST);
  }

  const formData = body.data || body;
  const submittedAt = body.submittedAt || new Date().toISOString();

  // Log thông tin khách hàng gửi liên hệ
  console.log("=== [DYNAMIC FORM SUBMISSION] ===");
  console.log("Thời gian:", submittedAt);
  console.log("Dữ liệu biểu mẫu:", JSON.stringify(formData, null, 2));
  console.log("=================================");

  // Tự động ghi vào Google Sheet (ưu tiên sheetId gửi từ form hoặc từ cấu hình CMS)
  let sheetSynced = false;
  try {
    const ctaSection = await pageContactService.getSection("cta").catch(() => null);
    const googleSheetId =
      body.sheetId ||
      body.googleSheetId ||
      (ctaSection as any)?.googleSheetId ||
      process.env.GOOGLE_SHEET_ID;

    const fields =
      (Array.isArray(body.fields) && body.fields.length > 0)
        ? body.fields
        : (ctaSection?.fields || []);

    if (googleSheetId && fields.length > 0) {
      const appendResult = await GoogleSheetsService.appendSubmission(
        googleSheetId,
        formData,
        fields
      );
      if (appendResult) {
        sheetSynced = true;
        console.log(`[GOOGLE SHEETS] ✅ Đã ghi thành công dòng mới vào Sheet: ${googleSheetId}`);
      } else {
        console.warn(`[GOOGLE SHEETS] ⚠️ Không thể ghi dòng vào Sheet: ${googleSheetId}`);
      }
    }
  } catch (sheetErr: any) {
    console.error("[GOOGLE SHEETS SYNC ERROR]", sheetErr.message);
  }

  // Trả về thành công cho client
  return sendSuccess(
    {
      id: Date.now(),
      data: formData,
      submittedAt,
    },
    "Gửi yêu cầu liên hệ hợp tác thành công! Chúng tôi sẽ phản hồi trong 24 giờ.",
    HttpStatus.CREATED
  );
});

/**
 * GET /api/contacts
 * Lấy trạng thái hoạt động của kênh tiếp nhận liên hệ
 */
export const GET = withErrorHandler(async () => {
  return sendSuccess(
    {
      status: "active",
      supportedTypes: [
        "text",
        "tel",
        "email",
        "textarea",
        "select",
        "number",
        "date",
        "radio",
        "checkbox",
      ],
    },
    "Hệ thống tiếp nhận biểu mẫu liên hệ đang hoạt động tốt"
  );
});

