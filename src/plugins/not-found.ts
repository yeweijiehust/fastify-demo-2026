import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";

const notFoundPlugin: FastifyPluginAsync = async (app) => {
  app.setNotFoundHandler((request, reply) => {
    request.log.warn({ url: request.url }, "route not found");

    reply.status(404).send({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
      },
    });
  });
};

export default fp(notFoundPlugin, {
  name: "not-found",
});
