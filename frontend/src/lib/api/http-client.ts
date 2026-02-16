import axios, { AxiosError, type AxiosRequestConfig, type AxiosInstance } from "axios";
import { API_BASE_URL } from "@/lib/constants";
import type { BackendErrorResponse, BackendErrorTree } from "@/types/api";

export interface ApiRequestOptions {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string | null;
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
  signal?: AbortSignal;
}

function extractTreeMessage(tree: BackendErrorTree): string {
  const rootErrors = tree.errors?.filter(Boolean) ?? [];
  const propertyErrors = Object.entries(tree.properties ?? {})
    .map(([property, value]) =>
      value.errors.length ? `${property}: ${value.errors.join(", ")}` : "",
    )
    .filter(Boolean);

  return [...rootErrors, ...propertyErrors].join("; ") || "Request failed";
}

function toBackendErrorResponse(value: unknown): BackendErrorResponse | undefined {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  if (!Object.hasOwn(value as object, "error")) {
    return undefined;
  }

  return value as BackendErrorResponse;
}

export function extractApiErrorMessage(payload?: BackendErrorResponse): string {
  if (!payload) {
    return "Request failed";
  }

  if (typeof payload.error === "string") {
    return payload.error;
  }

  return extractTreeMessage(payload.error);
}

export class ApiClientError extends Error {
  readonly status: number;
  readonly payload?: BackendErrorResponse;

  constructor(status: number, payload?: BackendErrorResponse, fallback = "Request failed") {
    super(payload ? extractApiErrorMessage(payload) : fallback);
    this.name = "ApiClientError";
    this.status = status;
    this.payload = payload;
  }
}

export class HttpClient {
  private readonly client: AxiosInstance;

  constructor(baseUrl: string = API_BASE_URL) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 15_000,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async request<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
    const { method = "GET", body, token, headers, params, signal } = options;

    const config: AxiosRequestConfig = {
      url: path,
      method,
      data: body,
      params,
      signal,
      headers: {
        ...headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    try {
      const response = await this.client.request<T>(config);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        const payload = toBackendErrorResponse(error.response?.data);

        throw new ApiClientError(
          error.response?.status ?? 500,
          payload,
          error.message,
        );
      }

      throw new ApiClientError(500, undefined, "Network error occurred");
    }
  }

  get<T>(path: string, token?: string | null, signal?: AbortSignal) {
    return this.request<T>(path, { method: "GET", token, signal });
  }

  post<T>(path: string, body: unknown, token?: string | null, signal?: AbortSignal) {
    return this.request<T>(path, { method: "POST", body, token, signal });
  }

  patch<T>(path: string, body: unknown, token?: string | null, signal?: AbortSignal) {
    return this.request<T>(path, { method: "PATCH", body, token, signal });
  }

  delete<T>(path: string, token?: string | null, signal?: AbortSignal) {
    return this.request<T>(path, { method: "DELETE", token, signal });
  }
}

export const httpClient = new HttpClient();

export function toErrorMessage(error: unknown): string {
  if (error instanceof ApiClientError) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error occurred";
}
