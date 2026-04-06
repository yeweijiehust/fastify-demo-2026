export const envSchema = {
  type: "object",
  required: [
    "NODE_ENV",
    "HOST",
    "PORT",
    "LOG_LEVEL",
    "APP_NAME",
    "APP_VERSION",
  ],
  properties: {
    NODE_ENV: {
      type: "string",
      default: "development",
    },
    HOST: {
      type: "string",
      default: "0.0.0.0",
    },
    PORT: {
      type: "number",
      default: 3000,
    },
    LOG_LEVEL: {
      type: "string",
      default: "info",
    },
    APP_NAME: {
      type: "string",
      default: "fastify-latest-demo",
    },
    APP_VERSION: {
      type: "string",
      default: "0.1.0",
    },
  },
} as const;

export interface AppConfig {
  NODE_ENV: string;
  HOST: string;
  PORT: number;
  LOG_LEVEL: string;
  APP_NAME: string;
  APP_VERSION: string;
}
