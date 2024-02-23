# Setup

- [ ] Run `npm install` to install all dependencies.
- [ ] Rename `wrangler.toml.example` file to `wrangler.toml` and fill in the details
- [ ] Create a Cloudflare Workers account at `https://workers.cloudflare.com`
- [ ] Run `npm run w:login` to log in to your Workers account.
- [ ] Setup your `wrangler.toml` file:
  - `name = "worker-name"` : Name of the worker to deploy to. Current routes are overwritten so please make sure you're deploying to the right worker or you will probably loose all your work.
  - `compatibility_date = "YYYY-MM-DD"` : CF Workers will use the instance as of this date to run your code. Better to leave it to the day you start working on your project.
  - `main = "src/index.js"` : Entry point.
- [ ] Create routes with `itty-router`.
  - Don't delete the routes starting with `//MARK:- DON'T DELETE`.
- [ ] Prisma needs to run in an edge runtime, either run `npx prisma generate --no-engine` or `npm run db:generate`.
  - Running `npx prisma generate` will yield in Cloudflare Workers runtime errors, or similar.
- [ ] Run `npm run publish` to deploy code to Workers.
  - There are no traditional build steps.

## Additional Notes:

- Wrangler `3.15.0` breaks `console.log()`, among other baseline features in localmode.
