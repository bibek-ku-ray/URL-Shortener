export interface ShortUrl {
  id: string;
  targetUrl: string;
  shortCode: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateShortUrlInput {
  url: string;
  code?: string;
}

export interface UpdateShortUrlInput {
  targetUrl?: string;
  shortCode?: string;
}
