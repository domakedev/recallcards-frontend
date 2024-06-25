export const uploadImage = async (image: File, deckId: string ="") => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("deck-id", deckId);

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

export const uploadImages = async (images: FileList, deckId: string = "") => {
  try {
    const imgArr: string[] = [];
    for (let i = 0; i < images.length; i++) {
      const element = images[i];
      const imgUrl = await uploadImage(element, deckId);
      imgArr.push(imgUrl);
    }
    return imgArr;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
