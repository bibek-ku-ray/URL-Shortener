import type {
  CreateShortUrlInput,
  ShortUrl,
  UpdateShortUrlInput,
} from "@/features/urls/entities/url";

export interface UrlGateway {
  create(input: CreateShortUrlInput, token: string): Promise<ShortUrl>;
  list(token: string): Promise<ShortUrl[]>;
  update(id: string, input: UpdateShortUrlInput, token: string): Promise<ShortUrl>;
  remove(id: string, token: string): Promise<void>;
}
