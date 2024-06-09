import express from "express";
import pino from "pino-http";
import cors from "cors";
// import { env } from "./utils/env.js";
// import contactsRouter from "./routers/contacts.js";
import { configDotenv } from "dotenv";
import { contactRouter } from "./router/contact.js";

configDotenv();

const PORT = process.env.PORT || 3000;

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

  app.use("*", (req, res) => {
    res.status(404).json({ message: "Not found" });
  });

  app.use("*", (err, req, res) => {
    res.status(500).json({ message: err.message });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  });

  return app;
}
