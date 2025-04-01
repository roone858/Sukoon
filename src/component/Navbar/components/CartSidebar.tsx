import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import CartItem from "../../CartItem";
import { useCartContext } from "../../../context/useContext/useCartContext";

interface CartSidebarProps {
  onClose: () => void;
}

const CartSidebar = ({  onClose }: CartSidebarProps) => {
  const { cart } = useCartContext();

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="hidden md:block fixed inset-0 bg-black/50 backdrop-blur-sm z-40 "
      />

      {/* Cart Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        className="hidden md:block fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl z-50  "
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                عربة التسوق
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                عربة التسوق فارغة
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 dark:text-gray-400">المجموع:</span>
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {cart.reduce((total, item) => total + item.originalPrice * item.quantity, 0)} ريال
                </span>
              </div>
              <button
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() => {
                  onClose();
                  // Add navigation to checkout
                }}
              >
                إتمام الشراء
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default CartSidebar; 