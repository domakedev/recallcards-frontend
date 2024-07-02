import { v2 as cloudinary } from "cloudinary";
import IMGEX from "@/assets/placeholder-ig.jpg";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const byteArrayBuffer = fs.readFileSync(IMGEX);
// const uploadResult = await new Promise((resolve) => {
//   cloudinary.uploader
//     .upload_stream({ folder: "folder test" }, (error, uploadResult) => {
//       return resolve(uploadResult);
//     })
//     .end(byteArrayBuffer);
// });

export function cloudinaryDestroyImage (publicId: string) {
  cloudinary.uploader
  .destroy(publicId)
  .then(result => {
      return result.result === "ok" ? true : false
  })
}
