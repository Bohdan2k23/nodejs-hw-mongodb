import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3).max(20),
  email: Joi.string().email().min(3).max(20).optional(),
  phoneNumber: Joi.string().required().min(3).max(20),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid("home", "work", "personal").optional(),
  photo: Joi.custom((value) => value instanceof Blob).optional(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().optional().min(3).max(20),
  email: Joi.string().email().optional().min(3).max(20),
  phoneNumber: Joi.string().optional().min(3).max(20),
  isFavourite: Joi.boolean().optional(),
  contactType: Joi.string().valid("home", "work", "personal").optional(),
  photo: Joi.custom((value) => value instanceof Blob).optional(),
});
