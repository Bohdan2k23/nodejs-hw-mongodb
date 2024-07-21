import { configDotenv } from "dotenv";

configDotenv();

export function env(key, defoult) {
  return process.env[key] || defoult;
}
