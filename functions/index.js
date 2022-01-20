const handler = require('./handler')

function handleOptions(request) {
  // Make sure the necessary headers are present
  // for this to be a valid pre-flight request
  let headers = request.headers
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    let respHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS',
      'Access-Control-Max-Age': '86400',
      // Allow all future content Request headers to go back to browser
      // such as Authorization (Bearer) or X-Client-Name-Version
      'Access-Control-Allow-Headers': request.headers.get(
        'Access-Control-Request-Headers'
      )
    }
    return new Response(null, {
      headers: respHeaders
    })
  } else {
    // Handle standard OPTIONS request.
    // If you want to allow other HTTP Methods, you can do that here.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, POST, OPTIONS'
      }
    })
  }
}
async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return handleOptions(request)
  } else {
    const body = await readRequestBody(request)
    const result = await handler(body)
    return new Response(JSON.stringify(result), {
      headers: {
        'content-type': 'application/json;charset=UTF-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,OPTIONS'
      }
    })
  }
}
addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      (err) => new Response(err.stack, { status: 500 })
    )
  )
})

async function readRequestBody(request) {
  const { headers } = request
  const contentType = headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return await request.json()
  }
}
