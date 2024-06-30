import express from "express";
import pino from "pino-http";
import cors from "cors";
import { configDotenv } from "dotenv";
import { contactRouter } from "./routers/contacts.js";
import { env } from "./utils/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";

configDotenv();

const PORT = env("PORT", 3000);

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: "pino-pretty",
      },
    })
  );

  app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  });

  app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });

  app.use("/contacts", contactRouter);

  app.use("*", notFoundHandler);

  app.use("*", (err, req, res) => {
    res.status(500).json({ message: err.message });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

  app.use(errorHandler);

  return app;
}
