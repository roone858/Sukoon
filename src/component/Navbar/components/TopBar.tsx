import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoLocationOutline, IoCallOutline } from 'react-icons/io5';

const TopBar = () => {
  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-purple-600 text-white py-2 px-4 hidden md:block"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <IoLocationOutline className="w-4 h-4" />
            <span className="text-sm">موقعنا</span>
          </div>
          <div className="flex items-center gap-2">
            <IoCallOutline className="w-4 h-4" />
            <span className="text-sm" dir="ltr">+01-2345-6789</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="text-sm hover:text-purple-200 transition-colors">
            تسجيل الدخول
          </Link>
          <span className="text-purple-300">/</span>
          <Link to="/register" className="text-sm hover:text-purple-200 transition-colors">
            إنشاء حساب
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBar; 