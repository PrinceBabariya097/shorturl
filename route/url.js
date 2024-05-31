import { Router } from "express";
import { generateNewShortURL, getAnalytics, redirectToURL } from "../controller/url.js";
import { getUserId } from "../middelware/auth.js";

export const urlrouter = Router()

urlrouter.route('/').post(getUserId,generateNewShortURL)
urlrouter.route('/:shorturl').get(redirectToURL)
urlrouter.route('/analytics/:shorturl').get(getAnalytics)