import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import CategoryCard from "./CategoryCard";
import "./style.css";
import { useState, useMemo } from "react";
import { useStoreContext } from "../../context/hooks/useStoreContext";

export default function CategoriesSection() {
  const { products } = useStoreContext();
  const [activeTab, setActiveTab] = useState<string>("");

  // Get top 4 categories with most products
  const topCategories = useMemo(() => {
    // Count products per category
    const categoryCounts = products.reduce((acc, product) => {
      product.categories.forEach(category => {
        acc[category] = (acc[category] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    // Sort categories by count and get top 4
    const sortedCategories = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 4)
      .map(([category, count]) => ({
        id: category,
        name: category,
        itemCount: count,
        link: `/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
        image: products.find(p => p.categories.includes(category))?.images[0]?.url || '/path/to/default-image.png'
      }));

    // Set initial active tab
    if (sortedCategories.length > 0 && !activeTab) {
      setActiveTab(sortedCategories[0].id);
    }

    return sortedCategories;
  }, [products, activeTab]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="section-title">
        <div className="title">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">التصنيفات المميزة</h3>
          <ul className="list-inline nav nav-tabs links">
            {topCategories.map((category) => (
              <li key={category.id} className="list-inline-item nav-item">
                <a
                  className={`nav-link ${activeTab === category.id ? 'active' : ''}`}
                  href={category.link}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(category.id);
                  }}
                >
                  {category.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* <div className="slider-arrow slider-arrow-2 flex-right carausel-10-columns-arrow">
          <span className="slider-btn slider-prev slick-arrow">
            <i className="fi-rs-arrow-small-right"></i>
          </span>
          <span className="slider-btn slider-next slick-arrow">
            <i className="fi-rs-arrow-small-left"></i>
          </span>
        </div> */}
      </div>
      <Swiper
        slidesPerView={2}
        spaceBetween={20}
        modules={[Navigation, Pagination, Autoplay]}
        className="categories-swiper"
        
        navigation={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        }}
      >
        {topCategories.map((category, index) => (
          <SwiperSlide key={category.id}>
            <CategoryCard
              image={category.image}
              title={category.name}
              itemCount={category.itemCount}
              link={category.link}
              delay={index * 0.1}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}