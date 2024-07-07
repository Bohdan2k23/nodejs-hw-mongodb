import createHttpError from "http-errors";
import {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} from "../services/contacts.js";
import { Contact } from "../db/contacts.js";

const parseSortParams = (sortBy, sortOrder) => {
  if (!["asc", "desc"].includes(sortOrder)) {
    sortOrder = "asc";
  }

  if (![...Object.keys(Contact.schema.obj), "createdAt", "updatedAt"].includes(sortBy)) {
    sortBy = "_id";
  }

  return { sortBy, sortOrder };
};

export const getContactsController = async (req, res, next) => {
  const page = Number(req.query.page) || 1;
  const perPage = Number(req.query.perPage) || 10;

  const { sortBy, sortOrder } = parseSortParams(req.query.sortBy, req.query.sortOrder);

  const data = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  if (!data || !data.data.length) {
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
