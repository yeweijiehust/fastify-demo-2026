import type { FastifyPluginAsync } from "fastify";

import { createSuccessResponseSchema } from "../schemas/response.js";

const rootRoute: FastifyPluginAsync = async (app) => {
  app.get(
    "/",
    {
      schema: {
        summary: "Get app metadata",
        tags: ["system"],
        response: {
          200: createSuccessResponseSchema({
            type: "object",
            properties: {
              name: { type: "string" },
              version: { type: "string" },
            },
            required: ["name", "version"],
          }),
        },
      },
    },
    async () => {
      return {
        success: true,
        data: {
          name: app.config.APP_NAME,
          version: app.config.APP_VERSION,
        },
      };
    },
  );
};

export default rootRoute;
