# Integration

Integrating this comes in three steps. Before you run any of this, ensure your local dev servers for both Cloudflare Workers and your Shopify app are running, but don't run Ngrok just yet.

## NGROK

This is assuming you're running on Ngrok's free plan and you're using this project for your ngrok configuration.

- [ ] Grab your auth token from `ngrok.com`
- [ ] Rename `ngrok.yml.example` to `ngrok.yml` and fill in your authtoken. `ngrok.yml` is added to `.gitignore` so you don't have to worry about your authtokens being leaked.
  - Read more about [ngrok.yml](https://ngrok.com/docs/agent/config/)
- [ ] Find the port your Shopify app is running on, and replace the port 3000 in `shopify-app` with the port your Shopify app is running in.
- [ ] Run `npm run ngrok` and this should start an ngrok instance that gives you 2 urls: 1 for port 3000 (or the port of your `shopify-app`) and another at port 8787.
- [ ] Ensure you haven't changed any other values in the `ngrok.yml` except for your auth token and optionally, your `shopify-app` port.

## Cloudflare Workers

Now we're going to make changes in this repository.

- [ ] Rename `wrangler.toml.example` to `wrangler.toml` and fill in the `[vars]` section.
  - We're not using a `.env` file here and using wrangler configuration.
  - If you're using any of my repositories, the variables are named exactly the same, so just copy paste them in.
- [ ] Create your routes.
  - An example `/api/webhooks` route is created for you. Give each webhook it's own route, ensure you're using `verifyWebhook` middleware and process it like a regular route.
  - Prisma ORM, if you're using it, is running the Edge version and not the regular version. See `src/utils/prisma.js` for more information.
- [ ] Run `npm run dev`

## Shopify App

Now make changes to your Shopify app. This is assuming you're working with a JS based repository, but this works across the board with all other repos.

- [ ] Make a new entry in your `.env` to store your Cloudflare Workers ngrok URL
  - Assuming this is called `CLOUDFLARE_WEBHOOK_URL`
- [ ] Head in to your webhook registry and start swapping out webhook URL registries.

  - If you're using any of my repositories, it's in the `shopify.js` file.
  - You can use a combination of CF Workers and in-app webhook processing following this example:

  ```javascript
  shopify.webhooks.addHandlers({
    //Process in app
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/api/webhooks/app_uninstalled",
      callback: appUninstallHandler,
    },
    //Process in Cloudflare Workers
    PRODUCTS_CREATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: `${process.env.CLOUDFLARE_WEBHOOK_URL}/api/webhooks/products_create`,
    },
  });
  ```

- [ ] Run through auth again or make GraphQL calls to update your URLs.
  - If you're using my repo, head into Debug Cards -> Webhooks Card to confirm it's registered on Cloudflare Workers.
- [ ] Run a test by running `shopify webhook trigger` in your Terminal and sending in requests to your Cloudflare workers and app instance or a more natural way is to trigger the webhook naturally from Shopify, which based on the above example, is to create a new Product.
