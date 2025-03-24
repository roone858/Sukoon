import React from "react";

// Define the type for a category item
type CategoryItem = {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  color: string;
};

// Props for the component
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
    <section className="py-8">
      <div className="container mx-auto text-center">
        <h4 className="text-[#24195d] font-bold text-2xl md:text-3xl">{title}</h4>
        {subtitle && <p className="text-black opacity-70 text-sm md:text-base">{subtitle}</p>}
      </div>

      <div className="container mx-auto mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <a key={index} href={category.link} className="block">
              <div
                className="transition-all hover:border-primary hover:border-dotted hover:translate-y-1 rounded-3xl px-4 py-6"
                style={{ backgroundColor: category.color }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <div className="border border-gray-100 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center overflow-hidden">
                    <img className="h-full w-full object-cover" src={category.imageUrl} alt={category.title} />
                  </div>
                  <div className="text-center sm:text-left">
                    <h5 className="font-semibold text-lg text-[#f9b000]">{category.title}</h5>
                    <p className="font-medium text-sm text-white">{category.description}</p>
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
