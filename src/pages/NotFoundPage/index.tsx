import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-700 to-purple-800 flex items-center justify-center p-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-9xl font-bold text-white mb-4"
          >
            404
          </motion.h1>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -top-4 -right-4 w-24 h-24 bg-purple-500 rounded-full opacity-20"
          />
        </motion.div>

        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-3xl font-semibold text-white mb-4"
        >
          عذراً! الصفحة غير موجودة
        </motion.h2>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-purple-200 mb-8 max-w-md mx-auto"
        >
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نعيدك إلى المسار الصحيح!
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-purple-500/25"
          >
            <FaHome className="ml-2" />
            العودة للرئيسية
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12"
        >
          <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
            {[...Array(9)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 1.4 + index * 0.1,
                  duration: 0.3,
                  type: "spring",
                  stiffness: 100
                }}
                className="w-4 h-4 bg-purple-500 rounded-full opacity-20"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage; 