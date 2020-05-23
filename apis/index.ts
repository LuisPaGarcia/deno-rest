// Import the oak utils for app and router
import { Application, Router } from 'https://deno.land/x/oak/mod.ts'
import { green, red, yellow, blue } from 'https://deno.land/std/fmt/colors.ts'
interface colorsByMethod {
  GET: Function
  POST: Function
  PUT: Function
  DELETE: Function
}

type MethodTypes = 'GET' | 'POST' | 'PUT' | 'DELETE'

// Reusable function for post, put, delete
const fn = async (ctx: any) => {
  const result = await ctx.request.body()
  // result.type; "json"
  // result.value; { object: "sended" }
  ctx.response.body = {
    objectRecived: result.value,
  }
}

// Let use the env parameters
const env = Deno.env.toObject()
const PORT = env.PORT || 8000
const HOST = env.HOST || 'localhost'

// Start instances of app and router
const app = new Application()
const router = new Router()
const response = { key: 'value' }

// Log in console all interactions
app.use(async (ctx, next) => {
  await next()
  const rt = ctx.response.headers.get('X-Response-Time')
  const method = ctx.request.method.toString()
  let log = ''
  const color: colorsByMethod = {
    GET: green,
    POST: yellow,
    PUT: blue,
    DELETE: red,
  }
  switch (method) {
    case 'GET':
      log = `${color.GET(method)} ${ctx.request.url} - ${rt}`
      break
    case 'POST':
      log = `${color.POST(method)} ${ctx.request.url} - ${rt}`
      break
    case 'PUT':
      log = `${color.PUT(method)} ${ctx.request.url} - ${rt}`
      break
    case 'DELETE':
      log = `${color.DELETE(method)} ${ctx.request.url} - ${rt}`
      break
    default:
      break
  }
  console.log(log)
})
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.response.headers.set('X-Response-Time', `${ms}ms`)
})

// get
router.get('/api/get', (ctx) => {
  ctx.response.body = response
})

// post
router.post('/api/post', fn)

// put
router.put('/api/put', fn)

// delete
router.delete('/api/delete', fn)

// Append the router
app.use(router.routes())
app.use(router.allowedMethods())

// Start app
const HOST_PORT = `${HOST}:${PORT}`
console.log(`Listen on ${HOST_PORT}`)
app.listen(HOST_PORT)
