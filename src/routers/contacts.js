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
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.use(authenticate);

router.get("/", ctrlWrapper(getContactsController));

router.get("/:id", ctrlWrapper(getContactByIdController));

router.post(
  "/",
  upload.single("photo"),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController)
);

router.patch(
  "/:id",
  upload.single("photo"),
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController)
);

router.delete("/:id", ctrlWrapper(deleteContactController));

export const contactRouter = router;
