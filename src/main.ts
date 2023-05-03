import Fastify from 'fastify';
import { onShutdown } from 'node-graceful-shutdown';
import { util } from '@nx-node/util';
import { app } from './app/app';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

let foo = -1;

function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

onShutdown('database', async function() {
  console.log('cleaning up');
  await delay(3000);
  console.log('done');

});

// Artificial delay.
delay(3000).then(() => {
  // Instantiate Fastify with some config
  const server = Fastify({
    logger: true,
  });

  // Register your application as a normal plugin.
  server.register(app);


  server.get(
    '/foo',
    async function() {
      return { message: util() + foo };
    }
  );

  // Start listening.
  server.listen({ port, host }, (err) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    } else {
      console.log(`[ ready ] http://${host}:${port}`);
    }
  });
});
