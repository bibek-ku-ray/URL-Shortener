import type { UrlGateway } from "@/features/urls/adapters/url-gateway";
import type { ShortUrl } from "@/features/urls/entities/url";

export class ListShortUrlsUseCase {
  constructor(private readonly gateway: UrlGateway) {}

  execute(token: string): Promise<ShortUrl[]> {
    return this.gateway.list(token);
  }
}
