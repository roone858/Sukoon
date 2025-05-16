import { memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import CartItem from "../../CartItem";
import { useCartContext } from "../../../context/hooks/useCartContext";
import { useNavigate } from "react-router-dom";

interface CartSidebarProps {
  onClose: () => void;
}

const CartSidebar = memo(({ onClose }: CartSidebarProps) => {
  const { cart } = useCartContext();
  const navigate = useNavigate();
  const shouldReduceMotion = useReducedMotion();

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const sidebarVariants = {
    hidden: { x: "100%" },
    visible: { 
      x: 0,
      transition: {
        type: shouldReduceMotion ? "tween" : "spring",
        stiffness: 300,
        damping: 30,
        duration: shouldReduceMotion ? 0.2 : undefined
      }
    },
    exit: { 
      x: "100%",
      transition: {
        type: "tween",
        duration: 0.2
      }
    }
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.originalPrice * item.quantity,
    0
  );

  return (
    <>
      {/* Overlay */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants}
        onClick={onClose}
        className="hidden md:block fixed inset-0 bg-black/50 backdrop-blur-sm z-40 will-change-opacity"
      />

      {/* Cart Panel */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={sidebarVariants}
        className="hidden md:block fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-gray-800 shadow-xl z-50 will-change-transform"
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                عربة التسوق
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                aria-label="إغلاق عربة التسوق"
              >
                <FaTimes className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Cart Items */}
          <div 
            className="flex-1 overflow-y-auto p-4 overscroll-contain"
            style={{ scrollbarGutter: 'stable' }}
          >
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
                  {totalAmount} ريال
                </span>
              </div>
              <button
                className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                onClick={handleCheckout}
              >
                إتمام الشراء
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </>
  );
});

CartSidebar.displayName = "CartSidebar";
export default CartSidebar; 