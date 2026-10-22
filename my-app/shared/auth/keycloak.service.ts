import { decodeJwt } from "jose";
import { prisma } from "@/prisma/prisma.service";
import {
  signAccessToken,
  signRefreshToken,
  hashPassword,
} from "./auth.service";

const KEYCLOAK_URL =
  process.env.KEYCLOAK_URL || "http://localhost:8888/realms/sso-platform";
const KEYCLOAK_TOKEN_URL =
  process.env.KEYCLOAK_TOKEN_URL ||
  `${KEYCLOAK_URL}/protocol/openid-connect/token`;

const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID || "app-b";
const CLIENT_SECRET =
  process.env.KEYCLOAK_CLIENT_SECRET || "app-b-confidential-secret-key-123456";

export interface KeycloakProfile {
  sub: string;
  email: string;
  username: string;
  fullname: string;
}

/**
 * Trao đổi Authorization Code lấy Token từ Keycloak
 */
export async function exchangeCodeWithKeycloak(
  code: string,
  redirectUri: string,
  codeVerifier?: string
): Promise<{ accessToken: string; idToken?: string }> {
  const bodyParams = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code,
    redirect_uri: redirectUri,
  });

  if (codeVerifier) {
    bodyParams.append("code_verifier", codeVerifier);
  }

  const response = await fetch(KEYCLOAK_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: bodyParams.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Lỗi trao đổi token với Keycloak: ${errorText}`);
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    idToken: data.id_token,
  };
}

/**
 * Trích xuất hồ sơ người dùng từ ID Token hoặc Access Token
 */
export function extractKeycloakProfile(
  idToken?: string,
  accessToken?: string
): KeycloakProfile {
  const tokenToDecode = idToken || accessToken;
  if (!tokenToDecode) {
    throw new Error("Không có token hợp lệ để giải mã thông tin người dùng.");
  }

  const payload = decodeJwt(tokenToDecode);
  const sub = payload.sub as string;
  const email = (payload.email as string) || `${sub}@sso.laviet.vn`;
  const username =
    (payload.preferred_username as string) || email.split("@")[0];
  const fullname =
    (payload.name as string) ||
    `${payload.given_name || ""} ${payload.family_name || ""}`.trim() ||
    username;

  return { sub, email, username, fullname };
}

/**
 * Đồng bộ hoặc tự động tạo tài khoản (JIT Provisioning) trong DB Là Việt
 */
export async function syncUserFromSSO(profile: KeycloakProfile) {
  // 1. Tìm người dùng theo keycloakId hoặc email
  let user = await prisma.user.findFirst({
    where: {
      OR: [
        { keycloakId: profile.sub },
        { email: profile.email }
      ],
    },
  });

  if (!user) {
    // Tự động tạo người dùng mới với quyền Quản trị viên (ADMIN)
    const dummyPassword = await hashPassword(
      `sso_secured_pass_${profile.sub.slice(0, 8)}`
    );

    user = await prisma.user.create({
      data: {
        keycloakId: profile.sub,
        email: profile.email,
        username: profile.username,
        fullname: profile.fullname,
        password: dummyPassword,
        role: "ADMIN",
        isActive: true,
      },
    });
  } else if (!user.keycloakId) {
    // Cập nhật keycloakId nếu user cũ đăng nhập lần đầu
    user = await prisma.user.update({
      where: { id: user.id },
      data: { keycloakId: profile.sub },
    });
  }

  // 2. Ký tạo cặp Token nội bộ của Là Việt
  const userPayload = {
    id: user.id,
    email: user.email,
    fullname: user.fullname,
    role: user.role,
    avatar: user.avatar,
  };

  const accessToken = await signAccessToken(userPayload);
  const refreshToken = await signRefreshToken(userPayload);

  // Lưu refresh token vào database
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });
  } catch (err) {
    console.warn("[WARN] Could not persist refreshToken to DB:", err);
  }

  return {
    user,
    accessToken,
    refreshToken,
  };
}
