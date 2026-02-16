import db from "../src/db/index.js";
import { urlsTable } from "../src/db/models/url.model.js";

export async function createShortenUrl(url, code, userId) {
  const [shortenUrl] = await db
    .insert(urlsTable)
    .values({
    targetUrl: url,
    shortCode: code,
    userId,
  })
  .returning({
    id: urlsTable.id,
    targetUrl: urlsTable.targetUrl,
    shortCode: urlsTable.shortCode,
    userId: urlsTable.userId
  })

  return shortenUrl
}
