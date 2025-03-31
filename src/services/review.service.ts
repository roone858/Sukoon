import { Review } from '../context/useContext/useReviewContext';
import axios from '../util/axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const reviewService = {
  // Get all reviews for a product
  getProductReviews: async (productId: string): Promise<Review[]> => {
    const response = await axios.get(`${API_URL}/reviews/product/${productId}`);
    return response.data;
  },

  // Add a new review
  addReview: async (productId: string, review: Omit<Review, '_id' | 'createdAt'>): Promise<Review> => {
    const response = await axios.post(`${API_URL}/reviews/product/${productId}`, review);
    return response.data;
  },

  // Update a review
  updateReview: async (reviewId: string, review: Partial<Review>): Promise<Review> => {
    const response = await axios.put(`${API_URL}/reviews/${reviewId}`, review);
    return response.data;
  },

  // Delete a review
  deleteReview: async (reviewId: string): Promise<void> => {
    await axios.delete(`${API_URL}/reviews/${reviewId}`);
  },

  // Get review statistics for a product
  getReviewStats: async (productId: string): Promise<{
    average: number;
    total: number;
    ratingDistribution: Record<number, number>;
    userReviews: number;
    guestReviews: number;
  }> => {
    const response = await axios.get(`${API_URL}/reviews/product/${productId}/stats`);
    return response.data;
  }
}; 