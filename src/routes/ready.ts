import type { FastifyPluginAsync } from "fastify";

import { createSuccessResponseSchema } from "../schemas/response.js";

const readyRoute: FastifyPluginAsync = async (app) => {
  app.get(
    "/ready",
    {
      schema: {
        summary: "Readiness probe",
        tags: ["system"],
        response: {
          200: createSuccessResponseSchema({
            type: "object",
            properties: {
              status: { type: "string" },
            },
            required: ["status"],
          }),
        },
      },
    },
    async () => {
      return {
        success: true,
        data: {
          status: "ready",
        },
      };
    },
  );
};

export default readyRoute;
