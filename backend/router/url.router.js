import { Router } from "express";
import { ShortenPostRequestSchema } from "../validation/request.validation.js";
import { treeifyError } from "zod";
import { nanoid } from "nanoid";
import { createShortenUrl } from "../service/url.service.js";
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

export default urlRouter;
