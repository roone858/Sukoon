import React from "react";
import { Link } from "react-router-dom";

const ExploreSection: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
        {/* Image Section - Order changes on mobile */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1">
          <div className="relative overflow-hidden   hover:shadow-lg transition-shadow duration-300">
            <img
              loading="lazy"
              decoding="async"
              src="https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/04/photo2.jpg"
              className="w-full h-auto object-cover"
              srcSet="https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/04/photo2.jpg 623w, https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/04/photo2-269x300.jpg 269w, https://xtratheme.com/arabic-elementor/furniture-shop-2/wp-content/uploads/sites/105/2024/04/photo2-600x670.jpg 600w"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 623px"
              alt="أثاث منزلي متميز"
            />
          </div>
        </div>

        {/* Text and Button Section */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 lg:pl-0 xl:pl-8">
          <div className="text-center lg:text-right">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold mb-4 lg:mb-6 leading-tight">
              يستكشف<br className="hidden sm:block" />
              اكسترا <span className="text-purple-900">أثاث</span>{" "}
              <span className="text-purple-900">المتجر</span> لآخر<br className="hidden sm:block" />
              مجموعة
            </h2>

            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed">
              الأريكة، والسرير، والمكتب، والكراسي، والطاولات، هناك شيء
              ممتع جدًا في التجول ببطء عبر متاجر الأثاث.
            </p>

            <div className="mt-6 sm:mt-8">
              <Link
                to="/products"
                className="inline-block bg-purple-900 hover:bg-purple-800 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg font-bold transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                aria-label="استكشف مجموعتنا الكاملة من الأثاث"
              >
                <span className="text-sm sm:text-base">
                  انظر المجموعة الكاملة
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreSection;