import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { useReviewContext } from "../../context/hooks/useReviewContext";
import { useAuthContext } from "../../context/hooks/useAuthContext";

interface ReviewFormProps {
  onCancel: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onCancel }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [guestName, setGuestName] = useState("");
  const [hover, setHover] = useState(0);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addReview } = useReviewContext();
  const { user } = useAuthContext();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // التحقق من صحة المدخلات
      if (rating === 0) {
        setError("الرجاء اختيار تقييم");
        return;
      }

      if (!comment.trim()) {
        setError("الرجاء كتابة تعليق");
        return;
      }

      if (!user && !guestName.trim()) {
        setError("الرجاء كتابة اسمك");
        return;
      }

      if (!user && guestName.trim().length < 2) {
        setError("يجب أن يكون الاسم على الأقل حرفين");
        return;
      }
      // إضافة التقييم
      await addReview({
        rating,
        comment: comment.trim(),
        ...(user && user._id
          ? { userId: user._id }
          : { guestName: guestName.trim() }),
      });

      onCancel();
    } catch (err: unknown) {
      console.log(err)
      setError("يمكنك تقديم تقييم واحد فقط لكل منتج كل 24 ساعة");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 space-y-4"
    >
      <div className="flex items-center space-x-2 space-x-reverse">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <FaStar
              className={`w-8 h-8 ${
                star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        ))}
      </div>

      {!user && (
        <div>
          <label
            htmlFor="guestName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            اسمك
          </label>
          <input
            type="text"
            id="guestName"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="أدخل اسمك"
            minLength={2}
            maxLength={50}
            required
          />
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            سيتم عرض اسمك مع تقييمك
          </p>
        </div>
      )}

      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          تعليقك
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="اكتب تعليقك هنا..."
          minLength={10}
          maxLength={500}
          required
        />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm"
        >
          {error}
        </motion.p>
      )}

      <div className="flex items-center space-x-4 ">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "جاري الإرسال..." : "إرسال التقييم"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isSubmitting}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
        >
          إلغاء
        </button>
      </div>
    </motion.form>
  );
};

export default ReviewForm;
