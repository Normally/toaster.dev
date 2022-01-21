# Toaster

**A free JSON placeholder API** 

Send a request to `https://api.toaster.dev` with a template schema in the body and receive a populated JSON response.

Documentation at [toaster.dev](https://toaster.dev)

## Development

This repo includes both the website and API.

[`/docs`](/docs) is a [VuePress](https://vuepress.vuejs.org/) website.

[`/api`](/api) is a single endpoint built on top of [Faker](https://github.com/faker-js/faker) and prepped for Cloudflare Workers.

If you would like to deploy this API to your own Cloudflare account:

1.  clone this repo
2. change `account_id` and `zone_id` in [`/api/wrangler.toml`](/api/wrangler.toml)
3. run `wrangler publish` from within the `/api` directory.



## About

Built by [Nic Mulvaney](https://nicmulvaney.com) at [Normally](https://normally.com). 

