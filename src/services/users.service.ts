import { ImageType, UserType } from "../types";
import axios from "../utils/axios";

const usersService = {
  create: async (data: unknown) => {
    try {
      const response = await axios.post("http://localhost:3000/users", data);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  },

  getAll: async (): Promise<ImageType[]> => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      return [];
    }
  },
  delete: async (id: string): Promise<UserType | unknown> => {
    try {
      const response = await axios.delete("http://localhost:3000/users/" + id);
      return response.data;
    } catch (error) {
      console.error("Error deleting user:", error);
      return error;
    }
  },

  update: async (data: UserType | null, profilePicture: File | null) => {
    try {
      if (!data) throw new Error("Data is null");

      if (!profilePicture) {
        const response = await axios.patch(`http://localhost:3000/users`, data);
        return response.data;
      }

      const formData = new FormData();
      formData.append("image", profilePicture);
      formData.append("updatedUser", JSON.stringify(data));

      const response = await axios.post(
        "http://localhost:3000/users/profile-picture",
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
      const response = await axios.post(
        "http://localhost:3000/users/check-username",
        { username: newUsername }
      );
      return response.data?.isTaken ?? false;
    } catch (error) {
      console.error("Error checking username:", error);
      return false;
    }
  },

  checkEmailExists: async (email: string) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users/check-email",
        { email }
      );
      return response.data?.isExists ?? false;
    } catch (error) {
      console.error("Error checking email:", error);
      return false;
    }
  },

  verifyToken: async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/users/verify-token"
      );
      return response.data;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  },
};

export default usersService;
