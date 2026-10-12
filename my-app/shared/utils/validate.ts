import { ZodError, type ZodType } from "zod";
import { ValidationException } from "@/shared/common/app-error";

export function formatZodError(error: ZodError) {
  return error.issues.map((err) => ({
    field: err.path.join("."),
    message: err.message,
  }));
}

export async function validateBody<T>(schema: ZodType<T>, req: Request): Promise<T> {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    throw new ValidationException("Dữ liệu gửi lên không phải JSON hợp lệ");
  }

  const result = schema.safeParse(body);
  if (!result.success) {
    throw new ValidationException(
      "Dữ liệu body không hợp lệ",
      formatZodError(result.error),
    );
  }

  return result.data;
}

export function validateQuery<T>(schema: ZodType<T>, searchParams: URLSearchParams): T {
  const paramsObj: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    paramsObj[key] = value;
  });

  const result = schema.safeParse(paramsObj);
  if (!result.success) {
    throw new ValidationException(
      "Tham số URL (Query) không hợp lệ",
      formatZodError(result.error),
    );
  }

  return result.data;
}

export async function validateParams<T>(
  schema: ZodType<T>,
  paramsInput: Promise<unknown> | unknown,
): Promise<T> {
  const resolved = await Promise.resolve(paramsInput);
  const result = schema.safeParse(resolved);
  if (!result.success) {
    throw new ValidationException(
      "Tham số đường dẫn (Route Params) không hợp lệ",
      formatZodError(result.error),
    );
  }
  return result.data;
}

