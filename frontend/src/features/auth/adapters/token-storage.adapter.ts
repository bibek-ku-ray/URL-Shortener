import {
  AUTH_COOKIE_MAX_AGE_SECONDS,
  AUTH_COOKIE_NAME,
} from "@/lib/constants";
import type { TokenStorage } from "@/features/auth/adapters/token-storage";

function readCookie(name: string): string | null {
  if (typeof document === "undefined") {
    return null;
  }

  const match = document.cookie
    .split(";")
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${name}=`));

  if (!match) {
    return null;
  }

  return decodeURIComponent(match.split("=").slice(1).join("="));
}

export class BrowserTokenStorageAdapter implements TokenStorage {
  getToken(): string | null {
    if (typeof window === "undefined") {
      return null;
    }

    return localStorage.getItem(AUTH_COOKIE_NAME) ?? readCookie(AUTH_COOKIE_NAME);
  }

  setToken(token: string): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(AUTH_COOKIE_NAME, token);
    document.cookie = `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${AUTH_COOKIE_MAX_AGE_SECONDS}; samesite=lax`;
  }

  clearToken(): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(AUTH_COOKIE_NAME);
    document.cookie = `${AUTH_COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
  }
}
