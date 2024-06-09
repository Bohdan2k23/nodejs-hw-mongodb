import { Contact } from "../db/contacts.js";

export const getAllContacts = async () => {
  return await Contact.find();
};

export const getContactById = async (id) => {
  return await Contact.findById(id);
};
