export const uploadImage = async (image: File, deckName: string = "") => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("deck-name", deckName);
    console.log("🚀 ~ uploadImage ~ formData:", formData.get("image"));

    const result = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });
    const data = await result.json();
    console.log("🚀 ~ uploadImage ~ data:", data);
    if (!data.ok) {
      throw new Error(data.message);
    }
    return data.uploadResult.secure_url;
  } catch (error: any) {
    console.log("🚀 ~ uploadImage ~ error:", error);
    throw new Error(error.message);
  }
};
