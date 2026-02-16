import type {
  CreateShortUrlInput,
  ShortUrl,
  UpdateShortUrlInput,
} from "@/features/urls/entities/url";
import type { UrlGateway } from "@/features/urls/adapters/url-gateway";
import type { HttpClient } from "@/lib/api/http-client";
import type { BackendMessageResponse } from "@/types/api";

interface UrlListApiResponse {
  data: Array<{
    id: string;
    targetUrl: string;
    url: string;
  }>;
}

interface UpdateApiResponse {
  message: string;
  data: ShortUrl;
}

export class UrlApiAdapter implements UrlGateway {
  constructor(private readonly client: HttpClient) {}

  create(input: CreateShortUrlInput, token: string): Promise<ShortUrl> {
    return this.client.post<ShortUrl>(
      "/shorten",
      {
        url: input.url,
        code: input.code || undefined,
      },
      token,
    );
  }

  async list(token: string): Promise<ShortUrl[]> {
    const response = await this.client.get<UrlListApiResponse>("/codes", token);

    return response.data.map((item) => ({
      id: item.id,
      targetUrl: item.targetUrl,
      shortCode: item.url,
      userId: "",
    }));
  }

  async update(
    id: string,
    input: UpdateShortUrlInput,
    token: string,
  ): Promise<ShortUrl> {
    const response = await this.client.patch<UpdateApiResponse>(
      `/${id}`,
      {
        targetUrl: input.targetUrl || undefined,
        shortCode: input.shortCode || undefined,
      },
      token,
    );

    return response.data;
  }

  async remove(id: string, token: string): Promise<void> {
    await this.client.delete<BackendMessageResponse>(`/${id}`, token);
  }
}
