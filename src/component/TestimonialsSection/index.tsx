import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      quote:
        "الأفضل. جيد حقًا. أتمنى لو كنت أفكر في الأمر أولاً. لم أكن لأطلب أكثر من هذا.",
      name: "عرفان خالد",
      role: "رجل اعمال",
      avatar:
        "https://xtratheme.com/arabic-elementor/book-shop/wp-content/uploads/sites/60/2021/09/testimonial-1.png",
    },
    {
      id: 2,
      quote:
        "الأشخاص الناجحون يفعلون ما لا يرغب الأشخاص غير الناجحين في القيام به.",
      name: "ماریه آصف",
      role: "مدبرة المنزل",
      avatar:
        "https://xtratheme.com/arabic-elementor/book-shop/wp-content/uploads/sites/60/2021/09/testimonial-2.jpg",
    },
    {
      id: 3,
      quote:
        "الأفضل. جيد حقًا. أتمنى لو كنت أفكر في الأمر أولاً. لم أكن لأطلب أكثر من هذا.",
      name: "بشیر اسماعیل",
      role: "فني",
      avatar:
        "https://xtratheme.com/arabic-elementor/book-shop/wp-content/uploads/sites/60/2021/09/testimonial-3.jpg",
    },
    {
      id: 4,
      quote:
        "الأشخاص الناجحون يفعلون ما لا يرغب الأشخاص غير الناجحين في القيام به.",
      name: "ماریه آصف",
      role: "مدبرة المنزل",
      avatar:
        "https://xtratheme.com/arabic-elementor/book-shop/wp-content/uploads/sites/60/2021/09/testimonial-4.jpg",
    },
  ];

  // Custom Previous Arrow Component
  const PrevArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="prev-btn absolute left-30 -bottom-20 transform -translate-y-1/2 bg-purple-900 text-white p-2 rounded-full shadow-lg z-10"
      >
        <svg
          className="size-5 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    );
  };

  // Custom Next Arrow Component
  const NextArrow = (props) => {
    const { onClick } = props;
    return (
      <button
        onClick={onClick}
        className="nxt-btn absolute right-30 -bottom-20 transform -translate-y-1/2 bg-purple-900 text-white p-2 rounded-full shadow-lg z-10"
      >
        <svg
          className="size-5 rtl:rotate-0"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </button>
    );
  };

  const settings = {
    dots: false, // Disable default dots
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Use custom previous arrow
    nextArrow: <NextArrow />, // Use custom next arrow
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="py-16 bg-gray-50 relative mt-20 pb-30 ">
      <div className="container relative mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h5 className="text-lg font-semibold text-gray-700">التوصيات</h5>
          <h3 className="text-3xl font-bold text-purple-900 mt-2">
            ماذا يقول العميل
          </h3>
        </div>

        {/* Testimonials Carousel */}
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-4">
              <div className="bg-white p-8 rounded-3xl shadow-lg text-center">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  {testimonial.quote}
                </p>
                <div className="flex flex-col items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-24 h-24 rounded-full border-4 border-gray-100 mb-4"
                  />
                  <h4 className="text-xl font-bold text-blue-500">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default TestimonialsSection;
