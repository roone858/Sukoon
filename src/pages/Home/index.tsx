import MostCommon from "../../component/MostCommon";

import Slider from "../../component/Slider";
import wePic from "../../assets/we.png";

const Home = () => {
  return (
    <>
      <div className="mt-10 overflow-hidden">
        <Slider />
      </div>

      <div className=" mt-10 p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8 space-y-20 ">
        <MostCommon />

        <div className="bg-gray-400 ">
          <img src={wePic} alt="" className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Home;
