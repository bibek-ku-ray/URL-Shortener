import type {
  AuthToken,
  LoginCredentials,
  SignupPayload,
  SignupResult,
} from "@/features/auth/entities/auth";

export interface AuthGateway {
  signup(payload: SignupPayload): Promise<SignupResult>;
  login(credentials: LoginCredentials): Promise<AuthToken>;
}
