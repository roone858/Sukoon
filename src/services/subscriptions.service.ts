import { SubscriptionType } from "../types";
import axios from "../utils/axios";

const BASE_URL = "http://localhost:3000/subscription";

const subscriptionsService = {
  create: async (data: unknown) => {
    try {
      const response = await axios.post(`${BASE_URL}`, data);
      return response.data;
    } catch (error) {
      console.error("Error creating subscription:", error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${BASE_URL}` + "/all");
      return response.data;
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      throw error;
    }
  },

  findOne: async (): Promise<SubscriptionType> => {
    try {
      const response = await axios.get(BASE_URL);
      return response.data;
    } catch (error) {
      console.error(`Error fetching subscription :`, error);
      throw error;
    }
  },

  update: async (data: SubscriptionType | null) => {
    try {
      if (!data || !data._id) throw new Error("Invalid subscription data");

      const response = await axios.patch(`${BASE_URL}/${data._id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating subscription:", error);
      throw error;
    }
  },
};

export default subscriptionsService;
