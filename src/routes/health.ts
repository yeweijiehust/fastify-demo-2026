import type { FastifyPluginAsync } from "fastify";

import { createSuccessResponseSchema } from "../schemas/response.js";

const healthRoute: FastifyPluginAsync = async (app) => {
  app.get(
    "/health",
    {
      schema: {
        summary: "Liveness probe",
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
          status: "ok",
        },
      };
    },
  );
};

export default healthRoute;
