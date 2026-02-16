import { and, eq } from "drizzle-orm";
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
      userId: urlsTable.userId,
    });

  return shortenUrl;
}

export async function getTargetUrl(code) {
  const [result] = await db
    .select({
      targetUrl: urlsTable.targetUrl,
    })
    .from(urlsTable)
    .where(eq(urlsTable.shortCode, code));

  // return the targetUrl string (or undefined) so callers can redirect directly
  return result?.targetUrl;
}

export async function getAllUrls(userId) {
  const urls = await db
    .select({
      id: urlsTable.id,
      targetUrl: urlsTable.targetUrl,
      url: urlsTable.shortCode,
    })
    .from(urlsTable)
    .where(eq(urlsTable.userId, userId));

  return urls;
}

export async function deleteUrl(urlId, userId) {
  // First check if the URL exists and belongs to the user
  const [existingUrl] = await db
    .select({
      id: urlsTable.id,
      userId: urlsTable.userId,
    })
    .from(urlsTable)
    .where(eq(urlsTable.id, urlId));

  if (!existingUrl) {
    return { success: false, error: "URL not found" };
  }

  if (existingUrl.userId !== userId) {
    return {
      success: false,
      error: "Unauthorized: You can only delete your own URLs",
    };
  }

  // Delete the URL
  await db
    .delete(urlsTable)
    .where(and(eq(urlsTable.userId, userId), eq(urlsTable.id, urlId)));

  return { success: true };
}

export async function updateUrl(urlId, userId, updateData) {
  // First check if the URL exists and belongs to the user
  const [existingUrl] = await db
    .select({
      id: urlsTable.id,
      userId: urlsTable.userId,
      shortCode: urlsTable.shortCode,
    })
    .from(urlsTable)
    .where(eq(urlsTable.id, urlId));

  if (!existingUrl) {
    return { success: false, error: "URL not found" };
  }

  if (existingUrl.userId !== userId) {
    return {
      success: false,
      error: "Unauthorized: You can only update your own URLs",
    };
  }

  // If updating shortCode, check if it's already taken by another URL
  if (updateData.shortCode && updateData.shortCode !== existingUrl.shortCode) {
    const [codeExists] = await db
      .select({ id: urlsTable.id })
      .from(urlsTable)
      .where(eq(urlsTable.shortCode, updateData.shortCode));

    if (codeExists) {
      return {
        success: false,
        error: "Short code already in use",
      };
    }
  }

  // Update the URL
  const [updatedUrl] = await db
    .update(urlsTable)
    .set(updateData)
    .where(and(eq(urlsTable.id, urlId), eq(urlsTable.userId, userId)))
    .returning({
      id: urlsTable.id,
      targetUrl: urlsTable.targetUrl,
      shortCode: urlsTable.shortCode,
      userId: urlsTable.userId,
    });

  return { success: true, data: updatedUrl };
}
