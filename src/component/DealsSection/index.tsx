import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { FiShoppingCart } from "react-icons/fi";
import "./style.css";
import ScrollToTopLink from "../MyLink";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function DealsSection() {
  const { products } = useStoreContext();
  const [timers, setTimers] = useState<Record<string, TimeLeft>>({});

  // Get products with discounts
  const discountedProducts = useMemo(() => {
    return products
      .filter((product) => product.discount && product.discount > 0)
      .slice(0, 4);
  }, [products]);

  // Calculate time left for each product
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const newTimers: Record<string, TimeLeft> = {};

      discountedProducts.forEach((product) => {
        let endDate: Date;

        // If product has a discountEndDate, use it, otherwise use end of day
        if (product.discountEndDate) {
          endDate = new Date(product.discountEndDate);
        } else {
          endDate = new Date();
          endDate.setHours(23, 59, 59, 999);
        }

        const difference = endDate.getTime() - now.getTime();

        if (difference > 0) {
          newTimers[product.id] = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        } else {
          // If time is up, set all values to 0
          newTimers[product.id] = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
          };
        }
      });

      setTimers(newTimers);
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial calculation

    return () => clearInterval(timer);
  }, [discountedProducts]);

  return (
    <section className="deals-section py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">عروض اليوم</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {discountedProducts.map((product, index) => (
            <ScrollToTopLink key={product.id} to={`/products/${product.id}`}>
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="deal-card bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="relative p-4">
                  <img
                    src={product.images[0]?.url || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />

                  <div className="countdown-grid mb-4">
                    <div className="countdown-box">
                      <span className="countdown-value">
                        {String(timers[product.id]?.seconds || 0).padStart(
                          2,
                          "0"
                        )}
                      </span>
                      <span className="countdown-label">ثانية</span>
                    </div>
                    <div className="countdown-box">
                      <span className="countdown-value">
                        {String(timers[product.id]?.minutes || 0).padStart(
                          2,
                          "0"
                        )}
                      </span>
                      <span className="countdown-label">دقيقة</span>
                    </div>
                    <div className="countdown-box">
                      <span className="countdown-value">
                        {String(timers[product.id]?.hours || 0).padStart(
                          2,
                          "0"
                        )}
                      </span>
                      <span className="countdown-label">ساعة</span>
                    </div>
                    <div className="countdown-box">
                      <span className="countdown-value">
                        {String(timers[product.id]?.days || 0).padStart(2, "0")}
                      </span>
                      <span className="countdown-label">يوم</span>
                    </div>
                  </div>

                  <h3 className="product-title text-gray-800 font-medium mb-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center mb-2">
                    <div className="rating text-yellow-400">★★★★★</div>
                    <span className="text-gray-500 text-sm mr-1">(4.0)</span>
                  </div>

                  <div className="text-sm text-gray-500 mb-3">
                    بواسطة {product.categories[0]}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="prices">
                      <span className="text-lg font-bold text-green-600">
                        {product.finalPrice || product.price} ريال
                      </span>
                      {product.discount && product.discount > 0 && (
                        <span className="text-sm text-gray-400 line-through mr-2">
                          {product.price} ريال
                        </span>
                      )}
                    </div>
                    <button className="add-btn flex items-center text-sm text-green-600 hover:text-green-700">
                      <FiShoppingCart className="ml-1" />
                      إضافة
                    </button>
                  </div>
                </div>
              </motion.div>
            </ScrollToTopLink>
          ))}
        </div>
      </div>
    </section>
  );
}
