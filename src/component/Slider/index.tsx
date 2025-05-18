import { useState, useEffect, memo,  Suspense } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './style.css';

// Define slide data
const slides = [
  {
    id: 1,
    imagePath: '../../assets/—Pngtree—comfortable double bed with mattress_13719459.webp',
    alt: 'مراتب',
    title: 'مراتب',
    description: 'اقوى الخصومات',
    link: '/mega-menu',
    bgGradient: 'from-purple-100 to-purple-200',
    textColor: 'text-purple-600',
    buttonColor: 'bg-purple-600 hover:bg-purple-700'
  },
  {
    id: 2,
    imagePath: '../../assets/—Pngtree—mordern bed design_20340529.webp',
    alt: 'مفارش',
    title: 'مفارش',
    description: 'اقوى الخصومات',
    link: '/mega-menu',
    bgGradient: 'from-purple-100 to-purple-200',
    textColor: 'text-purple-600',
    buttonColor: 'bg-purple-600 hover:bg-purple-700'
  }
];

// Animation variants
const variants = {
  text: {
    hidden: { opacity: 0, y: 20, x: -20 },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  },
  button: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 }
    }
  },
  image: {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.7, ease: 'easeOut' }
    }
  }
};

// Lazy-loaded image component
const LazyImage = memo(({ src, alt, className }: { src: string; alt: string; className: string }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        const module = await import(/* @vite-ignore */ src);
        setImageSrc(module.default);
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    loadImage();
  }, [src]);

  if (!imageSrc) return <div className={`${className} bg-gray-200 animate-pulse`} />;

  return <img src={imageSrc} alt={alt} className={className} loading="lazy" />;
});

// Slide content component
const SlideContent = memo(({ slide, isActive }: { slide: typeof slides[0]; isActive: boolean }) => (
  <motion.div
    initial="hidden"
    animate={isActive ? 'visible' : 'hidden'}
    className={`w-full h-[400px] bg-gradient-to-br ${slide.bgGradient} rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300`}
  >
    <div className="p-6 flex flex-col items-center h-full">
      <motion.div
        variants={variants.image}
        className="image-container w-full h-52 flex items-center justify-center"
      >
        <LazyImage
          src={slide.imagePath}
          alt={slide.alt}
          className="h-full w-auto object-contain transform hover:scale-125 scale-125 transition-transform duration-300"
        />
      </motion.div>

      <motion.div
        variants={variants.text}
        className="text w-full flex items-center flex-col gap-3 mt-4"
      >
        <motion.span
          className={`text-lg font-semibold ${slide.textColor}`}
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {slide.title}
        </motion.span>

        <motion.p
          className="text-xl font-bold text-gray-800"
          initial={{ opacity: 0, x: -20 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {slide.description}
        </motion.p>

        <motion.button
          variants={variants.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`text-white ${slide.buttonColor} rounded-full text-base px-6 py-2 shadow-md transition-colors duration-300`}
        >
          <Link to={slide.link}>تسوق الان</Link>
        </motion.button>
      </motion.div>
    </div>
  </motion.div>
));

// Main component
const HeroSlider = memo(() => {
  const [isActive, setIsActive] = useState(true);

  const handleSlideChange = () => {
    setIsActive(false);
    setTimeout(() => setIsActive(true), 100);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-2 py-8 pt-2">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        pagination={{ clickable: true }}
        speed={800}
        navigation={true}
        autoplay={{
          delay: 5000,
          pauseOnMouseEnter: true,
          disableOnInteraction: false
        }}
        onSlideChange={handleSlideChange}
        breakpoints={{
          640: { slidesPerView: 1.2, spaceBetween: 30 },
          768: { slidesPerView: 1.5, spaceBetween: 30 },
          1024: { slidesPerView: 2, spaceBetween: 30 }
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <Suspense fallback={<div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-2xl" />}>
              <SlideContent slide={slide} isActive={isActive} />
            </Suspense>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
});

export default HeroSlider;