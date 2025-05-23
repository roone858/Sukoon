import { AxiosError } from "axios";
import axios from "../util/axios";
import { clearSessionStorage } from "../util/sessionStorage";
import { User } from "../util/types";
import { apiUrl } from "../util/urls";
import { UserUpdateData } from "../components/ProfilePage/components/UpdateUserForm";

const authService = {
  signup: async (data: User) => {
    try {
      const response = await axios.post(apiUrl + "/auth/signup", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error(
          "Error during registration:",
          error.response?.data || error.message
        );
        return (
          error.response?.data || { message: "An unexpected error occurred" }
        );
      } else {
        console.error("Unexpected error:", error);
        return { message: "An unexpected error occurred" };
      }
    }
  },

  login: async (credentials: { identifier: string; password: string }) => {
    try {
      const response = await axios.post(apiUrl + "/auth/login", credentials);

      return response.data;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  logout: () => {
    clearSessionStorage();
    window.location.href = "/";
  },

  getProfile: async () => {
    try {
      const response = await axios.get(apiUrl + "/auth/profile");
      return response.data;
    } catch (error) {
      console.error("Error fetching profile:", error);
      return null;
    }
  },
  updateAuthenticatedUser: async (data: FormData | UserUpdateData) => {
    try {
      const response = await axios.patch(apiUrl + "/users", data);
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error; // Rethrow the error to handle it in the calling function
    }
  },

  checkUsernameExists: async (newUsername: string) => {
    try {
      const response = await axios.post(apiUrl + "/auth/check-username", {
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
      const response = await axios.post(apiUrl + "/auth/check-email", {
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
      const response = await axios.get(apiUrl + "/auth/verify-token");
      return response.data;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  },
};

export default authService;
