import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import ProductCard from "../ProductCard";
import "./style.css";

const tabs = [
  { id: "all", label: "الكل" },
  { id: "mattresses", label: "مراتب" },
  { id: "bedding", label: "مفارش" },
  { id: "bedroom", label: "غرف نوم" },
  { id: "accessories", label: "اكسسوارات" },
  { id: "decor", label: "ديكور" },
  { id: "lighting", label: "إضاءة" },
];

export default function PopularProducts() {
  const { products } = useStoreContext();
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return products;
    return products.filter((product) =>
      product.categories?.includes(
        tabs.find((tab) => tab.id === activeTab)?.label || ""
      )
    );
  }, [products, activeTab]);

  return (
    <section className="popular-products py-8 xs:py-12 sm:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        {/* Section Header */}
        <div className="section-header text-center mb-6 xs:mb-8 sm:mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 xs:mb-6"
          >
            المنتجات الشائعة
          </motion.h2>
          
          {/* Responsive Tabs */}
          <div className="flex flex-wrap justify-center gap-1 xs:gap-2 sm:gap-3 relative overflow-x-auto pb-2 -mx-2 px-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={() => setHoveredTab(tab.id)}
                onMouseLeave={() => setHoveredTab(null)}
                className={`relative px-3 xs:px-4 sm:px-5 py-1.5 xs:py-2 sm:py-2.5 rounded-full text-xs xs:text-sm font-medium transition-all duration-300 z-10 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {hoveredTab === tab.id && (
                  <motion.span
                    layoutId="hoverBackground"
                    className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-full -z-10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 xs:gap-4 sm:gap-6"
          >
            {filteredProducts.slice(0, 10).map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -3 }}
                className="h-full"
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Responsive View More Button */}
        {filteredProducts.length > 10 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-8 xs:mt-10 sm:mt-12"
          >
            <Link
              to={`/products?category=${activeTab}`}
              className="inline-flex items-center px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 border border-transparent text-sm xs:text-base font-medium rounded-full shadow-sm text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300"
            >
              عرض المزيد
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 xs:h-5 xs:w-5 mr-1 xs:mr-2 rtl:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}