import type { FastifyInstance } from "fastify";

export async function startServer(app: FastifyInstance): Promise<void> {
  await app.ready();

  await app.listen({
    host: app.config.HOST,
    port: app.config.PORT,
  });
}

export async function closeServer(app: FastifyInstance): Promise<void> {
  await app.close();
}
