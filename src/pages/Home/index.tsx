import Slider from "../../component/Slider";

import ExploreSection from "../../component/ExploreSection";
import CategoriesSection from "../../component/CategoriesSection";
import Banners from "../../component/Banners";
import PopularProducts from "../../component/PopularProducts";
import DealsSection from "../../component/DealsSection";
import CustomerReview from "../../component/CustomerReview";

const Home = () => {
  return (
    <div className=" ">
      {/* Hero Slider */}
      <Slider />
      <CategoriesSection />
      <Banners />
      <PopularProducts />
      <DealsSection />
      <CustomerReview />
      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Categories Section */}
        {/* <section>
          <CategoriesSection
            title="عالم متكامل من الراحة والرفاهية، صُمم خصيصًا ليناسبك"
            categories={categories}
          />
        </section> */}

        {/* Second Promotional Banner */}
        {/* <section data-aos="fade-up">
          <img
            src={panel2}
            alt="عروض خاصة"
            className="w-full rounded-lg shadow-sm"
            loading="lazy"
          />
        </section> */}

        {/* Services Section */}
        {/* <section>
          <ServicesSection />
        </section> */}
      </main>

      {/* Explore Section */}
      <ExploreSection />
    </div>
  );
};

export default Home;
// import React from 'react';

// export default ImageCard;
