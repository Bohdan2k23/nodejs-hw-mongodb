import createHttpError from "http-errors";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from "../services/contacts.js";

export const getContactsController = async (req, res, next) => {
  const data = await getAllContacts();

  if (!data.length) {
    next(createHttpError(404, "No one contact"));
    return;
  }

  res.status(200).json({ status: 200, messege: "Successfully found contacts!", data });
};
export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const data = await getContactById(id);

  if (!data) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.status(200).json({ status: 200, messege: `Successfully found contact with id ${id}!`, data });
};
export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created a new contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body);

  if (!result) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};
export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;

  const contact = await deleteContact(id);

  if (!contact) {
    next(createHttpError(404, "Contact not found"));
    return;
  }

  res.status(204).send();
};
