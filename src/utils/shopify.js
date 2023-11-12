import { shopifyApi } from "@shopify/shopify-api";
import "@shopify/shopify-api/adapters/cf-worker";

// Setup Shopify configuration
// The values here come from `./wrangler.toml` file. Ignore your IDE saying it's `undefined`.
const shopify = shopifyApi({
  apiKey: SHOPIFY_API_KEY,
  apiSecretKey: SHOPIFY_API_SECRET,
  scopes: SHOPIFY_API_SCOPES,
  hostName: SHOPIFY_APP_URL.replace(/https:\/\//, ""),
  hostScheme: "https",
  apiVersion: SHOPIFY_API_VERSION,
  isEmbeddedApp: true,
  logger: 1, //Error = 0,Warning = 1,Info = 2,Debug = 3
});

export default shopify;
