import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const TestimonialsSection: React.FC = () => {
  const sliderRef = useRef<Slider>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "الأفضل. جيد حقًا. أتمنى لو كنت أفكر في الأمر أولاً. لم أكن لأطلب أكثر من هذا.",
      name: "عرفان خالد",
      role: "رجل اعمال",
      avatar: "https://xtratheme.com/arabic-elementor/book-shop/wp-content/uploads/sites/60/2021/09/testimonial-1.png",
    },
    {
      id: 2,
      quote: "الأشخاص الناجحون يفعلون ما لا يرغب الأشخاص غير الناجحين في القيام به.",
      name: "ماریه آصف",
      role: "مدبرة المنزل",
      avatar: "https://xtratheme.com/arabic-elementor/book-shop/wp-content/uploads/sites/60/2021/09/testimonial-2.jpg",
    },
    {
      id: 3,
      quote: "الأفضل. جيد حقًا. أتمنى لو كنت أفكر في الأمر أولاً. لم أكن لأطلب أكثر من هذا.",
      name: "بشیر اسماعیل",
      role: "فني",
      avatar: "https://xtratheme.com/arabic-elementor/book-shop/wp-content/uploads/sites/60/2021/09/testimonial-3.jpg",
    },
    {
      id: 4,
      quote: "الأشخاص الناجحون يفعلون ما لا يرغب الأشخاص غير الناجحين في القيام به.",
      name: "ماریه آصف",
      role: "مدبرة المنزل",
      avatar: "https://xtratheme.com/arabic-elementor/book-shop/wp-content/uploads/sites/60/2021/09/testimonial-4.jpg",
    },
  ];

  // Custom Arrow Component
  const CustomArrow: React.FC<{ 
    onClick?: () => void; 
    direction: 'prev' | 'next';
  }> = ({ onClick, direction }) => {
    return (
      <button
        onClick={onClick}
        className={`hidden sm:absolute  ${direction === 'prev' ? 'left-2 sm:left-4' : 'right-2 sm:right-4'}  -bottom-12 sm:-bottom-16 transform -translate-y-1/2 bg-purple-900 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-10 focus:outline-none focus:ring-2 focus:ring-purple-500`}
        aria-label={direction === 'prev' ? 'Previous testimonial' : 'Next testimonial'}
      >
        <svg
          className="size-5 sm:size-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={direction === 'prev' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
          />
        </svg>
      </button>
    );
  };

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2.5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2.2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.8,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1.5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
  };

  return (
    <section className="py-12 sm:py-16 bg-gray-50 relative">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Title Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h5 className="text-base sm:text-lg font-medium text-gray-600">التوصيات</h5>
          <h3 className="text-2xl sm:text-3xl font-bold text-purple-900 mt-1 sm:mt-2">
            ماذا يقول العميل
          </h3>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="px-2 sm:px-3 pb-1 sm:pb-6">
                <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-md hover:shadow-lg transition-shadow duration-300 h-full">
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6 line-clamp-4 sm:line-clamp-none">
                    {testimonial.quote}
                  </p>
                  <div className="flex flex-col items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full border-2 sm:border-4 border-gray-100 mb-3 sm:mb-4"
                      loading="lazy"
                    />
                    <h4 className="text-base sm:text-lg md:text-xl font-bold text-blue-500">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;