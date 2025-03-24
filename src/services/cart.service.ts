import axios from "../util/axios";
import { CartItem } from "../util/types";
import { apiUrl } from "../util/urls";

const cartService = {
  addCart: async (data: unknown) => {
    try {
      const response = await axios.post(apiUrl + "/cart", data);
      return response.data;
    } catch (error) {
      console.error("Error creating resource:", error);
      return null;
    }
  },

  getCart: async (): Promise<{ items: CartItem[] } | undefined> => {
    try {
      const response = await axios.get(apiUrl + "/cart");
      return response.data;
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  },
  delete: async (id: string) => {
    try {
      const response = await axios.delete(apiUrl + "/cart/" + id);
      return response.data;
    } catch (error) {
      console.error("Error deleting image:", error);
      return error;
    }
  },
  update: async (data: { items: CartItem[] }) => {
    console.log(data);
    try {
      const response = await axios.patch(apiUrl + "/cart/", data);
      return response.data;
    } catch (error) {
      console.error("Error updating resource:", error);
      return null;
    }
  },
};

export default cartService;
