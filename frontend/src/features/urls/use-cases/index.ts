import { httpClient } from "@/lib/api/http-client";
import { UrlApiAdapter } from "@/features/urls/adapters/url-api.adapter";
import { CreateShortUrlUseCase } from "@/features/urls/use-cases/create-short-url.use-case";
import { DeleteShortUrlUseCase } from "@/features/urls/use-cases/delete-short-url.use-case";
import { ListShortUrlsUseCase } from "@/features/urls/use-cases/list-short-urls.use-case";
import { UpdateShortUrlUseCase } from "@/features/urls/use-cases/update-short-url.use-case";

const urlGateway = new UrlApiAdapter(httpClient);

export const createShortUrlUseCase = new CreateShortUrlUseCase(urlGateway);
export const listShortUrlsUseCase = new ListShortUrlsUseCase(urlGateway);
export const updateShortUrlUseCase = new UpdateShortUrlUseCase(urlGateway);
export const deleteShortUrlUseCase = new DeleteShortUrlUseCase(urlGateway);
