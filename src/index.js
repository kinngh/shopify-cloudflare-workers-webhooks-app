import { Router, json } from "itty-router";
import verifyWebhook from "./middleware/verifyWebhook.js";
import prisma from "./utils/prisma.js";

const router = Router();

/**
 * Hello World
 *
 * @param {import ("itty-router").IRequest} request - The request object.
 * @returns {Response} - A Response object with the text value from the middleware.
 */
router.get("/", (request) => {
  return new Response("Greetings, Father. ");
});

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

/**
 * Example route to show how to use Prisma on the Edge
 *
 * @param {import ("itty-router").IRequest} request - The request object.
 * @returns {JSON} - A JSON containing shop details
 */
router.get("/api/shop/:shopname", async (request) => {
  const shop = await prisma.stores.findFirst({
    where: { shop: request.params.shopname },
  });
  if (!shop) {
    return json({ error: true, message: "Not Found" }, { status: 404 });
  }
  return json(shop);
});

// Catch unknown routes and throw a 404 and limit exceptions on workers.
router.all("*", () => new Response("404, not found!", { status: 404 }));

//Bind worker with the router
addEventListener("fetch", (e) => {
  e.respondWith(router.handle(e.request));
});
