import { Key, useEffect, useState } from "react";
import cloudinary from "@/config/cloudinary.config";
import { CldImage } from "next-cloudinary";

const FolderCount: React.FC = () => {
  const [photos, setPhotos] = useState<any>("");
  console.log("🚀 ~ photos:", photos);
  const [loading, setLoading] = useState(true);

  const getData = async (tag: string) => {
    const response = await fetch(
      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/list`
    );
    const data = await response.json();
    setPhotos(data);
    setLoading(false);
  };
  useEffect(() => {
    getData("recall-cards");
  }, []);

  return (
    <div>
      {!loading && photos.length !== 0 ? (
        <div className="flex flex-wrap -mx-4">
          {photos.resources.map((photo: { public_id: string; }, idx: Key | null | undefined) => {
            return (
              <div
                className="lg:w-1/3 md:w-1/2 w-full p-4"
                key={idx}
              >
                <CldImage
                  src={photo.public_id}
                  alt="algo"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xl p-4">
          No photos to list. Please make sure that you have uploaded some images
          using this app.
        </p>
      )}
    </div>
  );
};

export default FolderCount;
