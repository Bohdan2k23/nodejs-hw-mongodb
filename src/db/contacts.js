import { model, Schema } from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      optional: true,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      default: "personal",
      enum: ["work", "home", "personal"],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Contact = model("contacts", ContactSchema);
