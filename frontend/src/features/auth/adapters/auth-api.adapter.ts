import type { HttpClient } from "@/lib/api/http-client";
import type {
  AuthToken,
  LoginCredentials,
  SignupPayload,
  SignupResult,
} from "@/features/auth/entities/auth";
import type { AuthGateway } from "@/features/auth/adapters/auth-gateway";

interface SignupApiResponse {
  data: { userId: string };
  message: string;
}

export class AuthApiAdapter implements AuthGateway {
  constructor(private readonly client: HttpClient) {}

  async signup(payload: SignupPayload): Promise<SignupResult> {
    const response = await this.client.post<SignupApiResponse>("/user/signup", {
      ...payload,
      lastname: payload.lastname || undefined,
    });

    return {
      userId: response.data.userId,
      message: response.message,
    };
  }

  login(credentials: LoginCredentials): Promise<AuthToken> {
    return this.client.post<AuthToken>("/user/login", credentials);
  }
}
