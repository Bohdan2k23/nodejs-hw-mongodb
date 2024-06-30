import express from "express";
import {
  createContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  deleteContactController,
} from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router = express.Router();

router.get("/", ctrlWrapper(getContactsController));

router.get("/:id", ctrlWrapper(getContactByIdController));

router.post("/", ctrlWrapper(createContactController));

router.patch("/:id", ctrlWrapper(patchContactController));

router.delete("/:id", ctrlWrapper(deleteContactController));

export const contactRouter = router;
