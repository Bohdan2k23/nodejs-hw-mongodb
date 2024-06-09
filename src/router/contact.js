import express from "express";
import { getAllContacts, getContactById } from "../services/contacts.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const data = await getAllContacts();

  if (data.length) {
    res.status(200).json({ status: 200, messege: "Successfully found contacts!", data });
  } else {
    res.status(404).json({ status: 404, message: "No contacts found", data });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const data = await getContactById(id);

  if (data) {
    res
      .status(200)
      .json({ status: 200, messege: `Successfully found contact with id ${id}!`, data });
  } else {
    res.status(404).json({ status: 404, message: "Contact not found", data });
  }
});

export const contactRouter = router;
