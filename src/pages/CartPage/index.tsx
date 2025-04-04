import { motion, AnimatePresence } from "framer-motion";
import {
  IoTrashOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoArrowForward,
} from "react-icons/io5";
import { useAuthContext } from "../../context/hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../../context/hooks/useCartContext";
import { CartItem } from "../../util/types";

const CartPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { cart, removeItemFromCart, updateCartItemQuantity } = useCartContext();

  const calculateDiscount = () => {
    return cart.reduce((total: number, item: CartItem) => {
      if (item.finalPrice) {
        return total + (item.originalPrice - item.finalPrice) * item.quantity;
      }
      return total;
    }, 0);
  };

  const calculateTotal = () => {
    return cart.reduce((total: number, item: CartItem) => {
      return total + (item.finalPrice || item.originalPrice) * item.quantity;
    }, 0);
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-3 xs:px-4 py-6">
        {/* Header with back button */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-full bg-white shadow-xs hover:bg-gray-100 mr-2"
          >
            <IoArrowForward className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="text-2xl xs:text-3xl font-bold text-gray-800 flex-1 text-center">
            سلة المشتريات
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <IoTrashOutline className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">
              سلة التسوق فارغة
            </h2>
            <p className="text-gray-500 mb-8 max-w-xs mx-auto">
              لم تقم بإضافة أي منتجات إلى السلة بعد
            </p>
            <button
              onClick={() => navigate("/products")}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300"
            >
              تصفح المنتجات
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm p-4 mb-4"
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 xs:w-20 xs:h-20 object-cover rounded-lg"
                        />
                        {item.discountPercentage && (
                          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-bl-lg rounded-tr-lg">
                            {item.discountPercentage}%
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm xs:text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                            {item.name}
                          </h3>
                          <button
                            onClick={() => removeItemFromCart(item.productId)}
                            className="text-gray-400 hover:text-red-500 p-1"
                          >
                            <IoTrashOutline className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          {item.finalPrice &&
                            item.finalPrice !== item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {item.originalPrice} ر.س
                              </span>
                            )}
                          <span className=" text-sm sx:text-base xs:text-lg font-bold text-purple-600">
                            {item.finalPrice || item.originalPrice} ر.س
                          </span>
                        </div>

                        <div className="flex items-center flex-wrap gap-2 justify-between">
                          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.productId,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <IoRemoveOutline className="w-4 h-4" />
                            </button>
                            <span className="px-3 text-center w-8">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                              <IoAddOutline className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-sm xs:text-base font-medium">
                            المجموع:{" "}
                            {(item.finalPrice || item.originalPrice) *
                              item.quantity}{" "}
                            ر.س
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary - Sticky on mobile */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-xl shadow-sm p-5 sticky top-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-5 pb-3 border-b">
                  ملخص الطلب
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-medium">{calculateTotal()} ر.س</span>
                  </div>

                  {calculateDiscount() > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>وفرت</span>
                      <span>{calculateDiscount()} ر.س</span>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">الإجمالي</span>
                      <span className="font-bold text-lg text-purple-600">
                        {calculateTotal()} ر.س
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="w-full mt-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-lg font-bold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                >
                  إتمام الشراء
                </button>

                <button
                  onClick={() => navigate("/products")}
                  className="w-full mt-3 bg-white border border-purple-600 text-purple-600 py-3 rounded-lg font-bold hover:bg-purple-50 transition-colors duration-300"
                >
                  مواصلة التسوق
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
