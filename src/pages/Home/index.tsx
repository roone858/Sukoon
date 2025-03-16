import MostCommon from "../../component/MostCommon";

import Slider from "../../component/Slider";
import wePic from "../../assets/we.png";
import ServicesSection from "../../component/ServicesSection";
import TestimonialsSection from "../../component/TestimonialsSection";

const Home = () => {
  return (
    <>
      <div className="mt-10  overflow-hidden">
        <Slider />
      </div>

      <div className="  mt-20 p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8 space-y-40 ">
        <div data-aos="fade-up">
          <MostCommon />
        </div>

        <div data-aos="fade-up" className="bg-gray-400 ">
          <img src={wePic} alt="" className="w-full" />
        </div>
        <div>
          <ServicesSection />
        </div>
      </div>
      <TestimonialsSection />
    </>
  );
};

export default Home;
