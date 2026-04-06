import { Type } from "@sinclair/typebox";

import {
  createSuccessResponseSchema,
  errorEnvelopeSchema,
} from "../../schemas/response.js";

export const TodoPrioritySchema = Type.Union([
  Type.Literal("low"),
  Type.Literal("medium"),
  Type.Literal("high"),
]);

export const EchoParamsSchema = Type.Object({
  name: Type.String({ minLength: 1 }),
});

export const EchoQuerySchema = Type.Object({
  uppercase: Type.Optional(Type.Boolean()),
  repeat: Type.Optional(Type.Integer({ minimum: 1, maximum: 5 })),
});

export const EchoResponseSchema = createSuccessResponseSchema(
  Type.Object({
    message: Type.String(),
    repeat: Type.Integer(),
  }),
);

export const CreateTodoBodySchema = Type.Object({
  title: Type.String({ minLength: 1, maxLength: 100 }),
  priority: TodoPrioritySchema,
});

export const TodoSchema = Type.Object({
  id: Type.Integer(),
  title: Type.String(),
  priority: TodoPrioritySchema,
  createdAt: Type.String(),
});

export const CreateTodoResponseSchema = createSuccessResponseSchema(TodoSchema);

export const GetTodoParamsSchema = Type.Object({
  id: Type.Integer({ minimum: 1 }),
});

export const GetTodoQuerySchema = Type.Object({
  includeMeta: Type.Optional(Type.Boolean()),
});

export const GetTodoResponseSchema = createSuccessResponseSchema(
  Type.Object({
    todo: TodoSchema,
    meta: Type.Optional(
      Type.Object({
        includeMeta: Type.Boolean(),
      }),
    ),
  }),
);

export const TodoNotFoundResponseSchema = errorEnvelopeSchema;
