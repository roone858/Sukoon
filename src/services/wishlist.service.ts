import axios from "../util/axios";
// import { WishlistItem } from "../util/types";
import { apiUrl } from "../util/urls";

const wishlistService = {
  getWishlist: async (): Promise<string[] | undefined> => {
    try {
      const response = await axios.get(apiUrl + "/wishlist");
      return response.data;
    } catch (error) {
      console.error("Error fetching wishlists:", error);
    }
  },
  addToWishlist: async (productId: string): Promise<string[] | undefined> => {
    try {
      const response = await axios.post(apiUrl + "/wishlist/add", {
        productId,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating resource:", error);
      return undefined;
    }
  },

  removeFromWishlist: async (productId: string) => {
    try {
      const response = await axios.delete(apiUrl + "/wishlist/remove", {
        data: {
          productId: productId,
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return error;
    }
  },
  clearWishlist: async () => {
    try {
      const response = await axios.delete(apiUrl + "/wishlist/clear");
      return response.data;
    } catch (error) {
      console.error("Error deleting image:", error);
      return error;
    }
  },
};

export default wishlistService;
