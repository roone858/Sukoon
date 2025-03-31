import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useReviewContext } from "../../context/useContext/useReviewContext";
import { useAuthContext } from "../../context/useContext/useAuthContext";

const ReviewList: React.FC = () => {
  const { reviews, deleteReview } = useReviewContext();
  const { user } = useAuthContext();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const filteredReviews = selectedRating
    ? reviews.filter((review) => review.rating === selectedRating)
    : reviews;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Rating Filter - Responsive */}
      <div className="flex flex-wrap gap-2 md:gap-4 items-center">
        <button
          onClick={() => setSelectedRating(null)}
          className={`px-3 py-1 rounded-full text-xs md:text-sm ${
            selectedRating === null
              ? "bg-purple-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          الكل
        </button>
        {[5, 4, 3, 2, 1].map((rating) => (
          <button
            key={rating}
            onClick={() => setSelectedRating(rating)}
            className={`flex items-center space-x-1 space-x-reverse px-2 md:px-3 py-1 rounded-full text-xs md:text-sm ${
              selectedRating === rating
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FaStar className="w-3 h-3 md:w-4 md:h-4" />
            <span>{rating}</span>
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4 md:space-y-6">
        <AnimatePresence>
          {filteredReviews.map((review) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-4 mb-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    {/* <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400">
                      {format(new Date(review.createdAt), 'dd MMMM yyyy', {
                        locale: ar,
                      })}
                    </span> */}
                  </div>
                  <p className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {review.comment}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2">
                    {typeof review.userId === 'object' ? review.userId.name : review.guestName}
                  </p>
                </div>
                {user && typeof review.userId === 'object' && user._id === review.userId._id && (
                  <button
                    onClick={() => deleteReview(review._id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 text-sm md:text-base self-end sm:self-auto"
                  >
                    حذف
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ReviewList;
