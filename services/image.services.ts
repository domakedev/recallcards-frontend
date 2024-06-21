export const uploadImage = async (image: File, deckName: string = "") => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("deck-name", deckName);

    const result = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    const data = await result.json();
    if (!data.ok) {
      throw new Error(data.message);
    }
    return data.uploadResult.secure_url;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
