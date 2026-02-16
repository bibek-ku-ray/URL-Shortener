import type { UrlGateway } from "@/features/urls/adapters/url-gateway";

export class DeleteShortUrlUseCase {
  constructor(private readonly gateway: UrlGateway) {}

  execute(id: string, token: string): Promise<void> {
    return this.gateway.remove(id, token);
  }
}
