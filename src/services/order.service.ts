import axios from "../util/axios";
import { apiUrl } from "../util/urls";
import { Order } from "../util/types"; // Assuming you have defined these types

const orderService = {
  // Create a new order
  getOrdersByUserId: async (): Promise<Order[] | undefined> => {
    try {
      const response = await axios.get(apiUrl + "/orders/my-orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },

  createOrder: async (data: Order): Promise<Order | null> => {
    try {
      const response = await axios.post(apiUrl + "/orders", data);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  },

  // Fetch all orders
  getOrders: async (): Promise<Order[] | undefined> => {
    try {
      const response = await axios.get(apiUrl + "/orders");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  },

  // Fetch a single order by ID
  getOrderById: async (id: string): Promise<Order | undefined> => {
    try {
      const response = await axios.get(apiUrl + "/orders/" + id);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
    }
  },

  // Update an order
  updateOrder: async (
    id: string,
    data: Partial<Order>
  ): Promise<Order | null> => {
    try {
      const response = await axios.patch(apiUrl + "/orders/" + id, data);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      return null;
    }
  },

  // Delete an order
  deleteOrder: async (id: string): Promise<boolean> => {
    try {
      await axios.delete(apiUrl + "/orders/" + id);
      return true; // Success
    } catch (error) {
      console.error("Error deleting order:", error);
      return false; // Failure
    }
  },
};

export default orderService;
