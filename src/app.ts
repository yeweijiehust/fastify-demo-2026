import Fastify, { type FastifyInstance } from "fastify";

import envPlugin from "./plugins/env.js";
import errorHandlerPlugin from "./plugins/error-handler.js";
import notFoundPlugin from "./plugins/not-found.js";
import swaggerPlugin from "./plugins/swagger.js";
import routesPlugin from "./routes/index.js";

export function buildApp(): FastifyInstance {
  const app = Fastify({
    logger: {
      level: process.env.LOG_LEVEL ?? "info",
    },
  });

  app.register(envPlugin);
  app.register(swaggerPlugin);
  app.register(errorHandlerPlugin);
  app.register(notFoundPlugin);
  app.register(routesPlugin);

  return app;
}
