import { Review } from '../context/hooks/useReviewContext';
import axios from '../util/axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const reviewService = {
  // Get all reviews for a product
  getProductReviews: async (productId: string): Promise<Review[]> => {
    try {
      const response = await axios.get(`${API_URL}/reviews/product/${productId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product reviews:', error);
      throw new Error('Failed to fetch product reviews');
    }
  },

  // Add a new review
  addReview: async (productId: string, review: Omit<Review, '_id' | 'createdAt'>): Promise<Review> => {
    try {
      const response = await axios.post(`${API_URL}/reviews/product/${productId}`, review);
      return response.data;
    } catch (error) {
      console.error('Error adding review:', error);
      throw new Error(error instanceof Error ? error.message : String(error));
    }
  },

  // Update a review
  updateReview: async (reviewId: string, review: Partial<Review>): Promise<Review> => {
    try {
      const response = await axios.put(`${API_URL}/reviews/${reviewId}`, review);
      return response.data;
    } catch (error) {
      console.error('Error updating review:', error);
      throw new Error('Failed to update review');
    }
  },

  // Delete a review
  deleteReview: async (reviewId: string): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/reviews/${reviewId}`);
    } catch (error) {
      console.error('Error deleting review:', error);
      throw new Error('Failed to delete review');
    }
  },

  // Get review statistics for a product
  getReviewStats: async (productId: string): Promise<{
    average: number;
    total: number;
    ratingDistribution: Record<number, number>;
    userReviews: number;
    guestReviews: number;
  }> => {
    try {
      const response = await axios.get(`${API_URL}/reviews/product/${productId}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching review statistics:', error);
      throw new Error('Failed to fetch review statistics');
    }
  }
};