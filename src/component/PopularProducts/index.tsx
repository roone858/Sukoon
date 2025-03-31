import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../context/useContext/useStoreContext";
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
  const [activeTab, setActiveTab] = useState("all");

 
  // Filter products based on active tab
  const filteredProducts = useMemo(() => {
    if (activeTab === "all") return products;
    return products.filter((product) =>
      product.categories.includes(
        tabs.find((tab) => tab.id === activeTab)?.label || ""
      )
    );
  }, [products, activeTab]);

  return (
    <section className="popular-products py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="section-title text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            المنتجات الشائعة
          </h2>
          <div className="tabs flex flex-wrap justify-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.slice(0,5).map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="product-card border border-gray-100 bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 flex items-center justify-center bg-gray-50">
                <img
                  src={product.images[0]?.url || "/placeholder.jpg"}
                  alt={product.name}
                  className="max-h-full max-w-full w-auto h-auto object-contain p-4"
                />
                {product.discount && product.discount > 0 && (
                  <span className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                    خصم {product.discount}%
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">
                    {product.categories[0]}
                  </span>
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm text-gray-600 mr-1">4.5</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-purple-600">
                      {product.finalPrice || product.price} ريال
                    </span>
                    {product.discount && product.discount > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        {product.price} ريال
                      </span>
                    )}
                  </div>
                  <Link
                    to={`/product/${product.id}`}
                    className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition-colors duration-300"
                  >
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
