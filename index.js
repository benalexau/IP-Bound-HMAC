addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const ip = request.headers.get('CF-Connecting-IP')
  const url = new URL(request.url)
  const path  = url.pathname
  const dataToSign = ip + ":" + path

  const encoder = new TextEncoder()
  const secretKeyData = encoder.encode(SECRET)
  const key = await crypto.subtle.importKey(
    "raw",
    secretKeyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  )

  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(dataToSign))
  const base64Mac = btoa(String.fromCharCode(...new Uint8Array(mac)))

  return new Response(base64Mac)
}
