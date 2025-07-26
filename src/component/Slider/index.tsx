import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useState } from "react";
import "./style.css";

// Lazy load images
// import imgOne from "../../assets/—Pngtree—stacked mattresses and their appeal_20532189.webp";
import backgroundOne from "../../assets/fred-kleber-EuzKOJL3aLA-unsplash.webp";
import backgroundTow from "../../assets/slaapwijsheid-nl-GJW6b9vim1s-unsplash.webp";
import backgroundTh from "../../assets/ty-carlson-I8kTKM17Ktc-unsplash.webp";

// import imgTwo from "../../assets/—Pngtree—mordern bed design_20340529.webp";
import { Link } from "react-router-dom";
export default function App() {
  const [isActive, setIsActive] = useState(true);

  const textVariants = {
    hidden: { opacity: 0, y: 20, x: -20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
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
  };

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
    <div className="relative shadow-lg  ">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        centeredSlides={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper   h-[400px] md:h-[500px] lg:h-[600px] mb-12 mx-auto "
        pagination={{
          clickable: true,
        }}
        speed={800}
        navigation={true}
        // autoplay={{
        //   delay: 5000,
        //   pauseOnMouseEnter: true,
        //   disableOnInteraction: false,
        // }}
        onSlideChange={() => {
          setIsActive(false);
          setTimeout(() => setIsActive(true), 100);
        }}
        // breakpoints={{
        //   640: {
        //     slidesPerView: 1.2,
        //     spaceBetween: 30,
        //   },
        //   768: {
        //     slidesPerView: 1.5,
        //     spaceBetween: 30,
        //   },
        //   1024: {
        //     slidesPerView: 2,
        //     spaceBetween: 30,
        //   },
        // }}
      >
        <SwiperSlide>
          <motion.div
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            style={{
              backgroundImage: `url(${backgroundTow})`,
              backgroundSize: "cover",
            }}
            className=" w-full h-full bg-cover bg-center transition-all duration-500   bg-gradient-to-br from-purple-100/20 to-purple-200/50 "
          >
            <div className="p-6 flex flex-col items-center  justify-center   mx-auto px-4 sm:px-6 lg:px-8  h-full">
              <motion.div
                variants={textVariants}
                className="text w-full flex items-center justify-center flex-col gap-3"
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
                  مراتب مصممة لراحة ظهرك{" "}
                </motion.p>
                <motion.button
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white bg-purple-600 rounded-full text-base px-6 py-2 shadow-md hover:bg-purple-700 transition-colors duration-300"
                >
                  <Link to={"/categories"}>تسوق الان</Link>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </SwiperSlide>
        <SwiperSlide>
          <motion.div
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            style={{
              backgroundImage: `url(${backgroundOne})`,
              backgroundSize: "cover",
            }}
            className=" w-full h-full bg-cover bg-center transition-all duration-500 "
          >
            <div className="p-6 flex flex-col items-center  justify-center   bg-gradient-to-br from-purple-100/20 to-purple-200/50 h-full">
              <motion.div
                variants={textVariants}
                className="text w-full flex items-center justify-center flex-col gap-3"
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
                  أفضل جودة لنوم هانئ{" "}
                </motion.p>
                <motion.button
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white bg-purple-600 rounded-full text-base px-6 py-2 shadow-md hover:bg-purple-700 transition-colors duration-300"
                >
                  <Link to={"/categories"}>اكتشف المجموعة</Link>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </SwiperSlide>
        <SwiperSlide>
          <motion.div
            initial="hidden"
            animate={isActive ? "visible" : "hidden"}
            style={{
              backgroundImage: `url(${backgroundTh})`,
              backgroundSize: "cover",
            }}
            className=" w-full h-full bg-cover bg-center transition-all duration-500 "
          >
            <div className="p-6 flex flex-col items-center  justify-center   bg-gradient-to-br from-purple-100/20 to-purple-200/50 h-full">
              <motion.div
                variants={textVariants}
                className="text w-full flex items-center justify-center flex-col gap-3"
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
                  عرض اليوم فقط – راحة استثنائية بسعر خاص!{" "}
                </motion.p>
                <motion.button
                  variants={buttonVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-white bg-purple-600 rounded-full text-base px-6 py-2 shadow-md hover:bg-purple-700 transition-colors duration-300"
                >
                  <Link to={"/categories"}>استفد من العرض</Link>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
