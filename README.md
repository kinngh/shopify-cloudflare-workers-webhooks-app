# Shopify Cloudflare Workers Webhooks Manager

A Cloudflare Workers instance meant to handle large amounts of webhooks from your Shopify app.

## Supporting repositories

- [`@kinngh/shopify-nextjs-prisma-app`](https://github.com/kinngh/shopify-nextjs-prisma-app): A Shopify app boilerplate built with Next.js and Prisma ORM, with deployments available on Vercel.
- [`@kinngh/shopify-node-express-mongodb-app`](https://github.com/kinngh/shopify-node-express-mongodb-app): Shopify app starter repo built with Express.js, React.js and Vite.
- [`@kinngh/shopify-polaris-playground`](https://github.com/kinngh/shopify-polaris-playground): Build your app's UI using Polaris, without an internet connection.

## Tech Stack

- Wrangler
- Itty-Router
- Prisma ORM - Edge

## Why I made this

I've been handling all webhooks, with the exception of `APP_UNINSTALLED` and `APP_SUBSCRIPTIONS_UPDATE` via Cloudflare Workers so it's easier and cheaper to handle, especially when working with Shopify Plus merchants. Using Cloudflare Workers ensures things run smoothly from an engineering and financial perspective.

## Notes

- Refer to [SETUP](/docs/SETUP.md)

---

[![How To Build Shopify Apps Course](https://raw.githubusercontent.com/kinngh/extras/main/csa_promo.png)](https://kinngh.gumroad.com/l/how-to-make-shopify-apps)
