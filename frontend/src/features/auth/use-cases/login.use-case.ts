import type { AuthGateway } from "@/features/auth/adapters/auth-gateway";
import type { TokenStorage } from "@/features/auth/adapters/token-storage";
import type { LoginCredentials } from "@/features/auth/entities/auth";

export class LoginUseCase {
  constructor(
    private readonly gateway: AuthGateway,
    private readonly tokenStorage: TokenStorage,
  ) {}

  async execute(credentials: LoginCredentials): Promise<string> {
    const response = await this.gateway.login(credentials);
    this.tokenStorage.setToken(response.token);
    return response.token;
  }
}
