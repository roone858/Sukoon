import { JSX, useState } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import ScrollToTopLink from "../MyLink";

const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer
      className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-right"
      dir="rtl"
    >
      {/* Top Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Brand Info - Always visible */}
          <div className="space-y-4">
            <img
              src={logo}
              alt="شعار إيكوماس"
              className="w-24 -mr-3 -mb-1"
              loading="lazy"
            />
            <ul className="space-y-2">
              <li>العنوان: 1234 شارع الموضة، جناح 567، نيويورك</li>
              <li>
                البريد الإلكتروني: <strong>Mahmoddg15@yahoo.com</strong>
              </li>
              <li>
                الهاتف: <strong>+966 555 493 517</strong>
              </li>
            </ul>
            <Link
              to="/store-locations"
              className="text-gray-900 inline-flex items-center text-sm font-medium hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              احصل على الاتجاهات
              <svg
                className="w-3 h-3 mr-3 text-gray-900"
                viewBox="0 0 8 8"
                fill="currentColor"
              >
                <path d="M0.861539 8L0 7.13846L5.90769 1.23077H0.615385V0H8V7.38462H6.76923V2.09231L0.861539 8Z" />
              </svg>
            </Link>
            <div className="flex space-x-reverse space-x-4 pt-2">
              {[
                {
                  name: "facebook",
                  link: "https://www.facebook.com/share/16AQtjxJ5C/?mibextid=wwXIfr",
                },
                { name: "twitter", link: "https://x.com/mahmodg15?s=21" },
                {
                  name: "instagram",
                  link: "https://www.instagram.com/suko0n.sa?igsh=MWVsYmVwNXcyaHQwaQ%3D%3D&utm_source=qr",
                },
                {
                  name: "snapchat",
                  link: "https://www.snapchat.com/add/mahmodg16?share_id=EUyx0HhPRP-buQa8hmMGMA&locale=ar_EG",
                },
              ].map((social) => (
                <Link
                  key={social.name}
                  to={social.link}
                  target="_blank"
                  className="hover:text-purple-600 m-0 ml-5 border-1 border-black rounded-full p-2 dark:hover:text-purple-400 transition-colors"
                >
                  <SocialIcon platform={social.name} />
                </Link>
              ))}
            </div>
          </div>

          {/* Collapsible Sections for Mobile */}
          <div className="md:hidden space-y-0">
            {/* Help Links - Mobile */}
            <div className="border-b border-gray-200 dark:border-gray-700 py-4">
              <button
                onClick={() => toggleSection("help")}
                className="flex items-center justify-between w-full font-medium text-lg text-gray-900"
              >
                المساعدة
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "help" ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {openSection === "help" && (
                <ul className="pt-3 space-y-2">
                  {[
                    { text: "سياسة الخصوصية", url: "/privacy-policy" },
                    { text: "الإرجاع والاستبدال", url: "/returns-exchanges" },
                    { text: "الشحن", url: "/shipping-policy" },
                    { text: "الشروط والأحكام", url: "/terms-conditions" },
                    { text: "الأسئلة الشائعة", url: "/faq-v2" },
                    { text: "مقارنة", url: "/compare" },
                    { text: "قائمة الرغبات", url: "/wishlist" },
                  ].map((item) => (
                    <li key={item.url}>
                      <ScrollToTopLink
                        to={item.url}
                        className="block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        {item.text}
                      </ScrollToTopLink>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Useful Links - Mobile */}
            <div className="border-b border-gray-200 dark:border-gray-700 py-4">
              <button
                onClick={() => toggleSection("links")}
                className="flex items-center justify-between w-full font-medium text-lg text-gray-900"
              >
                روابط مفيدة
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "links" ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {openSection === "links" && (
                <ul className="pt-3 space-y-2">
                  {[
                    { text: "متجرنا", url: "/our-store-2" },
                    { text: "زيارة متجرنا", url: "/store-locations" },
                    { text: "اتصل بنا", url: "/contact-v1" },
                    { text: "من نحن", url: "/about-us" },
                    { text: "حسابي", url: "/my-account" },
                  ].map((item) => (
                    <li key={item.url}>
                      <Link
                        to={item.url}
                        className="block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Newsletter - Mobile */}
            <div className="border-0 border-gray-200 dark:border-gray-700 py-4">
              <button
                onClick={() => toggleSection("newsletter")}
                className="flex items-center justify-between w-full font-medium text-lg text-gray-900"
              >
                النشرة البريدية
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "newsletter" ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {openSection === "newsletter" && (
                <div className="pt-3 space-y-4">
                  <p>
                    اشترك للحصول على أولوية في عروضنا الجديدة، التخفيضات، محتوى
                    حصري، وأحداث خاصة!
                  </p>
                  <form className="flex flex-col space-y-4">
                    <input
                      type="email"
                      placeholder="بريدك الإلكتروني"
                      className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
                      required
                    />
                    <button
                      type="submit"
                      className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
                    >
                      اشتراك
                      <svg
                        className="w-3 h-3 mr-1"
                        viewBox="0 0 8 8"
                        fill="currentColor"
                      >
                        <path d="M0.861539 8L0 7.13846L5.90769 1.23077H0.615385V0H8V7.38462H6.76923V2.09231L0.861539 8Z" />
                      </svg>
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

          {/* Desktop Help Links - Hidden on mobile */}
          <div className="hidden md:block space-y-4">
            <h3 className="font-medium text-lg">المساعدة</h3>
            <ul className="space-y-2">
              {[
                { text: "سياسة الخصوصية", url: "/privacy-policy" },
                { text: "الإرجاع والاستبدال", url: "/returns-exchanges" },
                { text: "الشحن", url: "/shipping-policy" },
                { text: "الشروط والأحكام", url: "/terms-conditions" },
                { text: "الأسئلة الشائعة", url: "/faq-v2" },
                { text: "مقارنة", url: "/compare" },
                { text: "قائمة الرغبات", url: "/wishlist" },
              ].map((item) => (
                <li key={item.url}>
                  <Link
                    to={item.url}
                    className="block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Useful Links - Hidden on mobile */}
          <div className="hidden md:block space-y-4">
            <h3 className="font-medium text-lg">روابط مفيدة</h3>
            <ul className="space-y-2">
              {[
                { text: "متجرنا", url: "/our-store-2" },
                { text: "زيارة متجرنا", url: "/store-locations" },
                { text: "اتصل بنا", url: "/contact-v1" },
                { text: "من نحن", url: "/about-us" },
                { text: "حسابي", url: "/my-account" },
              ].map((item) => (
                <li key={item.url}>
                  <Link
                    to={item.url}
                    className="block py-1 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Newsletter - Hidden on mobile */}
          <div className="hidden md:block space-y-4">
            <h3 className="font-medium text-lg">النشرة البريدية</h3>
            <p>
              اشترك للحصول على أولوية في عروضنا الجديدة، التخفيضات، محتوى حصري،
              وأحداث خاصة!
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-800 dark:border-gray-700"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
              >
                اشتراك
                <svg
                  className="w-3 h-3 mr-1"
                  viewBox="0 0 8 8"
                  fill="currentColor"
                >
                  <path d="M0.861539 8L0 7.13846L5.90769 1.23077H0.615385V0H8V7.38462H6.76923V2.09231L0.861539 8Z" />
                </svg>
              </button>
            </form>
            <div className="flex space-x-reverse space-x-4 pt-4">
              <LanguageSelector />
              <CurrencySelector />
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-800"></div>

      {/* Bottom Section */}
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <p>© 2025 سكون. جميع الحقوق محفوظة</p>
        <img
          src="https://wpecomus.com/furniture/wp-content/uploads/sites/11/2024/07/footer-payment-img.png"
          alt="طرق الدفع"
          className="h-6 mt-4 md:mt-0"
          loading="lazy"
        />
      </div>
    </footer>
  );
};

// Helper components remain the same as previous example
// ... (SocialIcon, LanguageSelector, CurrencySelector components)

// Helper components (same as before but with Arabic labels)
const SocialIcon = ({ platform }: { platform: string }) => {
  const icons: Record<string, JSX.Element> = {
    facebook: (
      <svg className="w-5 h-5" viewBox="0 0 320 512">
        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" viewBox="0 0 512 512">
        <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
      </svg>
    ),
    instagram: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#000000"
        strokeWidth="0.624"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
            fill="#0F0F0F"
          ></path>{" "}
          <path
            d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z"
            fill="#0F0F0F"
          ></path>{" "}
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z"
            fill="#0F0F0F"
          ></path>{" "}
        </g>
      </svg>
    ),

    snapchat: (
      <svg
        className="w-5 h-5"
        version="1.1"
        id="Layer_1"
        viewBox="0 0 468.339 468.339"
        fill="#000000"
        stroke="#000000"
        strokeWidth="9.835119"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          {" "}
          <path d="M233.962,33.724c62.857,0.021,115.216,52.351,115.292,115.36c0.018,14.758,0.473,28.348,1.306,40.867 c0.514,7.724,6.938,13.448,14.305,13.448c1.085,0,2.19-0.124,3.3-0.384l19.691-4.616c0.838-0.197,1.679-0.291,2.51-0.291 c5.001,0,9.606,3.417,10.729,8.478c1.587,7.152-2.42,14.378-9.35,16.808l-29.89,12.066c-7.546,3.046-11.599,11.259-9.474,19.115 c23.98,88.654,90.959,79.434,90.959,90.984c0,14.504-50.485,16.552-55.046,21.114s-0.198,26.701-10.389,30.987 c-1.921,0.808-4.65,1.089-7.979,1.089c-7.676,0-18.532-1.498-29.974-1.498c-9.925,0-20.291,1.127-29.404,5.337 c-24.176,11.168-47.484,32.028-76.378,32.028s-52.202-20.86-76.378-32.028c-9.115-4.211-19.478-5.337-29.404-5.337 c-11.441,0-22.299,1.498-29.974,1.498c-3.327,0-6.059-0.282-7.979-1.089c-10.191-4.286-5.828-26.425-10.389-30.987 S25,360.062,25,345.558c0-11.551,66.979-2.331,90.959-90.984c2.125-7.855-1.928-16.068-9.475-19.115l-29.89-12.066 c-6.931-2.43-10.938-9.656-9.35-16.808c1.123-5.062,5.728-8.479,10.729-8.478c0.83,0,1.672,0.094,2.51,0.291l19.691,4.616 c1.11,0.26,2.215,0.384,3.3,0.384c7.366,0,13.791-5.725,14.305-13.448c0.833-12.519,1.289-26.109,1.307-40.867 C119.162,86.075,171.104,33.746,233.962,33.724 M233.97,8.724h-0.009h-0.009C215.19,8.73,196.913,12.5,179.631,19.93 c-16.589,7.131-31.519,17.299-44.375,30.222c-12.839,12.906-22.943,27.889-30.031,44.533c-7.37,17.307-11.118,35.599-11.141,54.368 c-0.011,9.215-0.202,18.158-0.57,26.722l-7.326-1.718c-2.688-0.63-5.452-0.95-8.213-0.951c-7.973-0.001-15.838,2.694-22.146,7.588 c-6.581,5.106-11.196,12.377-12.993,20.474c-4.277,19.273,6.365,38.73,24.807,45.572l21.937,8.855 c-14.526,44.586-41.311,53.13-59.348,58.885c-4.786,1.527-8.92,2.846-12.856,4.799C1.693,327.063,0,340.25,0,345.558 c0,10.167,4.812,19.445,13.551,26.124c4.351,3.326,9.741,6.07,16.477,8.389c9.181,3.161,19.824,5.167,28.474,6.775 c0.418,3.205,1.031,6.648,2.064,10.118c4.289,14.411,13.34,20.864,20.178,23.739c6.488,2.729,13.192,3.044,17.67,3.044 c4.38,0,9.01-0.343,13.912-0.706c5.259-0.39,10.697-0.792,16.062-0.792c8.314,0,14.503,0.992,18.92,3.032 c6.065,2.802,12.497,6.58,19.307,10.579c18.958,11.134,40.445,23.754,67.555,23.754s48.596-12.62,67.554-23.754 c6.81-4,13.242-7.777,19.308-10.579c4.417-2.041,10.606-3.032,18.92-3.032c5.365,0,10.803,0.403,16.061,0.792 c4.902,0.363,9.532,0.706,13.912,0.706c4.478,0,11.181-0.315,17.67-3.044c6.838-2.875,15.889-9.328,20.178-23.739 c1.033-3.47,1.647-6.913,2.064-10.118c8.65-1.609,19.294-3.614,28.474-6.775c6.737-2.319,12.126-5.063,16.477-8.389 c8.738-6.679,13.551-15.957,13.551-26.124c0-5.308-1.693-18.495-17.378-26.278c-3.936-1.953-8.07-3.272-12.856-4.799 c-18.037-5.754-44.822-14.299-59.348-58.885l21.936-8.855c18.442-6.842,29.085-26.3,24.808-45.573 c-1.797-8.097-6.412-15.368-12.993-20.474c-6.308-4.893-14.171-7.588-22.142-7.588c-2.761,0-5.525,0.32-8.215,0.95l-7.327,1.718 c-0.368-8.563-0.559-17.506-0.57-26.722c-0.023-18.784-3.801-37.094-11.23-54.424c-7.131-16.636-17.29-31.615-30.194-44.522 c-12.903-12.906-27.875-23.063-44.498-30.188C271.017,12.497,252.727,8.731,233.97,8.724L233.97,8.724z"></path>{" "}
        </g>
      </svg>
    ),
  };

  return icons[platform] || null;
};

const LanguageSelector = () => (
  <div className="relative group">
    <button className="flex items-center text-sm">
      العربية
      <svg className="w-3 h-3 mr-1" viewBox="0 0 12 7" fill="currentColor">
        <path d="M0.738281 1.23813L6.23828 6.73813L11.7383 1.23813L10.762 0.261879L6.23828 4.78563L1.71453 0.261879L0.738281 1.23813Z" />
      </svg>
    </button>
    <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded mt-1 z-10 min-w-[120px] left-0">
      <ul>
        <li>
          <Link
            to="?lang=ar"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-right"
          >
            العربية
          </Link>
        </li>
        <li>
          <Link
            to="?lang=en"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-right"
          >
            English
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

const CurrencySelector = () => (
  <div className="relative group">
    <button className="flex items-center text-sm">
      <img
        src="https://wpecomus.com/fashion/wp-content/uploads/sites/2/2024/08/sa.svg"
        alt="SAR"
        className="w-4 h-4 ml-1"
      />
      ر.س
      <svg className="w-3 h-3 mr-1" viewBox="0 0 12 7" fill="currentColor">
        <path d="M0.738281 1.23813L6.23828 6.73813L11.7383 1.23813L10.762 0.261879L6.23828 4.78563L1.71453 0.261879L0.738281 1.23813Z" />
      </svg>
    </button>
    <div className="absolute hidden group-hover:block bg-white dark:bg-gray-800 shadow-lg rounded mt-1 z-10 min-w-[180px] left-0">
      <ul>
        <li>
          <Link
            to="?currency=SAR"
            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 justify-end"
          >
            ريال سعودي (ر.س)
            <img
              src="https://wpecomus.com/fashion/wp-content/uploads/sites/2/2024/08/sa.svg"
              alt="SAR"
              className="w-4 h-4 mr-2"
            />
          </Link>
        </li>
        <li>
          <Link
            to="?currency=USD"
            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 justify-end"
          >
            دولار أمريكي ($)
            <img
              src="https://wpecomus.com/fashion/wp-content/uploads/sites/2/2024/08/us.svg"
              alt="USD"
              className="w-4 h-4 mr-2"
            />
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Footer;
