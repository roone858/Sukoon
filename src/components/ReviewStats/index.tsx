import React from 'react';
import { FaStar } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useReviewContext } from '../../context/hooks/useReviewContext';

const ReviewStats: React.FC = () => {
  const { stats } = useReviewContext();

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const calculatePercentage = (count: number) => {
    return ((count / stats.total) * 100).toFixed(1);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Overall Rating */}
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="text-4xl font-bold text-purple-600 mb-2"
          >
            {stats.average.toFixed(1)}
          </motion.div>
          <div className="flex justify-center mb-2">
            {renderStars(stats.average)}
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {stats.total} تقييم
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2 space-x-reverse">
              <div className="flex">{renderStars(rating)}</div>
              <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${calculatePercentage(stats.ratingDistribution[rating] || 0)}%` }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-purple-600"
                />
              </div>
              <span className="text-sm text-gray-600 dark:text-gray-400 w-12 text-left">
                {stats.ratingDistribution[rating] || 0}
              </span>
            </div>
          ))}
        </div>

        {/* Review Types */}
        <div className="md:col-span-2 flex justify-center space-x-4 space-x-reverse text-sm text-gray-600 dark:text-gray-400">
          <span>تقييمات المستخدمين: {stats.userReviews}</span>
          <span>تقييمات الضيوف: {stats.guestReviews}</span>
        </div>
      </div>
    </div>
  );
};

export default ReviewStats; 