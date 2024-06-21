import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "@/config/cloudinary.config";

type Data = {
  folderCount?: number;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { resources } = await cloudinary.api.root_folders();
    const datax = await cloudinary.api;

    const folderCount = resources.length;

    res.status(200).json({ folderCount });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
