import { ReactNode, useState, useEffect } from "react";
import {
  Review,
  ReviewContext,
  ReviewStats,
} from "../hooks/useReviewContext";
import { reviewService } from "../../services/review.service";

export const ReviewProvider: React.FC<{
  children: ReactNode;
  productId: string;
}> = ({ children, productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState<ReviewStats>({
    average: 0,
    total: 0,
    ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    userReviews: 0,
    guestReviews: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch reviews and stats when component mounts or productId changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [reviewsData, statsData] = await Promise.all([
          reviewService.getProductReviews(productId),
          reviewService.getReviewStats(productId),
        ]);
        setReviews(reviewsData);
        setStats(statsData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch reviews"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [productId]);

  const addReview = async (review: Omit<Review, "_id" | "createdAt">) => {
    try {
      console.log(review);
      const newReview = await reviewService.addReview(productId, {
        ...review,
        productId,
      });
      setReviews((prev) => [newReview, ...prev]);
      const updatedStats = await reviewService.getReviewStats(productId);
      setStats(updatedStats);
      return newReview;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add review");
     
      throw err;
    }
  };

  const deleteReview = async (reviewId: string) => {
    try {
      await reviewService.deleteReview(reviewId);
      setReviews((prev) => prev.filter((review) => review._id !== reviewId));
      const updatedStats = await reviewService.getReviewStats(productId);
      setStats(updatedStats);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete review");
      throw err;
    }
  };

  const updateReview = async (
    reviewId: string,
    updatedReview: Partial<Review>
  ) => {
    try {
      const updated = await reviewService.updateReview(reviewId, updatedReview);
      setReviews((prev) =>
        prev.map((review) => (review._id === reviewId ? updated : review))
      );
      const updatedStats = await reviewService.getReviewStats(productId);
      setStats(updatedStats);
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update review");
      throw err;
    }
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        stats,
        loading,
        error,
        addReview,
        deleteReview,
        updateReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
