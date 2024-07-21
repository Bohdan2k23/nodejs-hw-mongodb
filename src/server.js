import express from "express";
import cors from "cors";
import { contactRouter } from "./routers/contacts.js";
import { env } from "./utils/env.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import cookieParser from "cookie-parser";
import { authRouter } from "./routers/auth.js";
import { UPLOAD_DIR } from "./constants/index.js";

const PORT = env("PORT", 3000);

export function setupServer() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  // app.use(
  //   pino({
  //     transport: {
  //       target: "pino-pretty",
  //     },
  //   })
  // );

  app.use(async (req, res, next) => {
    console.log(`--> ${req.method} ${req.url}`);
    return next();
  });

  app.use(cookieParser());

  app.use("/uploads", express.static(UPLOAD_DIR));

  app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello World!" });
  });

  app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
  });

  app.use("/contacts", contactRouter);

  app.use("/auth", authRouter);

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
