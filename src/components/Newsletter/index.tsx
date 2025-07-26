import React, { useState } from "react";
import mattressStack from "../../assets/—Pngtree—stacked mattresses and their appeal_20530721.webp";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق إرسال النشرة البريدية
    setIsSubscribed(true);
    setEmail("");
  };

  return (
      <div className="flex flex-col md:flex-row items-center rounded-xl overflow-hidden ">
        {/* صورة المراتب */}
        <div className="md:w-1/2 lg:w-2/5">
          <img
            src={mattressStack}
            alt="مراتب سكون الفاخرة"
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* محتوى النشرة */}
        <div className=" md:w-1/2 lg:w-3/5 text-right">
          {isSubscribed ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                شكراً لاشتراكك!
              </h3>
              <p className="text-gray-600 mb-6">
                تم اشتراكك بنجاح في نشرتنا البريدية. ستتلقى آخر العروض
                والتخفيضات على بريدك الإلكتروني.
              </p>
              <button
                onClick={() => setIsSubscribed(false)}
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                العودة
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                انضم إلى مجتمع سكون
              </h2>
              <p className="text-purple-600 font-medium mb-2">
                واحصل على خصم 10% على أول طلب لك!
              </p>
              <p className="text-gray-600 mb-6">
                اشترك الآن ليصلك كل جديد عن عروضنا الحصرية على المراتب والأثاث،
                وأحدث تصاميم غرف النوم.
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-1 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="بريدك الإلكتروني"
                    className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  <svg
                    className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <button
                  type="submit"
                  className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors"
                >
                  اشترك الآن
                </button>
              </form>

              <p className="text-xs text-gray-500 mt-4">
                بالاشتراك، أنت توافق على شروط الخصوصية الخاصة بنا. لن نشارك
                بريدك مع أي طرف ثالث.
              </p>
            </>
          )}
        </div>
      </div>
  );
};

export default Newsletter;
