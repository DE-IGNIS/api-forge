import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
    return c.json({ message: 'Hello from Hono!' })
})

app.get('/users/:id', (c) => {
    const id = c.req.param('id')
    return c.json({ userId: id, name: 'John Doe' })
})

app.post('/users', async (c) => {
    const body = await c.req.json()
    return c.json({ success: true, data: body }, 201)
})

app.use('*', async (c, next) => {
    console.log(`${c.req.method} ${c.req.url}`)
    await next()
})

app.onError((err, c) => {
    return c.json({ error: err.message }, 500)
})

app.notFound((c) => {
    return c.json({ message: 'Not Found' }, 404)
})

export default app