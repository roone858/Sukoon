import axios from "../util/axios";
import { Product } from "../util/types";


const productService = {
  addProduct: async (data: unknown) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error creating resource:", error);
      return null;
    }
  },

  getAll: async (): Promise<Product[]> => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
  delete: async (id: string) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/products/" + id
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting image:", error);
      return error;
    }
  },
  update: async (data: Product | null) => {
    if (!data) return new Error("Data is null");
    try {
      const response = await axios.patch(
        `http://localhost:3000/products/${data._id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating resource:", error);
      return null;
    }
  },

  upload: async (
    formData: FormData,
    setUploadProgress: (progress: number) => void
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
              setUploadProgress(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  },
};

export default productService;
