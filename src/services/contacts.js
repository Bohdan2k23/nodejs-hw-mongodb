import { Contact } from "../db/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = "asc",
  sortBy = "_id",
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = Contact.find();
    const contactsCount = await Contact.find().merge(contactsQuery).countDocuments();

    const contacts = await contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();

    const paginationData = calculatePaginationData(contactsCount, perPage, page);

    return {
      data: contacts,
      ...paginationData,
    };
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
