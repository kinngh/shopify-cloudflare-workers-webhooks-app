import { json } from "itty-router";
import shopify from "../utils/shopify.js";

/**
 * Validate incoming middleware requests
 * @param {import ("itty-router").IRequest} request - The request object.
 *
 */
const verifyWebhook = async (request) => {
  let response = new Response();
  const requestBody = await request.text();

  const webhookValidation = await shopify.webhooks.validate({
    rawBody: requestBody,
    rawRequest: request,
    rawResponse: response,
  });

  if (!webhookValidation.valid) {
    console.error(`Webhook validation failed:`, webhookValidation?.reason);
    return json({ error: "Invalid webhook" }, { status: 401 });
  }

  const { topic, domain, apiVersion, webhookId } = webhookValidation;
  request.webhook_data = {
    topic,
    domain,
    apiVersion,
    webhookId,
  };
};

export default verifyWebhook;
