import type { TokenStorage } from "@/features/auth/adapters/token-storage";

export class RestoreSessionUseCase {
  constructor(private readonly tokenStorage: TokenStorage) {}

  execute(): string | null {
    return this.tokenStorage.getToken();
  }
}
