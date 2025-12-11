import express from "express";
import config from "config";
import { prisma } from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";

const app = express();
const PORT = config.get<number>("port");

app.listen(PORT, async () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
  await prisma.$connect();
  logger.info("Connected to the database!");
  routes(app);
});
