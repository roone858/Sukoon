import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

import "./style.css";

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "أحمد محمد",
    designation: "مصمم ويب",
    description: "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص.",
    rating: 3,
    image: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    id: 2,
    name: "سارة أحمد",
    designation: "مطور برمجيات",
    description: "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص.",
    rating: 4,
    image: "https://randomuser.me/api/portraits/women/1.jpg"
  },
  {
    id: 3,
    name: "محمد علي",
    designation: "مهندس معماري",
    description: "هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل الخارجي للنص.",
    rating: 5,
    image: "https://randomuser.me/api/portraits/men/2.jpg"
  }
];

const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, index) => (
        index < rating ? 
          <FaStar key={index} className="text-purple-600 text-sm" /> :
          <FaRegStar key={index} className="text-purple-600 text-sm" />
      ))}
    </div>
  );
};

export default function CustomerReview() {
  return (
    <section className="customer-review-section py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-2">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg font-bold text-purple-600 mb-2"
          >
            المنتجات
          </motion.h2>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold text-gray-900"
          >
            آراء العملاء
          </motion.h3>
        </div>

        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="testimonials-slider"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg p-8 flex flex-col items-center text-center max-w-md mx-auto"
              >
                <img
                  src={review.image}
                   loading="lazy"
                  alt={review.name}
                  className="w-20 h-20 rounded-full object-cover mb-6"
                />
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                  {review.description}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {review.name}
                </h3>
                <p className="text-purple-600 text-sm mb-4">{review.designation}</p>
                <RatingStars rating={review.rating} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
} 