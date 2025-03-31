import { createContext, useContext } from "react";

export interface Review {
  _id: string;
  rating: number;
  comment: string;
  userId?:
    | string
    | {
        _id: string;
        name: string;
      };
  guestName?: string;
  productId?: string;
  createdAt: string;
}

export interface ReviewStats {
  average: number;
  total: number;
  ratingDistribution: Record<number, number>;
  userReviews: number;
  guestReviews: number;
}

export interface ReviewContextType {
  reviews: Review[];
  stats: ReviewStats;
  loading: boolean;
  error: string | null;
  addReview: (review: Omit<Review, "_id" | "createdAt">) => Promise<Review>;
  deleteReview: (reviewId: string) => Promise<void>;
  updateReview: (reviewId: string, review: Partial<Review>) => Promise<Review>;
}

export const ReviewContext = createContext<ReviewContextType | undefined>(
  undefined
);

export const useReviewContext = () => {
  const context = useContext(ReviewContext);
  if (context === undefined) {
    throw new Error("useReviewContext must be used within a ReviewProvider");
  }
  return context;
};
