// Require the framework and instantiate it
const fastify = require('fastify')({logger: true});
// Require external modules
const mongoose = require('mongoose');
const routes = require('./routes');

routes.forEach((route, index) => {
  fastify.route(route);
 })

// Connect to DB
mongoose.connect('mongodb://mongodb/b64', { useNewUrlParser: true })
.then(() => console.log('MongoDB connected!'))
.catch(err => console.log(err))

fastify.register(require('fastify-cors'), { origin: true})

// Declare a route
fastify.get('/', async (request, reply) => {
  // If you pass a string to send without a Content-Type, it will be sent as text/plain; charset=utf-8.
  reply.send("hello world");
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3600, '0.0.0.0')
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};

start();