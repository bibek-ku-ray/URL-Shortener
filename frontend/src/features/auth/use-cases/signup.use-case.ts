import type { AuthGateway } from "@/features/auth/adapters/auth-gateway";
import type { SignupPayload, SignupResult } from "@/features/auth/entities/auth";

export class SignupUseCase {
  constructor(private readonly gateway: AuthGateway) {}

  execute(payload: SignupPayload): Promise<SignupResult> {
    return this.gateway.signup(payload);
  }
}
