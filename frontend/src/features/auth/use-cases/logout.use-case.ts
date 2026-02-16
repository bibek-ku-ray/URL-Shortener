import type { TokenStorage } from "@/features/auth/adapters/token-storage";

export class LogoutUseCase {
  constructor(private readonly tokenStorage: TokenStorage) {}

  execute(): void {
    this.tokenStorage.clearToken();
  }
}
