import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req: Request) => {
  try {
    const data = await req.formData();
    const image = data.get("image");
    const deckName = data.get("deck-name");

    if (!image || !(image instanceof File)) {
      return NextResponse.json(
        { ok: false, message: "Debes enviar una imagen" },
        { status: 400 }
      );
    }

    //Convertir image a buffer
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          { folder: `recall-cards/${deckName}` },
          (error, uploadResult) => {
            if (error) {
              return reject(error);
            }
            return resolve(uploadResult);
          }
        )
        .end(buffer);
    });
    if (!uploadResult) {
      return NextResponse.json(
        { ok: false, message: "No se subió la imagen" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { ok: true, message: "Imagen subida con éxito", uploadResult },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: "Error al subir la imagen" },
      { status: 500 }
    );
  }
};
