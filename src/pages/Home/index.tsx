import Footer from "../../component/Footer";
import MostCommon from "../../component/MostCommon";
import Navbar from "../../component/Navbar";
import Slider from "../../component/Slider";
import panel from "../../assets/paner.png";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-50 h-[5000px] flex flex-col gap-20 px-5">
        <Slider />
        <MostCommon />

        <div className="bg-gray-400 ">
          <img src={panel} alt="" className="w-full" />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
