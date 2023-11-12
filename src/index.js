import { Router } from "itty-router";
import verifyWebhook from "./middleware/verifyWebhook.js";

const router = Router();

/**
 * Handles the POST request for the "/api/webhooks" route.
 * This route uses the 'verifyWebhook' to verify incoming webhooks requests.
 *
 * @param {import ("itty-router").IRequest} request - The request object modified by the exampleMiddleware.
 * @returns {Response} - A Response object with the text value from the middleware.
 */
router.post("/api/webhooks/", verifyWebhook, (request) => {
  console.log(request.webhook_data);
  return new Response("Got through");
});

// Catch unknown routes and throw a 404 and limit exceptions on workers.
router.all("*", () => new Response("404, not found!", { status: 404 }));

//Bind worker with the router
addEventListener("fetch", (e) => {
  e.respondWith(router.handle(e.request));
});
