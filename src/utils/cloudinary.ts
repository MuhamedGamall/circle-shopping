import { v2 as cloudinaryV2 } from "cloudinary";

cloudinaryV2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
interface CloudinaryImage {
  images?: any;
  folderName?: string;
  public_id?: string;
  public_ids?: string[];
}
export const uploadImages = async ({
  images,
  folderName,
}: {
  images: string[];
  folderName: string;
}): Promise<string[]> => {
  try {
    const uploadResults = [];

    for (const image of images) {
      const uploadOptions: any = {
        folder: folderName,
      };
      const result = await cloudinaryV2.uploader.upload(image, {
        ...uploadOptions,
        transformation: [
          {
            width: 140,
            height: 230,
            crop: "fill",
          },
        ],
      });
      uploadResults.push(result.secure_url);
    }

    return uploadResults;
  } catch (error) {
    console.error("Error Cloudinary: uploadImages ", error);
    throw error;
  }
};

export const removeImage = async ({
  public_ids,
}: CloudinaryImage): Promise<void> => {
  try {
    const deleteOptions: any = {
      public_ids,
    };

    const result = await cloudinaryV2.api.delete_resources(
      deleteOptions.public_ids
    );
    return result;
  } catch (error) {
    throw error;
  }
};
