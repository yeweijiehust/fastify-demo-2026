import { buildApp } from "./app.js";
import { closeServer, startServer } from "./server.js";

const app = buildApp();

const shutdown = async (signal: NodeJS.Signals) => {
  app.log.info({ signal }, "shutting down");
  await closeServer(app);
  process.exit(0);
};

process.once("SIGINT", () => {
  void shutdown("SIGINT");
});

process.once("SIGTERM", () => {
  void shutdown("SIGTERM");
});

startServer(app).catch((error: unknown) => {
  app.log.error(error, "failed to start server");
  process.exit(1);
});
