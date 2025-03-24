import React from "react";

type CategoryItem = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  color: string;
};

type CategoriesSectionProps = {
  title: string;
  subtitle?: string;
  categories: CategoryItem[];
};

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  title,
  subtitle,
  categories,
}) => {
  return (
    <section className="py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-[#24195d] font-bold text-2xl sm:text-3xl lg:text-4xl mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>

      <div className="container mx-auto px-4 sm:px-6 mt-6 sm:mt-8">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className="block group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-3xl transition-all"
              aria-label={`Explore ${category.title}`}
            >
              <div
                className="h-full rounded-3xl p-4 sm:p-5 transition-transform duration-300 group-hover:-translate-y-1 group-focus:-translate-y-1"
                style={{ backgroundColor: category.color }}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-3 sm:mb-4">
                    <div className="absolute inset-0 border-2 border-white/30 rounded-full overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={category.imageUrl}
                        alt=""
                        loading="lazy"
                        width={112}
                        height={112}
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-[#f9b000] mb-1">
                      {category.title}
                    </h3>
                    <p className="font-medium text-xs sm:text-sm text-white/90">
                      {category.description}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;