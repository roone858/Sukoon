import MostCommon from "../../component/MostCommon";
import Slider from "../../component/Slider";
import wePic from "../../assets/we.png";

import TestimonialsSection from "../../component/TestimonialsSection";
import ExploreSection from "../../component/ExploreSection";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { useMemo } from "react";
import CategoriesSection from "../../component/CategoriesSection";
import Banners from "../../component/Banners";
import PopularProducts from "../../component/PopularProducts";
import DealsSection from "../../component/DealsSection";
import CustomerReview from "../../component/CustomerReview";

const Home = () => {
  const { products } = useStoreContext();

  // const categories = useMemo(
  //   () => [
  //     {
  //       title: "مراتب",
  //       description: "راحة تنبض بالجودة",
  //       imageUrl:
  //         "https://cdn.salla.sa/form-builder/r4GqreVpFPleHsyeDwZe1LQmfNR0OF89AYAsm7fM.jpg",
  //       link: "https://sleepnice.net/%D9%85%D8%B1%D8%A7%D8%AA%D8%A8/c1198917270",
  //       color: "#59168b",
  //     },
  //     {
  //       title: "أسرة وقواعد",
  //       description: "تصاميم أنيقة وعصرية",
  //       imageUrl:
  //         "https://cdn.salla.sa/form-builder/itGK3umVhSGrufhNlTVRJSrzgT1z555qAdOnr28B.jpg",
  //       link: "https://sleepnice.net/%D8%A7%D8%B3%D8%B1%D8%A9/c871203703",
  //       color: "#59168b",
  //     },
  //     {
  //       title: "مخدات",
  //       description: "ملمس يحاكي الرفاهية",
  //       imageUrl:
  //         "https://cdn.salla.sa/form-builder/UChZTikEKoea4F9FebJuZwNrQHUFUogFvz4vBv2y.jpg",
  //       link: "https://sleepnice.net/%D9%85%D8%AE%D8%AF%D8%A7%D8%AA/c1428565628",
  //       color: "#59168b",
  //     },
  //     {
  //       title: "كراسي الراحة",
  //       description: "إسترخاء يليق بك",
  //       imageUrl:
  //         "https://cdn.salla.sa/form-builder/lGHi3MfG7Kxz3jShWOThi55nlVCSiPV7ZNymyN8U.png",
  //       link: "https://sleepnice.net/%D9%83%D8%B1%D8%A7%D8%B3%D9%8A-%D8%A7%D8%B3%D8%AA%D8%B1%D8%AE%D8%A7%D8%A1/c1806114042",
  //       color: "#59168b",
  //     },
  //   ],
  //   []
  // );

  const bestSellingProducts = useMemo(() => products?.slice(0, 10), [products]);
  const electronicsProducts = useMemo(
    () => products?.filter((p) => p.categories.includes("إلكترونيات")),
    [products]
  );

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
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ExploreSection />
      </section>
    </div>
  );
};

export default Home;
// import React from 'react';



// export default ImageCard;
