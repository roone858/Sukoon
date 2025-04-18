import { Product } from "../types/product.type";
import axios from "../util/axios";
import { apiUrl } from "../util/urls";

const productService = {
  addProduct: async (formData: FormData): Promise<Product | null> => {
    try {
      const response = await axios.post(`${apiUrl}/products`, formData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Error creating product:", error.response?.data);
        throw error.response?.data || error.message;
      }
      console.error("Unexpected error:", error);
      throw new Error("An unexpected error occurred");
    }
  },

  getAll: async (): Promise<Product[]> => {
    try {
      const response = await axios.get(apiUrl + "/products");
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  },
  delete: async (id: string) => {
    try {
      const response = await axios.delete(apiUrl + "/products/" + id);
      return response.data;
    } catch (error) {
      console.error("Error deleting image:", error);
      return error;
    }
  },
  update: async (productId: string, formData: FormData) => {
    if (!productId) return new Error("product is null");
    try {
      const response = await axios.patch(
        apiUrl + "/products/" + productId,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
      const response = await axios.post(apiUrl + "/products/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadProgress(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  },
};

export default productService;
