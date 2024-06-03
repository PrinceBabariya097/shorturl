import { Router } from "express";
import { generateNewShortURL, getAnalytics, redirectToURL } from "../controller/url.js";
import { isUserValid } from "../middelware/auth.js";

export const urlrouter = Router()

urlrouter.route('/').post(isUserValid,generateNewShortURL)
urlrouter.route('/:shorturl').get(redirectToURL)
urlrouter.route('/analytics/:shorturl').get(getAnalytics)