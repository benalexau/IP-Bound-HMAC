# IP-Bound-HMAC

A [Cloudflare Worker](https://workers.cloudflare.com/) that returns a SHA-256
HMAC based on requestor IP address and provided URL path.

In effect this allows a client to make a HTTP GET request and receive a Base64
response which can be used for purposes such as unsealing a local key store.

# Deployment

1. Sign up for a Cloudflare Account and create a zone
2. Add a DNS A record for `ip-bound-hmac.YOUR-DOMAIN` to `192.0.2.1`
3. Install [Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update)
4. Configure with `wrangler login`
5. Clone this repository
6. Rename `wrangler.yaml.example` to `wrangler.yaml` and adjust to your domain
7. Create a secret using `wrangler secret put SECRET`
8. Deploy using `wrangler publish`

# Usage

Simply request `http://ip-bound-hmac.YOUR-DOMAIN/any-path` and you will receive
back a SHA-256 HMAC specific to that path, IP address and worker SECRET.
