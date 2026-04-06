import swagger from "@fastify/swagger";
import swaggerUi from "@fastify/swagger-ui";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

const swaggerPlugin: FastifyPluginAsync = async (app) => {
  await app.register(swagger, {
    openapi: {
      info: {
        title: app.config.APP_NAME,
        version: app.config.APP_VERSION,
      },
      openapi: "3.1.0",
    },
  });

  await app.register(swaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  });
};

export default fp(swaggerPlugin, {
  name: "swagger",
});
