import fp from "fastify-plugin";
import type { FastifyPluginAsync } from "fastify";

import { AppError } from "../core/errors/app-error.js";

interface FastifyLikeError {
  code?: string;
  message: string;
  statusCode?: number;
  validation?: unknown;
}

const errorHandlerPlugin: FastifyPluginAsync = async (app) => {
  app.setSchemaErrorFormatter((errors, dataVar) => {
    const details = errors.map((error) => `${dataVar}${error.instancePath} ${error.message}`).join("; ");
    const error = new Error(details || "Invalid request");

    return Object.assign(error, {
      statusCode: 400,
    });
  });

  app.setErrorHandler((error, request, reply) => {
    request.log.error(error, "request failed");

    const normalizedError = error as FastifyLikeError;
    const statusCode =
      error instanceof AppError
        ? error.statusCode
        : typeof normalizedError.statusCode === "number" && normalizedError.statusCode >= 400
        ? normalizedError.statusCode
        : normalizedError.validation !== undefined
          ? 400
          : 500;
    const message = statusCode >= 500 ? "Internal Server Error" : normalizedError.message;
    const code =
      error instanceof AppError
        ? error.code
        : statusCode >= 500
        ? "INTERNAL_SERVER_ERROR"
        : statusCode === 400
          ? "REQUEST_VALIDATION_ERROR"
          : "REQUEST_ERROR";

    reply.status(statusCode).send({
      success: false,
      error: {
        code,
        message,
      },
    });
  });
};

export default fp(errorHandlerPlugin, {
  name: "error-handler",
});
