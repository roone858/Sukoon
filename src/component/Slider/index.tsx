import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import "./style.css";

// Images
import backgroundOne from "../../assets/fred-kleber-EuzKOJL3aLA-unsplash.jpg";
import backgroundTwo from "../../assets/slaapwijsheid-nl-GJW6b9vim1s-unsplash.jpg";
import backgroundThree from "../../assets/ty-carlson-I8kTKM17Ktc-unsplash.jpg";
import { Link } from "react-router-dom";

// Slide data configuration
const slides = [
  {
    id: 1,
    background: backgroundTwo,
    category: "مراتب",
    title: "مراتب مصممة لراحة ظهرك",
    ctaText: "تسوق الان",
    link: "/mega-menu",
    gradient: "from-purple-100/20 to-purple-200/50",
  },
  {
    id: 2,
    background: backgroundOne,
    category: "مراتب",
    title: "أفضل جودة لنوم هانئ",
    ctaText: "اكتشف المجموعة",
    link: "/mega-menu",
    gradient: "from-blue-100/20 to-blue-200/50",
  },
  {
    id: 3,
    background: backgroundThree,
    category: "مراتب فندقية",
    title: "عرض اليوم فقط – راحة استثنائية بسعر خاص!",
    ctaText: "استفد من العرض",
    link: "/mega-menu",
    gradient: "from-indigo-100/20 to-indigo-200/50",
  },
];

// Animation variants
const textVariants = {
  hidden: { opacity: 0, y: 20, x: -20 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: 0.3,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
  },
  tap: { scale: 0.95 },
};

export default function HeroSwiper() {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-xl overflow-hidden shadow-lg">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="hero-swiper"
        pagination={{
          clickable: true,
          el: ".swiper-pagination",
          type: "bullets",
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        speed={1000}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        // autoplay={{
        //   delay: 7000,
        //   pauseOnMouseEnter: true,
        //   disableOnInteraction: false,
        // }}
        loop={true}
        onSlideChange={() => {
          setIsActive(false);
          setTimeout(() => setIsActive(true), 100);
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          1024: {
            slidesPerView: 1,
          },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <motion.div
              initial="hidden"
              animate={isActive ? "visible" : "hidden"}
              style={{
                backgroundImage: `url(${slide.background})`,
              }}
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] bg-cover bg-center transition-all duration-500"
            >
              <div
                className={`p-6 flex flex-col items-center justify-center h-full bg-gradient-to-br ${slide.gradient}`}
              >
                <motion.div
                  variants={textVariants}
                  className="text-center max-w-2xl mx-auto space-y-4"
                >
                  <motion.span
                    variants={itemVariants}
                    className="text-lg md:text-xl font-semibold text-purple-600"
                  >
                    {slide.category}
                  </motion.span>

                  <motion.h2
                    variants={itemVariants}
                    className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight"
                  >
                    {slide.title}
                  </motion.h2>

                  <motion.div variants={itemVariants}>
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      className="text-white bg-purple-600 rounded-full text-base px-8 py-3 shadow-lg hover:bg-purple-700 transition-colors duration-300 font-medium"
                    >
                      <Link to={slide.link}>{slide.ctaText}</Link>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom pagination */}
      <div className="swiper-pagination !bottom-4"></div>

      {/* Custom navigation buttons */}
      <div className="swiper-button-prev !text-white !left-4"></div>
      <div className="swiper-button-next !text-white !right-4"></div>
    </div>
  );
}
