import { type TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsync } from "fastify";

import { createTodo, echoName, getTodoById } from "./system.service.js";
import {
  CreateTodoBodySchema,
  CreateTodoResponseSchema,
  EchoParamsSchema,
  EchoQuerySchema,
  EchoResponseSchema,
  GetTodoParamsSchema,
  GetTodoQuerySchema,
  GetTodoResponseSchema,
  TodoNotFoundResponseSchema,
} from "./system.schema.js";

const systemRoutes: FastifyPluginAsync = async (app) => {
  const typedApp = app.withTypeProvider<TypeBoxTypeProvider>();

  typedApp.get(
    "/echo/:name",
    {
      schema: {
        summary: "Echo a name with query validation",
        tags: ["system"],
        params: EchoParamsSchema,
        querystring: EchoQuerySchema,
        response: {
          200: EchoResponseSchema,
        },
      },
    },
    async (request) => {
      return {
        success: true,
        data: echoName({
          name: request.params.name,
          repeat: request.query.repeat,
          uppercase: request.query.uppercase,
        }),
      };
    },
  );

  typedApp.post(
    "/todos",
    {
      schema: {
        summary: "Create an in-memory todo",
        tags: ["system"],
        body: CreateTodoBodySchema,
        response: {
          201: CreateTodoResponseSchema,
        },
      },
    },
    async (request, reply) => {
      const todo = createTodo({
        title: request.body.title,
        priority: request.body.priority,
      });

      return reply.status(201).send({
        success: true,
        data: todo,
      });
    },
  );

  typedApp.get(
    "/todos/:id",
    {
      schema: {
        summary: "Get an in-memory todo by id",
        tags: ["system"],
        params: GetTodoParamsSchema,
        querystring: GetTodoQuerySchema,
        response: {
          200: GetTodoResponseSchema,
          404: TodoNotFoundResponseSchema,
        },
      },
    },
    async (request) => {
      const todo = getTodoById(request.params.id);

      return {
        success: true,
        data: {
          todo,
          ...(request.query.includeMeta
            ? {
                meta: {
                  includeMeta: true,
                },
              }
            : {}),
        },
      };
    },
  );
};

export default systemRoutes;
