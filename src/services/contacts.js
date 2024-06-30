import { Contact } from "../db/contacts.js";

export const getAllContacts = async () => {
  try {
    return await Contact.find();
  } catch (error) {
    return null;
  }
};

export const getContactById = async (id) => {
  try {
    return await Contact.findById(id);
  } catch (error) {
    return null;
  }
};
export const createContact = async (payload) => {
  try {
    return await Contact.create(payload);
  } catch (error) {
    return null;
  }
};

export const updateContact = async (_id, payload, options = {}) => {
  try {
    const rawResult = await Contact.findOneAndUpdate({ _id }, payload, {
      new: true,
      includeResultMetadata: true,
      ...options,
    });

    if (!rawResult || !rawResult.value) return null;

    return {
      contact: rawResult.value,
      isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
  } catch (error) {
    return null;
  }
};

export const deleteContact = async (_id) => {
  try {
    return await Contact.findOneAndDelete({ _id });
  } catch (error) {
    return null;
  }
};
