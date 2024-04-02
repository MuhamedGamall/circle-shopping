import { v2 as cloudinaryV2 } from "cloudinary";

cloudinaryV2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
      const uploadOptions = {
        folder: folderName,
      };
      if (image?.startsWith("data:image") && image?.includes("base64")) {
        const result = await cloudinaryV2.uploader.upload(image, {
          ...uploadOptions,
          transformation: [
            {
              width: 240,
              height: 327,
              crop: "fill",
            },
          ],
        });
        uploadResults.push(result.secure_url);
      } else uploadResults.push(image);
    }

    return uploadResults;
  } catch (error) {
    console.error("Error Cloudinary: uploadImages ", error);
    throw error;
  }
};
export const uploadSubCategoryImages = async ({
  data,
  folderName,
}: {
  data: { name: string; image: string }[];
  folderName: string;
}): Promise<{ name: string; image: string }[]> => {
  try {
    const uploadResults = [];

    for (const el of data) {
      const uploadOptions = {
        folder: folderName,
      };
      if (
        el?.image?.startsWith("data:image") &&
        el?.image?.includes("base64")
      ) {
        const result = await cloudinaryV2.uploader.upload(el?.image, {
          ...uploadOptions,
          transformation: [
            {
              width: 240,
              height: 327,
              crop: "fill",
            },
          ],
        });
        uploadResults.push({ ...el, image: result.secure_url });
      } else uploadResults.push({ ...el, image: el?.image });
    }

    return uploadResults;
  } catch (error) {
    console.error("Error Cloudinary: uploadSubCategoriesImages ", error);
    throw error;
  }
};

export const removeImage = async ({
  public_ids,
}: {
  public_ids: string[];
}): Promise<void> => {
  try {
    const result = await cloudinaryV2.api.delete_resources(public_ids, {
      invalidate: false,
    });
    return result;
  } catch (error) {
    console.error("Error Cloudinary: removeImages ", error);
    throw error;
  }
};

export const removeFolder = async ({
  folderId,
}: {
  folderId: string;
}): Promise<void> => {
  try {
    await cloudinaryV2.api.delete_resources_by_prefix(folderId, {
      invalidate: true,
    });
    const result = await cloudinaryV2.api.delete_folder(folderId, {
      invalidate: true,
    });
    return result;
  } catch (error) {
    console.error("Error Cloudinary: removeFolder ", error);
    throw error;
  }
};
