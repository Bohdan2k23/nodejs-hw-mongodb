import { Router } from "express";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import {
  registerUserSchema,
  resetPasswordSchema,
  sendResetEmailSchema,
} from "../validations/auth.js";
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  resetPasswordController,
  sendResetEmailController,
} from "../controllers/auth.js";
import { validateBody } from "../middlewares/validateBody.js";
import { loginUserSchema } from "../validations/auth.js";

const router = Router();

router.post("/register", validateBody(registerUserSchema), ctrlWrapper(registerUserController));

router.post("/login", validateBody(loginUserSchema), ctrlWrapper(loginUserController));

router.post("/refresh", ctrlWrapper(refreshUserSessionController));

router.post("/logout", ctrlWrapper(logoutUserController));

router.post(
  "/send-reset-email",
  validateBody(sendResetEmailSchema),
  ctrlWrapper(sendResetEmailController)
);

router.post("/reset-pwd", validateBody(resetPasswordSchema), ctrlWrapper(resetPasswordController));

export const authRouter = router;
