import MostCommon from "../../component/MostCommon";

import Slider from "../../component/Slider";
import panel from "../../assets/paner.png";

const Home = () => {
  return (
    <>
      <div className="bg-gray-50 h-[2500px] flex flex-col gap-20 px-5">
        <Slider />
        <MostCommon />

        <div className="bg-gray-400 ">
          <img src={panel} alt="" className="w-full" />
        </div>
      </div>
    </>
  );
};

export default Home;
