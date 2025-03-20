import { PlanType } from "../types";
import axios from "../utils/axios";

const plansService = {
  create: async (data: unknown) => {
    try {
      const response = await axios.post("http://localhost:3000/plans", data);
      return response.data;
    } catch (error) {
      console.error("Error creating plan:", error);
      return null;
    }
  },

  getAll: async (): Promise<PlanType[]> => {
    try {
      const response = await axios.get("http://localhost:3000/plans");
      return response.data;
    } catch (error) {
      console.error("Error fetching plans:", error);
      return [];
    }
  },

  findOne: async (): Promise<PlanType | null> => {
    try {
      const response = await axios.get("http://localhost:3000/plans");
      return response.data;
    } catch (error) {
      console.error("Error finding plan:", error);
      return null;
    }
  },

  update: async (data: PlanType | null) => {
    if (!data) return new Error("Data is null");
    try {
      const response = await axios.patch(
        `http://localhost:3000/plans/${data._id}`,
        data
      );
      return response.data;
    } catch (error) {
      console.error("Error updating plan:", error);
      return null;
    }
  },
};

export default plansService;
