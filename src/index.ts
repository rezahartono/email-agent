import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { SendEmailHandler } from './handlers/contact.handler.js'

const app = new Hono()

app.use("/*", cors({
  origin: ["*"],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}))
app.get('/', (c) => {
  return c.json({
    message: "Email Agent has been started!"
  })
})

app.post("/send-email", SendEmailHandler)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
