import type { FastifyPluginAsync } from "fastify";

import systemRoutes from "../modules/system/system.route.js";
import healthRoute from "./health.js";
import readyRoute from "./ready.js";
import rootRoute from "./root.js";

const routesPlugin: FastifyPluginAsync = async (app) => {
  await app.register(rootRoute);
  await app.register(healthRoute);
  await app.register(readyRoute);
  await app.register(systemRoutes, {
    prefix: "/api/v1/system",
  });
};

export default routesPlugin;
