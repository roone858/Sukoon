import MostCommon from "../../component/MostCommon";

import Slider from "../../component/Slider";
import panel from "../../assets/paner.png";

const Home = () => {
  return (
    <>
       <div className="mt-10">

      <Slider />
       </div>

      <div className="p-1 sm:p-2 md:p-4 lg:p-6 xl:p-8 space-y-10">
        <MostCommon />

        <div className="bg-gray-400 ">
          <img src={panel} alt="" className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Home;
