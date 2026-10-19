import path from "path";
import fs from "fs";
import { google } from "googleapis";

export interface SheetFieldMapping {
  name: string;
  label: string;
}

export class GoogleSheetsService {
  private static serviceAccountPath = path.join(
    process.cwd(),
    "service_account.json"
  );

  /**
   * Đọc thông tin Service Account từ service_account.json
   */
  static getServiceAccountCredentials() {
    try {
      if (!fs.existsSync(this.serviceAccountPath)) {
        throw new Error(
          `Không tìm thấy tệp service_account.json tại: ${this.serviceAccountPath}`
        );
      }
      const raw = fs.readFileSync(this.serviceAccountPath, "utf-8");
      return JSON.parse(raw);
    } catch (err: any) {
      console.error("Lỗi đọc service_account.json:", err.message);
      throw new Error(`Lỗi cấu hình Google Service Account: ${err.message}`);
    }
  }

  /**
   * Lấy địa chỉ email của bot Google Service Account
   */
  static getBotEmail(): string {
    const creds = this.getServiceAccountCredentials();
    return creds.client_email || "";
  }

  /**
   * Khởi tạo Google Sheets API client với quyền đọc/ghi
   */
  private static getSheetsClient() {
    const creds = this.getServiceAccountCredentials();

    const auth = new google.auth.JWT({
      email: creds.client_email,
      key: creds.private_key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    return google.sheets({ version: "v4", auth });
  }

  /**
   * Trích xuất Google Spreadsheet ID từ URL đầy đủ hoặc giữ nguyên nếu là ID
   * Ví dụ: https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit -> 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
   */
  static extractSpreadsheetId(input: string): string {
    if (!input) return "";
    const trimmed = input.trim();
    const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
    if (match && match[1]) {
      return match[1];
    }
    return trimmed;
  }

  /**
   * Kiểm tra kết nối và lấy thông tin cơ bản của Google Sheet
   */
  static async verifyConnection(rawSheetIdOrUrl: string) {
    const spreadsheetId = this.extractSpreadsheetId(rawSheetIdOrUrl);
    if (!spreadsheetId) {
      throw new Error("Vui lòng cung cấp Google Sheet ID hoặc URL hợp lệ.");
    }

    const sheets = this.getSheetsClient();
    const res = await sheets.spreadsheets.get({
      spreadsheetId,
    });

    const title = res.data.properties?.title || "Không có tiêu đề";
    const sheetNames =
      res.data.sheets?.map((s) => s.properties?.title || "Sheet1") || [
        "Sheet1",
      ];

    return {
      spreadsheetId,
      title,
      firstSheetName: sheetNames[0] || "Sheet1",
      allSheets: sheetNames,
      botEmail: this.getBotEmail(),
    };
  }

  /**
   * Đồng bộ các Header cột trên Hàng 1 (Row 1) của Google Sheet tương ứng với Form Fields
   * @param rawSheetIdOrUrl ID hoặc URL của Google Sheet
   * @param fields Danh sách các trường dữ liệu trên Dynamic Form
   * @param sheetName Tên tab trang tính (mặc định tab đầu tiên hoặc Sheet1)
   */
  static async syncHeaderFields(
    rawSheetIdOrUrl: string,
    fields: SheetFieldMapping[],
    sheetName?: string
  ) {
    const spreadsheetId = this.extractSpreadsheetId(rawSheetIdOrUrl);
    if (!spreadsheetId) {
      throw new Error("Google Sheet ID không hợp lệ.");
    }

    const sheets = this.getSheetsClient();

    // 1. Lấy tên tab nếu chưa được chỉ định
    let targetSheetName = sheetName;
    if (!targetSheetName) {
      const meta = await sheets.spreadsheets.get({ spreadsheetId });
      targetSheetName = meta.data.sheets?.[0]?.properties?.title || "Sheet1";
    }

    // 2. Tạo mảng cột tiêu đề
    // Cột đầu tiên luôn là Thời gian gửi (Timestamp)
    const headers = [
      "Thời gian gửi",
      ...fields.map((f) => (f.label ? `${f.label} [${f.name}]` : f.name)),
    ];

    // 3. Ghi đè vào hàng 1 (A1:...)
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${targetSheetName}'!A1:1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [headers],
      },
    });

    return {
      spreadsheetId,
      sheetName: targetSheetName,
      headers,
      columnCount: headers.length,
    };
  }

  /**
   * Thêm một dòng dữ liệu mới (Append Row) khi khách gửi Form Liên hệ
   * @param rawSheetIdOrUrl ID hoặc URL của Google Sheet
   * @param formData Dữ liệu do người dùng nhập
   * @param fields Danh sách cấu hình trường của biểu mẫu
   * @param sheetName Tên tab trang tính
   */
  static async appendSubmission(
    rawSheetIdOrUrl: string,
    formData: Record<string, any>,
    fields: SheetFieldMapping[],
    sheetName?: string
  ) {
    const spreadsheetId = this.extractSpreadsheetId(rawSheetIdOrUrl);
    if (!spreadsheetId) return null;

    try {
      const sheets = this.getSheetsClient();

      let targetSheetName = sheetName;
      if (!targetSheetName) {
        const meta = await sheets.spreadsheets.get({ spreadsheetId });
        targetSheetName = meta.data.sheets?.[0]?.properties?.title || "Sheet1";
      }

      // Format thời gian theo giờ Việt Nam
      const timestamp = new Intl.DateTimeFormat("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour12: false,
      }).format(new Date());

      // Xếp giá trị đúng theo thứ tự các cột
      const rowValues = [
        timestamp,
        ...fields.map((f) => {
          const val = formData[f.name];
          if (val === undefined || val === null) return "";
          if (typeof val === "boolean") return val ? "Có (Yes)" : "Không (No)";
          if (Array.isArray(val)) return val.join(", ");
          return String(val);
        }),
      ];

      const appendRes = await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: `'${targetSheetName}'!A:A`,
        valueInputOption: "USER_ENTERED",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [rowValues],
        },
      });

      return appendRes.data;
    } catch (err: any) {
      console.error("Lỗi khi ghi dữ liệu vào Google Sheet:", err.message);
      // Không throw để tránh làm đứt mạch gửi liên hệ của khách hàng
      return null;
    }
  }
}

