import { motion, AnimatePresence } from "framer-motion";
import { IoTrashOutline, IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import { useAuthContext } from "../../context/useContext/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useCartContext } from "../../context/useContext/useCartContext";
import { CartItem } from "../../util/types";

const CartPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { cart, removeItemFromCart, updateCartItemQuantity } = useCartContext();

  const calculateDiscount = () => {
    return cart.reduce((total: number, item: CartItem) => {
      if (item.finalPrice) {
        return total + (item.finalPrice - item.originalPrice) * item.quantity;
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
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">سلة المشتريات</h1>

        {cart.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <IoTrashOutline className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-600 mb-2">
              السلة فارغة
            </h2>
            <p className="text-gray-500 mb-6">
              لم تقم بإضافة أي منتجات إلى السلة بعد
            </p>
            <button
              onClick={() => navigate("/products")}
              className="btn-primary"
            >
              تصفح المنتجات
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <AnimatePresence>
                {cart.map((item) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="cart-item"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {item.name}
                        </h3>

                        <div className="flex items-center gap-2 mb-4">
                          {item.discountPercentage && (
                            <>
                              <span className="text-sm text-red-500">
                                -{item.discountPercentage}%
                              </span>
                              <span className="text-sm text-gray-500 line-through">
                                {item.originalPrice} ريال
                              </span>
                            </>
                          )}
                          <span className="text-lg font-bold text-purple-600">
                            {item.finalPrice || item.originalPrice} ريال
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="quantity-controls">
                            <button
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.productId,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="quantity-btn"
                            >
                              <IoRemoveOutline className="w-5 h-5" />
                            </button>
                            <span className="quantity-value">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateCartItemQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                              className="quantity-btn"
                            >
                              <IoAddOutline className="w-5 h-5" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItemFromCart(item.productId)}
                            className="remove-btn"
                          >
                            <IoTrashOutline className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="cart-summary">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  ملخص الطلب
                </h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">المجموع الفرعي</span>
                    <span className="font-medium">{calculateTotal()} ريال</span>
                  </div>

                  <div className="flex justify-between text-green-600">
                    <span>الخصم</span>
                    <span>{calculateDiscount()} ريال</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between">
                      <span className="font-semibold">الإجمالي</span>
                      <span className="font-bold text-lg  text-purple-600">
                        {calculateTotal()} ريال
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/checkout")}
                  className="btn-primary w-full mt-6"
                >
                  إتمام الشراء
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
