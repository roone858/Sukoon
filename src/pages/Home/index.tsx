import MostCommon from "../../component/MostCommon";
import Slider from "../../component/Slider";
import wePic from "../../assets/we.png";
import panel2 from "../../assets/newPanel.png";
import ServicesSection from "../../component/ServicesSection";
import TestimonialsSection from "../../component/TestimonialsSection";
import ExploreSection from "../../component/ExolpreSection";
import CategoriesSection from "../../component/CategoriesSection";
import { useStoreContext } from "../../context/useContext/useStoreContext";

const Home = () => {
  const { products } = useStoreContext();

  const categories = [
    {
      title: "مراتب",
      description: "راحة تنبض بالجودة",
      imageUrl:
        "https://cdn.salla.sa/form-builder/r4GqreVpFPleHsyeDwZe1LQmfNR0OF89AYAsm7fM.jpg",
      link: "https://sleepnice.net/%D9%85%D8%B1%D8%A7%D8%AA%D8%A8/c1198917270",
      color: "#59168b",
    },
    {
      title: "أسرة وقواعد",
      description: "تصاميم أنيقة وعصرية",
      imageUrl:
        "https://cdn.salla.sa/form-builder/itGK3umVhSGrufhNlTVRJSrzgT1z555qAdOnr28B.jpg",
      link: "https://sleepnice.net/%D8%A7%D8%B3%D8%B1%D8%A9/c871203703",
      color: "#59168b",
    },
    {
      title: "مخدات",
      description: "ملمس يحاكي الرفاهية",
      imageUrl:
        "https://cdn.salla.sa/form-builder/UChZTikEKoea4F9FebJuZwNrQHUFUogFvz4vBv2y.jpg",
      link: "https://sleepnice.net/%D9%85%D8%AE%D8%AF%D8%A7%D8%AA/c1428565628",
      color: "#59168b",
    },
    {
      title: "كراسي الراحة",
      description: "إسترخاء يليق بك",
      imageUrl:
        "https://cdn.salla.sa/form-builder/lGHi3MfG7Kxz3jShWOThi55nlVCSiPV7ZNymyN8U.png",
      link: "https://sleepnice.net/%D9%83%D8%B1%D8%A7%D8%B3%D9%8A-%D8%A7%D8%B3%D8%AA%D8%B1%D8%AE%D8%A7%D8%A1/c1806114042",
      color: "#59168b",
    },
  ];

  return (
    <div className="bg-gray-100 space-y-10">
      {/* Full-width Slider */}
      <div className="w-full overflow-hidden">
        <Slider />
      </div>

      {/* Content with consistent margins except MostCommon */}
      <div className="container mx-auto px-4 lg:px-8">
        <CategoriesSection
          title="عالم متكامل من الراحة والرفاهية، صُمم خصيصًا ليناسبك"
          categories={categories}
        />
      </div>

      <div className="container w-full pr-4 mt-10" data-aos="fade-up">
        <MostCommon
          title="المنتجات الاكثر مبيعا"
          products={products?.slice(0, 10)}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 space-y-24">
        <div data-aos="fade-up">
          <img src={wePic} alt="" className="w-full" />
        </div>
        <MostCommon
          title="الكترونيات"
          products={products.filter((p) => p.category == "إلكترونيات")}
        />
        <div data-aos="fade-up">
          <img src={panel2} alt="" className="w-full" />
        </div>
        <div>
          <ServicesSection />
        </div>
      </div>

      <TestimonialsSection />
      <ExploreSection />
    </div>
  );
};

export default Home;
