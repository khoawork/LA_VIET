import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import type { Role } from "@/prisma/generated/prisma/enums";

// Khóa bí mật JWT
const ACCESS_SECRET = new TextEncoder().encode(
  process.env.JWT_ACCESS_SECRET ||
    process.env.JWT_SECRET ||
    "la_viet_access_jwt_secret_key_secure_2026_v1_!"
);

const REFRESH_SECRET = new TextEncoder().encode(
  process.env.JWT_REFRESH_SECRET ||
    "la_viet_refresh_jwt_secret_key_secure_2026_v1_!"
);

export const ACCESS_TOKEN_COOKIE = "laviet_access_token";
export const REFRESH_TOKEN_COOKIE = "laviet_refresh_token";

// Thời hạn
export const ACCESS_TOKEN_EXPIRY = "15m"; // 15 phút
export const REFRESH_TOKEN_EXPIRY = "7d"; // 7 ngày
export const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 phút (giây)
export const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 ngày (giây)

export interface AuthUserPayload {
  id: number;
  email: string;
  fullname: string;
  role: Role;
  avatar?: string | null;
}

/**
 * Băm mật khẩu bằng bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

/**
 * Kiểm tra mật khẩu
 */
export async function comparePassword(
  plain: string,
  hashed: string
): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

/**
 * Ký tạo Access Token (15 phút)
 */
export async function signAccessToken(
  payload: AuthUserPayload
): Promise<string> {
  return new SignJWT({
    id: payload.id,
    email: payload.email,
    fullname: payload.fullname,
    role: payload.role,
    avatar: payload.avatar || null,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRY)
    .sign(ACCESS_SECRET);
}

/**
 * Ký tạo Refresh Token (7 ngày)
 */
export async function signRefreshToken(
  payload: Pick<AuthUserPayload, "id" | "email" | "role">
): Promise<string> {
  return new SignJWT({
    id: payload.id,
    email: payload.email,
    role: payload.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(REFRESH_TOKEN_EXPIRY)
    .sign(REFRESH_SECRET);
}

/**
 * Xác thực Access Token
 */
export async function verifyAccessToken(
  token: string
): Promise<AuthUserPayload | null> {
  try {
    const { payload } = await jwtVerify(token, ACCESS_SECRET);
    return payload as unknown as AuthUserPayload;
  } catch {
    return null;
  }
}

/**
 * Xác thực Refresh Token
 */
export async function verifyRefreshToken(
  token: string
): Promise<Pick<AuthUserPayload, "id" | "email" | "role"> | null> {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET);
    return payload as unknown as Pick<AuthUserPayload, "id" | "email" | "role">;
  } catch {
    return null;
  }
}

/**
 * Cấu hình Cookie HttpOnly an toàn
 */
export function getCookieOptions(isRefreshToken = false) {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax" as const,
    path: "/",
    maxAge: isRefreshToken ? REFRESH_TOKEN_MAX_AGE : ACCESS_TOKEN_MAX_AGE,
  };
}

/**
 * Trích xuất và xác thực thông tin user từ request cookies
 */
export async function getAuthUserFromRequest(
  request: { cookies: { get: (name: string) => { value: string } | undefined } }
): Promise<AuthUserPayload | null> {
  const accessToken = request.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  if (accessToken) {
    const payload = await verifyAccessToken(accessToken);
    if (payload) return payload;
  }

  const refreshToken = request.cookies.get(REFRESH_TOKEN_COOKIE)?.value;
  if (refreshToken) {
    const refreshPayload = await verifyRefreshToken(refreshToken);
    if (refreshPayload) {
      // Nhập prisma động để tránh circular dependency
      const { prisma } = await import("@/prisma/prisma.service");
      const user = await prisma.user.findUnique({
        where: { id: refreshPayload.id },
      });
      if (user && user.isActive) {
        return {
          id: user.id,
          email: user.email,
          fullname: user.fullname,
          role: user.role,
          avatar: user.avatar,
        };
      }
    }
  }

  return null;
}

