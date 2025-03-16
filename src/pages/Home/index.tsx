import MostCommon from "../../component/MostCommon";

import Slider from "../../component/Slider";
import wePic from "../../assets/we.png";
import ServicesSection from "../../component/ServicesSection";

const Home = () => {
  return (
    <>
      <div  className="mt-10 overflow-hidden">
        <Slider />
      </div>

      <div data-aos="fade-up" className=" mt-20 p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8 space-y-40 ">
        <MostCommon />

        <div data-aos="flip-left" className="bg-gray-400 ">
          <img src={wePic} alt="" className="w-full" />
        </div>
        <div >
          <ServicesSection />
        </div>
      </div>
    </>
  );
};

export default Home;
