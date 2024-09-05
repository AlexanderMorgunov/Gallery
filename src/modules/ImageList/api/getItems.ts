import { $api } from "../../../shared/api";
import { GalleryItemModuleType } from "../../../shared/store";

const getItems = async (): Promise<GalleryItemModuleType[]> => {
  const response = await $api.get("items/gallery");
  return response.data.data;
};

export { getItems };
