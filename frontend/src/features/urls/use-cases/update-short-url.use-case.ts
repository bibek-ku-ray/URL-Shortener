import type { UrlGateway } from "@/features/urls/adapters/url-gateway";
import type { ShortUrl, UpdateShortUrlInput } from "@/features/urls/entities/url";

export class UpdateShortUrlUseCase {
  constructor(private readonly gateway: UrlGateway) {}

  execute(id: string, input: UpdateShortUrlInput, token: string): Promise<ShortUrl> {
    return this.gateway.update(id, input, token);
  }
}
