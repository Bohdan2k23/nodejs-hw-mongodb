import { Contact } from "../db/contacts.js";
import { calculatePaginationData } from "../utils/calculatePaginationData.js";

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = "asc",
  sortBy = "_id",
  userId = null,
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = Contact.find({ userId });
    const contactsCount = await Contact.countDocuments({ userId });

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
    console.error(error);
    return null;
  }
};

export const getContactById = async (_id, userId) => {
  try {
    return await Contact.findOne({ _id, userId });
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const createContact = async (payload) => {
  try {
    return await Contact.create(payload);
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const updateContact = async (_id, payload, userId, options = {}) => {
  try {
    const rawResult = await Contact.findOneAndUpdate({ _id, userId }, payload, {
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
    console.error(error);
    return null;
  }
};

export const deleteContact = async (_id, userId) => {
  try {
    return await Contact.findOneAndDelete({ _id, userId });
  } catch (error) {
    console.error(error);
    return null;
  }
};
