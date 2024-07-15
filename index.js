import { setupServer } from "./src/server.js";
import { initMongoConnection } from "./src/db/initMongoConnection.js";

const bootstrap = async () => {
  await initMongoConnection();
  setupServer();
};

bootstrap();

export const FIFTEEN_MINUTES = 15 * 60 * 1000;
export const ONE_DAY = 24 * 60 * 60 * 1000;
