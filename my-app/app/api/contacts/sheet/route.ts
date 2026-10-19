import { NextRequest } from "next/server";
import { GoogleSheetsService } from "@/shared/services/google-sheets.service";
import { sendSuccess, sendError } from "@/shared/common/api-response";
import { HttpStatus } from "@/shared/common/http-status";
import { withErrorHandler } from "@/shared/utils";

/**
 * GET /api/contacts/sheet
 * Lấy thông tin email bot Google Service Account và kiểm tra kết nối nếu có sheetId
 */
export const GET = withErrorHandler(async (request: NextRequest) => {
  const botEmail = GoogleSheetsService.getBotEmail();
  const { searchParams } = new URL(request.url);
  const sheetId = searchParams.get("sheetId");

  if (!sheetId) {
    return sendSuccess(
      { botEmail },
      "Lấy thông tin Bot Service Account thành công"
    );
  }

  try {
    const info = await GoogleSheetsService.verifyConnection(sheetId);
    return sendSuccess(
      {
        connected: true,
        ...info,
      },
      "Kết nối tới Google Sheet thành công!"
    );
  } catch (err: any) {
    return sendError(
      err.message || "Không thể kết nối đến Google Sheet. Vui lòng kiểm tra quyền chia sẻ.",
      HttpStatus.BAD_REQUEST,
      { botEmail, connected: false }
    );
  }
});

/**
 * POST /api/contacts/sheet
 * Thao tác với Google Sheet: Kiểm tra kết nối ("test") hoặc Đồng bộ tiêu đề cột ("sync")
 */
export const POST = withErrorHandler(async (request: NextRequest) => {
  const body = await request.json().catch(() => null);

  if (!body || !body.sheetId) {
    return sendError(
      "Vui lòng cung cấp sheetId (hoặc đường link Google Sheet).",
      HttpStatus.BAD_REQUEST
    );
  }

  const { sheetId, fields, action = "sync" } = body;

  try {
    if (action === "test") {
      const verifyInfo = await GoogleSheetsService.verifyConnection(sheetId);
      return sendSuccess(
        verifyInfo,
        `Kết nối thành công tới Google Sheet: "${verifyInfo.title}"!`
      );
    }

    if (action === "sync") {
      if (!Array.isArray(fields) || fields.length === 0) {
        return sendError(
          "Không có trường dữ liệu (fields) nào để đồng bộ tiêu đề cột.",
          HttpStatus.BAD_REQUEST
        );
      }

      const syncResult = await GoogleSheetsService.syncHeaderFields(
        sheetId,
        fields
      );

      return sendSuccess(
        syncResult,
        `Đã đồng bộ thành công ${syncResult.columnCount} cột tiêu đề trên trang tính "${syncResult.sheetName}"!`
      );
    }

    return sendError("Hành động (action) không được hỗ trợ.", HttpStatus.BAD_REQUEST);
  } catch (err: any) {
    return sendError(
      err.message || "Lỗi thao tác với Google Sheets API",
      HttpStatus.BAD_REQUEST
    );
  }
});

