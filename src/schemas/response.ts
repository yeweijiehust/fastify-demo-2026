export const successEnvelopeSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
  },
  required: ["success"],
} as const;

export const errorEnvelopeSchema = {
  type: "object",
  properties: {
    success: { type: "boolean" },
    error: {
      type: "object",
      properties: {
        code: { type: "string" },
        message: { type: "string" },
      },
      required: ["code", "message"],
    },
  },
  required: ["success", "error"],
} as const;

export function createSuccessResponseSchema(dataSchema: Record<string, unknown>) {
  return {
    ...successEnvelopeSchema,
    properties: {
      ...successEnvelopeSchema.properties,
      data: dataSchema,
    },
    required: ["success", "data"],
  } as const;
}
