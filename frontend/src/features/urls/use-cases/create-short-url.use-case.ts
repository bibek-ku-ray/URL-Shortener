import type { UrlGateway } from "@/features/urls/adapters/url-gateway";
import type { CreateShortUrlInput, ShortUrl } from "@/features/urls/entities/url";

export class CreateShortUrlUseCase {
  constructor(private readonly gateway: UrlGateway) {}

  execute(input: CreateShortUrlInput, token: string): Promise<ShortUrl> {
    return this.gateway.create(input, token);
  }
}
