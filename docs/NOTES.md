# Notes

- I prefer keeping `APP_UNINSTALLED` and `APP_SUBSCRIPTIONS_UPDATE` in Shopify app specifically, and offloading all high load webhooks to Cloudflare Workers.
- You might end up using a data connection pooler, since using this method offloads the bottleneck from CPU processing power to your database. If you want to stick to Prisma, you can use [Prisma Accelerate](https://www.prisma.io/data-platform/accelerate) for connection pooling and faster response times.
  - I hate using yet another service but this is a necessity at any level of scaling. [Planetscale](https://planetscale.com), my preferred db provider gives 1,000 connections on free plan and 10,000 connections on the Pro plan. This means I can process 1,000 - 10,000 requests at any instance, but there have been times in Q4 where this gets a lot, and spending money on Prisma Accelerate is totally worth it.
