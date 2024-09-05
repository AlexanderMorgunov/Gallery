import { $api } from "../../../shared/api";

const getImage = async (name: string): Promise<Blob> => {
  const response = await $api.get(`assets/${name}`, {
    responseType: "blob",
  });
  return response.data;
};

export { getImage };
