import { Router } from "express";
import {
  ShortenPostRequestSchema,
  UpdateUrlRequestSchema,
} from "../validation/request.validation.js";
import { treeifyError } from "zod";
import { nanoid } from "nanoid";
import {
  createShortenUrl,
  deleteUrl,
  getAllUrls,
  getTargetUrl,
  updateUrl,
} from "../service/url.service.js";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";

const urlRouter = Router();

urlRouter.post("/shorten", ensureAuthenticated, async (req, res) => {
  const validationResult = await ShortenPostRequestSchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({
      error: treeifyError(validationResult.error),
    });
  }

  const { url, code } = validationResult.data;

  const shortCode = code ?? nanoid(7);

  const shortenUrl = await createShortenUrl(url, shortCode, req.user?.id);

  return res.status(200).json({
    id: shortenUrl.id,
    targetUrl: shortenUrl.targetUrl,
    shortCode: shortenUrl.shortCode,
    userId: shortenUrl.userId,
  });
});

urlRouter.get("/codes", ensureAuthenticated, async (req, res) => {
  const userId = req.user.id;
  const urls = await getAllUrls(userId);
  return res.status(200).json({
    data: urls,
  });
});

urlRouter.delete("/:id", ensureAuthenticated, async (req, res) => {
  const urlId = req.params.id;
  const userId = req.user.id;

  const result = await deleteUrl(urlId, userId);

  if (!result.success) {
    const statusCode = result.error.includes("not found") ? 404 : 403;
    return res.status(statusCode).json({
      error: result.error,
    });
  }

  return res.status(200).json({
    message: "Deleted successfully",
  });
});

urlRouter.patch("/:id", ensureAuthenticated, async (req, res) => {
  const urlId = req.params.id;
  const userId = req.user.id;

  // Validate request body
  const validationResult = await UpdateUrlRequestSchema.safeParseAsync(
    req.body,
  );

  if (validationResult.error) {
    return res.status(400).json({
      error: treeifyError(validationResult.error),
    });
  }

  const updateData = validationResult.data;

  // Call service to update
  const result = await updateUrl(urlId, userId, updateData);

  if (!result.success) {
    let statusCode = 400;
    if (result.error.includes("not found")) statusCode = 404;
    else if (result.error.includes("Unauthorized")) statusCode = 403;
    else if (result.error.includes("already in use")) statusCode = 409;

    return res.status(statusCode).json({
      error: result.error,
    });
  }

  return res.status(200).json({
    message: "Updated successfully",
    data: result.data,
  });
});

urlRouter.get("/:shortCode", async (req, res) => {
  const shortCode = req.params.shortCode;

  const result = await getTargetUrl(shortCode);
  console.log("result target", result);

  if (!result) {
    return res.status(404).json({
      error: "Invalid url",
    });
  }

  // `result` is a string (targetUrl). Redirect directly.
  return res.redirect(result);
});

export default urlRouter;
