import Fastify from 'fastify';

const fastify = Fastify({
    logger: true
});

fastify.get('/', async (request, reply) => {
    return { hello: 'world' };
});

fastify.get('/users/:id', async (request, reply) => {
    const { id } = request.params;
    return { id, name: `User ${id}` };
});

fastify.post('/users', async (request, reply) => {
    const { name, email } = request.body;
    return { id: 1, name, email };
});

const start = async () => {
    try {
        await fastify.listen({ port: 3000 });
        console.log('Server running on http://localhost:3000');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();