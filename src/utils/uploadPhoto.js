import { env } from "./env.js";
import { saveFileToCloudinary } from "./saveFileToCloudinary.js";
import { saveFileToUploadDir } from "./saveFileToUploadDir.js";

export async function uploadPhoto(photo) {
  if (photo) {
    if (env("ENABLE_CLOUDINARY") === "true") {
      return await saveFileToCloudinary(photo);
    } else {
      return await saveFileToUploadDir(photo);
    }
  }
}
