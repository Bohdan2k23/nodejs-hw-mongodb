import express from "express";
import {
  createContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  deleteContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, updateContactSchema } from "../validations/contacts.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = express.Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getContactsController));

router.get("/:id", ctrlWrapper(getContactByIdController));

router.post("/", validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch("/:id", validateBody(updateContactSchema), ctrlWrapper(patchContactController));

router.delete("/:id", ctrlWrapper(deleteContactController));

export const contactRouter = router;
