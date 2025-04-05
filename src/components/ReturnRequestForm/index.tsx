import { motion } from "framer-motion";
import { useState } from "react";
import {
  FiArrowLeft,
  FiShoppingBag,
  FiCalendar,
  FiFileText,
  FiCheckCircle,
  FiUpload,
} from "react-icons/fi";
interface ReturnRequestData {
  orderNumber: string;
  returnReason: string;
  additionalNotes: string;
  productCondition: string;
  attachments: File[]; // Changed from never[] to File[]
}
const ReturnRequestForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ReturnRequestData>({
    orderNumber: "",
    returnReason: "",
    additionalNotes: "",
    productCondition: "",
    attachments: [] as File[],
  });

  const handleSelectChange  = (e: React.ChangeEvent<HTMLSelectElement> ) => {
     const { name, value } = e.target;
     setFormData((prev) => ({ ...prev, [name]: value }));
   };
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return; // Handle empty selection

    setFormData((prev) => ({
      ...prev,
      attachments: Array.from(files), // Now guaranteed to have File[]
    }));
  };

  const handleSubmit = () => {
    setStep(3); // Move to confirmation
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-purple-800 mb-2">
            نموذج طلب إرجاع
          </h1>
          <p className="text-gray-600">
            يرجى تعبئة النموذج التالي لطلب إرجاع المنتج
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-8 relative">
          <div
            className={`flex flex-col items-center ${
              step >= 1 ? "text-purple-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 1 ? "bg-purple-100" : "bg-gray-100"
              }`}
            >
              {step > 1 ? (
                <FiCheckCircle className="text-green-500" />
              ) : (
                <span>1</span>
              )}
            </div>
            <span className="text-xs mt-1">معلومات الطلب</span>
          </div>

          <div
            className={`flex flex-col items-center ${
              step >= 2 ? "text-purple-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 2 ? "bg-purple-100" : "bg-gray-100"
              }`}
            >
              {step > 2 ? (
                <FiCheckCircle className="text-green-500" />
              ) : (
                <span>2</span>
              )}
            </div>
            <span className="text-xs mt-1">التفاصيل</span>
          </div>

          <div
            className={`flex flex-col items-center ${
              step >= 3 ? "text-purple-600" : "text-gray-400"
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step >= 3 ? "bg-purple-100" : "bg-gray-100"
              }`}
            >
              <span>3</span>
            </div>
            <span className="text-xs mt-1">التأكيد</span>
          </div>

          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10">
            <motion.div
              className="h-full bg-purple-600"
              initial={{
                width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
              }}
              animate={{
                width: step === 1 ? "0%" : step === 2 ? "50%" : "100%",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Content */}
        {step === 1 && (
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiShoppingBag className="text-purple-600" />
              معلومات الطلب
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  رقم الطلب *
                </label>
                <input
                  type="text"
                  name="orderNumber"
                  value={formData.orderNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  تاريخ الطلب *
                </label>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg mt-4 transition-colors"
              >
                التالي
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <button
              onClick={() => setStep(1)}
              className="flex items-center text-purple-600 mb-4"
            >
              <FiArrowLeft className="ml-1" />
              رجوع
            </button>

            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FiFileText className="text-purple-600" />
              تفاصيل الإرجاع
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  سبب الإرجاع *
                </label>
                <select
                  name="returnReason"
                  value={formData.returnReason}
                  onChange={handleSelectChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">اختر السبب</option>
                  <option value="wrong-item">استلمت منتج خاطئ</option>
                  <option value="damaged">المنتج تالف</option>
                  <option value="not-as-described">
                    المنتج لا يتطابق مع الوصف
                  </option>
                  <option value="change-mind">غيرت رأيي</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  حالة المنتج *
                </label>
                <select
                  name="productCondition"
                  value={formData.productCondition}
                  onChange={handleSelectChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                >
                  <option value="">اختر الحالة</option>
                  <option value="new">جديد - لم يتم استخدامه</option>
                  <option value="opened">مفتوح ولكن غير مستخدم</option>
                  <option value="lightly-used">مستخدم قليلاً</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ملاحظات إضافية
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  إرفاق صور (اختياري)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FiUpload className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-2">
                    اسحب وأسقط الملفات هنا أو انقر لاختيارها
                  </p>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    multiple
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded text-sm cursor-pointer transition-colors"
                  >
                    اختر ملفات
                  </label>
                </div>
                {formData.attachments.length > 0 && (
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.attachments.length} ملف مرفق
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg mt-4 transition-colors"
              >
                تقديم الطلب
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-md text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheckCircle className="text-green-500 text-3xl" />
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-2">
              تم استلام طلبك بنجاح!
            </h2>
            <p className="text-gray-600 mb-6">
              رقم متابعة الطلب:{" "}
              <span className="font-semibold">
                RMA-{Math.floor(Math.random() * 1000000)}
              </span>
            </p>

            <p className="text-gray-700 mb-6">
              سيتم مراجعة طلبك خلال 24-48 ساعة. ستصلك رسالة تأكيد على بريدك
              الإلكتروني مع تعليمات إرجاع المنتج.
            </p>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r text-right mb-6">
              <h3 className="font-medium text-purple-800 mb-1">
                تعليمات مهمة:
              </h3>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• احتفظ بالمنتج في عبوته الأصلية</li>
                <li>• لا تستخدم المنتج أثناء انتظار الموافقة</li>
                <li>• سيتصل بك ممثلنا لتحديد طريقة الاستلام</li>
              </ul>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              إنهاء
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default ReturnRequestForm;
