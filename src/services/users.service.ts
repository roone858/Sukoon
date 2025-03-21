import axios from "axios";
import { apiUrl } from "../util/urls";
import { User } from "../util/types";

const usersService = {
  create: async (data: unknown) => {
    try {
      const response = await axios.post(apiUrl + "/users", data);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  },

  getAll: async (): Promise<User[]> => {
    try {
      const response = await axios.get(apiUrl + "/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },
  delete: async (id: string): Promise<User | unknown> => {
    try {
      const response = await axios.delete(apiUrl + "/users" + id);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      return error;
    }
  },

  update: async (data: User | null, profilePicture: File | null) => {
    try {
      if (!data) throw new Error("Data is null");

      if (!profilePicture) {
        const response = await axios.patch(apiUrl + "/users", data);
        return response.data;
      }

      const formData = new FormData();
      formData.append("image", profilePicture);
      formData.append("updatedUser", JSON.stringify(data));

      const response = await axios.post(
        apiUrl + "/users" + "/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      return null;
    }
  },

  checkUsernameExists: async (newUsername: string) => {
    try {
      const response = await axios.post(apiUrl + "/users/check-username", {
        username: newUsername,
      });
      return response.data?.isTaken ?? false;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  },

  checkEmailExists: async (email: string) => {
    try {
      const response = await axios.post(apiUrl + "/users/check-email", {
        email,
      });
      return response.data?.isExists ?? false;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  },

  verifyToken: async () => {
    try {
      const response = await axios.get(
        apiUrl +"/users/verify-token"
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  },
};

export default usersService;
