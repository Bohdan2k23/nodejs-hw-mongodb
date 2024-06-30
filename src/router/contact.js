import express from "express";
import { getAllContacts, getContactById } from "../services/contacts.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await getAllContacts();

    if (data.length) {
      res.status(200).json({ status: 200, messege: "Successfully found contacts!", data });
    } else {
      res.status(404).json({ status: 404, message: "No one contact", data });
    }
  } catch (error) {
    res.status(404).json({ status: 404, message: "Something went wrong", data: null });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await getContactById(id);
    if (!data) throw new Error();

    res
      .status(200)
      .json({ status: 200, messege: `Successfully found contact with id ${id}!`, data });
  } catch (error) {
    res.status(404).json({ status: 404, message: "Contact not found", data: null });
  }
});

export const contactRouter = router;
