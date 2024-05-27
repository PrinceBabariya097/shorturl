import { Router } from "express";
import { generateNewShortURL, getAnalytics, redirectToURL } from "../middelware/url.js";

export const router = Router()

router.route('/').post(generateNewShortURL)
router.route('/:shorturl').get(redirectToURL)
router.route('/analytics/:shorturl').get(getAnalytics)