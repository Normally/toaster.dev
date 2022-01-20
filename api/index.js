const handler = require('./handler')

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

async function readRequestBody(request) {
  const { headers } = request
  const contentType = headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return await request.json()
  }
}

async function handleRequest(request) {
  const body = await readRequestBody(request)
  const result = await handler(body)
  return new Response(JSON.stringify(result), {
    headers: {
      'content-type': 'application/json;charset=UTF-8'
    }
  })
}
