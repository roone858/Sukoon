import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import {  useState } from "react";
import "./style.css";

// Lazy load images

export default function App() {
  const [isActive, setIsActive] = useState(true);

  // const textVariants = {
  //   hidden: { opacity: 0, y: 20, x: -20 },
  //   visible: {
  //     opacity: 1,
  //     y: 0,
  //     x: 0,
  //     transition: {
  //       duration: 0.5,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  // const buttonVariants = {
  //   hidden: { opacity: 0, scale: 0.8 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     transition: {
  //       duration: 0.5,
  //       delay: 0.3,
  //     },
  //   },
  // };

  // const imageVariants = {
  //   hidden: { opacity: 0, scale: 0.8, rotate: -10 },
  //   visible: {
  //     opacity: 1,
  //     scale: 1,
  //     rotate: 0,
  //     transition: {
  //       duration: 0.7,
  //       ease: "easeOut",
  //     },
  //   },
  // };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 py-8 pt-2">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper "
        pagination={{
          clickable: true,
        }}
        speed={800}
        navigation={true}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
              disableOnInteraction: false,
        }}
        onSlideChange={() => {
          setIsActive(false);
          setTimeout(() => setIsActive(true), 100);
        }}
        breakpoints={{
          640: {
            slidesPerView: 1.2,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 1.5,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <motion.div
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className=" w-full h-[400px] bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl  overflow-hidden hover:shadow-xl transition-all duration-300 "
          >
            {/* <div className="p-6 flex flex-col items-center h-full">
              <motion.div
                variants={imageVariants}
                className="image-container w-full h-52 flex items-center justify-center"
              >
                <img
                  src={pngTree}
                  className="h-full w-auto object-contain transform hover:scale-125 scale-125 transition-transform duration-300"
                  alt="مراتب"
                   loading="lazy"
                />
              </motion.div>
              <motion.div
                variants={textVariants}
                className="text w-full flex items-center flex-col gap-3 mt-4"
              >
                <motion.span
                  className="text-lg font-semibold text-purple-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  مراتب
                </motion.span>
                <motion.p
                  className="text-xl font-bold text-gray-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  اقوى الخصومات
                </motion.p>
                <motion.button
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white bg-purple-600 rounded-full text-base px-6 py-2 shadow-md hover:bg-purple-700 transition-colors duration-300"
                >
                  <Link to={"/mega-menu"}>تسوق الان</Link>
                </motion.button>
              </motion.div>
            </div> */}
          </motion.div>
        </SwiperSlide>
        <SwiperSlide>
          <motion.div
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            className="w-full h-[400px] bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl  overflow-hidden hover:shadow-xl transition-all duration-300 "
          >
            {/* <div className="p-6 flex flex-col items-center h-full">
              <motion.div
                variants={imageVariants}
                className="image-container w-full h-52 flex items-center justify-center"
              >
                <img
                  src={PanelTow}
                  className="h-full w-auto object-contain transform hover:scale-125 scale-125 transition-transform duration-300"
                  alt="مفارش"
                   loading="lazy"
                />
              </motion.div>
              <motion.div
                variants={textVariants}
                className="text w-full flex items-center flex-col gap-3 mt-4"
              >
                <motion.span
                  className="text-lg font-semibold text-purple-600"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  مفارش
                </motion.span>
                <motion.p
                  className="text-xl font-bold text-gray-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  اقوى الخصومات
                </motion.p>
                <motion.button
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white bg-purple-600 rounded-full text-base px-6 py-2 shadow-md hover:bg-purple-700 transition-colors duration-300"
                >
             <Link to={"/mega-menu"}>تسوق الان</Link>
                </motion.button>
              </motion.div>
            </div> */}
          </motion.div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
