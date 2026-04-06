import fastifyEnv from "@fastify/env";
import type { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

import { envSchema } from "../config/env.js";

const envPlugin: FastifyPluginAsync = async (app) => {
  await app.register(fastifyEnv, {
    confKey: "config",
    dotenv: false,
    schema: envSchema,
  });
};

export default fp(envPlugin, {
  name: "env",
});
