module.exports = {
  axios: (json) => `
const axios = require('axios')

const body = ${json}

axios
  .post('https://api.toaster.dev', body)
  .then((res) => console.log(res.data))
`,
  jquery: (json) => `
  const body = ${json}

  $.ajax({
  type: "POST",
  url: 'https://api.toaster.dev',
  data: body
}).done(( res ) => {
    console.log(res)
  })
  `,
  superagent: (json) => `
  const superagent = require('superagent')

  const body = ${json}

  superagent.post('/user')
    .set('Content-Type', 'application/json')
    .send(body)
    .end((err, res) => {
    console.log(res)
  })
  `,
  request: (json) => `
var request = require('request')

const body = {
data: ${json}}

request.post( 'https://api.toaster.dev', {json: body},
    (error, res, body) => {
        console.log(body)
    }
)
`,
  got: (json) => `
const got = require('got')

const body = ${json}

got
  .post('https://api.toaster.dev', {json:body})
  .then((res) => console.log(res.data))
`,
  cURL: (json) =>
    `curl --request POST 'https://api.toaster.dev' --header 'Content-Type: application/json' --data-raw '${json}'`
}
