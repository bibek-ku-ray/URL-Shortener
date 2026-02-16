export interface BackendErrorTree {
  errors: string[];
  properties?: Record<string, { errors: string[] }>;
}

export interface BackendErrorResponse {
  error: string | BackendErrorTree;
}

export interface BackendMessageResponse {
  message: string;
}
