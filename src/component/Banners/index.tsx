import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./style.css";
import bannerOne from "../../assets/—Pngtree—stacked mattresses and their appeal_20532189.png";
import topView from "../../assets/—Pngtree—top view on a double_15877455.png";
import view from "../../assets/—Pngtree—comfortable double bed with mattress_13719459.png";

const banners = [
  {
    id: 1,
    title: "مراتب عصرية\nلنوم هادئ ومريح",
    link: "/products?categories=مراتب",
    gradient: "from-purple-100 to-purple-200",
    image: bannerOne,
  },
  {
    id: 2,
    title: "مفارش أنيقة\nلحياة أكثر راحة",
    link: "/products?categories=مراتب",
    gradient: "from-blue-100 to-blue-200",
    image: topView,
  },
  {
    id: 3,
    title: "أثاث غرف نوم\nبأفضل الأسعار",
    link: "/products?categories=غرف نوم",
    gradient: "from-pink-100 to-pink-200",
    image: view,
  },
];

export default function Banners() {
  return (
    <section className="banners  py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="banner-img relative overflow-hidden rounded-2xl group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${banner.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <div className="relative h-[300px] flex items-center justify-center p-8">
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4 whitespace-pre-line">
                    {banner.title}
                  </h4>
                  <Link
                    to={banner.link}
                    className="inline-flex items-center gap-2 bg-white text-purple-600 px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-600 hover:text-white transition-colors duration-300"
                  >
                    تسوق الآن
                    <i className="fi-rs-arrow-small-right"></i>
                  </Link>
                </div>
              </div>
              <div className="absolute inset-0 pointer-events-none">
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-contain opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
