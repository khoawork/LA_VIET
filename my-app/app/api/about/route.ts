import { withErrorHandler, sendSuccess } from "@/shared";

export const GET = withErrorHandler(async () => {
  return sendSuccess({
    name: "LA VIET Project API",
    version: "1.0.0",
    description: "API hệ thống quản lý LA VIET",
  });
});
