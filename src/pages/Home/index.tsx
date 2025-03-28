import MostCommon from "../../component/MostCommon";
import Slider from "../../component/Slider";
import wePic from "../../assets/we.png";
import image from "../../assets/pexels-heyho-7533840.jpg";
import image1 from "../../assets/pexels-heyho-7546290.jpg";
import image2 from "../../assets/pexels-heyho-7598124.jpg";
// import image3 from "../../assets/pexels-heyho-6523294.jpg";
import image4 from "../../assets/pexels-castorlystock-3682240.jpg";
import TestimonialsSection from "../../component/TestimonialsSection";
import ExploreSection from "../../component/ExploreSection";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { useMemo } from "react";
import { Link } from "react-router-dom";

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
    <div className=" space-y-12 md:space-y-16">
      {/* Hero Slider */}
      <div className="w-full">
        <Slider />
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12 md:space-y-16">
        {/* Categories Section */}
        {/* <section>
          <CategoriesSection
            title="عالم متكامل من الراحة والرفاهية، صُمم خصيصًا ليناسبك"
            categories={categories}
          />
        </section> */}
        <ImageCard text="مراتب" src={image} />
        <ImageCard text="مخدات" src={image4} />
        <ImageCard text="سرير" src={image2} />
        <ImageCard text="مفارش" src={image1} />

        {/* Best Selling Products */}
        <section className="" data-aos="fade-up">
          <MostCommon
            title="المنتجات الأكثر مبيعاً"
            products={bestSellingProducts}
          />
        </section>

        {/* Promotional Banner */}
        <section data-aos="fade-up">
          <img
            src={wePic}
            alt="نحن نقدم أفضل المنتجات"
            className="w-full rounded-lg shadow-sm"
            loading="lazy"
          />
        </section>

        {/* Electronics Products */}
        <section data-aos="fade-up">
          <MostCommon title="إلكترونيات" products={electronicsProducts} />
        </section>
        {/* Testimonials Section */}
        <section className="bg-white py-12 md:py-16">
          <TestimonialsSection />
        </section>
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

const ImageCard = ({ src, text }: { src: string; text: string }) => {
  return (
    <div className="w-full lg:w-1/2  mb-8">
      <div className="relative overflow-hidden  shadow-lg hover:shadow-xl transition-shadow duration-300 group">
        {/* Image with responsive sizes */}
        <a
          href="/collections/living-room-sets"
          className="block aspect-w-3 aspect-h-2"
          aria-label="انتريهات"
        >
          <picture>
            {/* Desktop image */}
            <source
              media="(min-width: 768px)"
              srcSet={src}
              sizes="(min-width: 1100px) 242px, (min-width: 990px) calc((100vw - 130px) / 4), (min-width: 750px) calc((100vw - 120px) / 3)"
            />
            {/* Mobile image */}
            <source
              srcSet={src}
              sizes="(max-width: 767px) calc(100vw - 35px), 330px"
            />
            <img
              src={src}
              alt="انتريهات"
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </picture>
        </a>

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-end justify-center p-6 bg-gradient-to-t from-black/60 to-transparent">
          <div className="text-center animate-fadeInUp flex justify-between  w-full">
            <Link
              to="/collections/living-room-sets"
              className=" items-center pt-3 text-sm font-medium border-t  flex justify-between w-full text-white bg-primary hover:bg-primary-dark  transition-colors duration-300"
            >
              {text}
              <svg
                className="w-4 h-4 mr-2 rtl:ml-0 rtl:mr-0 rtl:rotate-180"
                viewBox="0 0 15 15"
                fill="currentColor"
              >
                <path d="M6.8125 0.349609C7 0.182943 7.17708 0.182943 7.34375 0.349609L13.875 6.91211C14.0625 7.07878 14.0625 7.24544 13.875 7.41211L7.34375 13.9746C7.17708 14.1413 7 14.1413 6.8125 13.9746L6.1875 13.3496C6.125 13.2871 6.09375 13.2038 6.09375 13.0996C6.09375 12.9954 6.125 12.9017 6.1875 12.8184L11.0312 7.97461H0.375C0.125 7.97461 0 7.84961 0 7.59961V6.72461C0 6.47461 0.125 6.34961 0.375 6.34961H11.0312L6.1875 1.50586C6.02083 1.31836 6.02083 1.14128 6.1875 0.974609L6.8125 0.349609Z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// export default ImageCard;
