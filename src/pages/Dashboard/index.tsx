import { useState } from "react";
import withAdminAuth from "../../HOC/withAdminAuth";
import ScrollToTopLink from "../../component/MyLink";

function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false); // حالة إظهار/إخفاء الشريط الجانبي
  const [activePage, setActivePage] = useState("dashboard"); // حالة الصفحة النشطة

  const data = [
    { name: "يناير", sales: 4000 },
    { name: "فبراير", sales: 3000 },
    { name: "مارس", sales: 5000 },
    { name: "أبريل", sales: 7000 },
    { name: "مايو", sales: 6000 },
    { name: "يونيو", sales: 8000 },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "statistics":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-purple-800">الإحصائيات</h1>
            <p className="mt-4 text-gray-700">
              هنا يمكنك عرض الإحصائيات الخاصة بك.
            </p>
          </div>
        );
      case "orders":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-purple-800">الطلبات</h1>
            <p className="mt-4 text-gray-700">هنا يمكنك إدارة الطلبات.</p>
          </div>
        );
      case "customers":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-purple-800">العملاء</h1>
            <p className="mt-4 text-gray-700">
              هنا يمكنك إدارة بيانات العملاء.
            </p>
          </div>
        );
      case "products":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold text-purple-800">المنتجات</h1>
            <p className="mt-4 text-gray-700">هنا يمكنك إدارة المنتجات.</p>
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-3xl font-bold text-purple-800 mb-6">
              لوحة تحكم المدير
            </h1>
            {/* البطاقات */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <a
                href="/sales"
                className="bg-white p-6 rounded-lg shadow-lg flex items-center hover:bg-purple-50 transition border border-purple-100"
              >
                <span className="text-purple-800 text-3xl">💰</span>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-purple-800">
                    إجمالي المبيعات
                  </h2>
                  <p className="text-2xl font-bold text-gray-700">$45,000</p>
                </div>
              </a>
              <a
                href="/orders"
                className="bg-white p-6 rounded-lg shadow-lg flex items-center hover:bg-purple-50 transition border border-purple-100"
              >
                <span className="text-purple-800 text-3xl">📦</span>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-purple-800">
                    الطلبات
                  </h2>
                  <p className="text-2xl font-bold text-gray-700">1,200</p>
                </div>
              </a>
              <a
                href="/customers"
                className="bg-white p-6 rounded-lg shadow-lg flex items-center hover:bg-purple-50 transition border border-purple-100"
              >
                <span className="text-purple-800 text-3xl">👥</span>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-purple-800">
                    العملاء
                  </h2>
                  <p className="text-2xl font-bold text-gray-700">5,430</p>
                </div>
              </a>
              <a
                href="/products"
                className="bg-white p-6 rounded-lg shadow-lg flex items-center hover:bg-purple-50 transition border border-purple-100"
              >
                <span className="text-purple-800 text-3xl">🛒</span>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-purple-800">
                    المنتجات المتاحة
                  </h2>
                  <p className="text-2xl font-bold text-gray-700">320</p>
                </div>
              </a>
            </div>

            {/* نظرة عامة على المبيعات */}
            <div className="mt-6 bg-white p-6 rounded-lg shadow-lg border border-purple-100">
              <h2 className="text-xl font-semibold mb-4 text-purple-800">
                نظرة عامة على المبيعات
              </h2>
              <div className="grid grid-cols-6 gap-2">
                {data.map((item, index) => (
                  <div key={index} className="text-center">
                    <div
                      className="bg-gradient-to-b from-purple-400 to-purple-600 h-10 rounded-t-lg"
                      style={{ height: `${item.sales / 100}px` }}
                    ></div>
                    <p className="text-gray-700">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* الشريط الجانبي */}
      <div
        className={`w-64 bg-gradient-to-b from-purple-800 to-purple-900 text-white p-4 transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 shadow-lg`}
      >
        <h2 className="text-xl font-bold mb-4 flex items-center">
          <svg
            className="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
          لوحة التحكم
        </h2>
        <ul>
          <li
            className="p-2 hover:bg-purple-700 cursor-pointer flex items-center rounded-lg transition"
            onClick={() => setActivePage("statistics")}
          >
            📊 الإحصائيات
          </li>
          <li
            className="p-2 hover:bg-purple-700 cursor-pointer flex items-center rounded-lg transition"
            onClick={() => setActivePage("orders")}
          >
            📦 الطلبات
          </li>
          <li
            className="p-2 hover:bg-purple-700 cursor-pointer flex items-center rounded-lg transition"
            onClick={() => setActivePage("customers")}
          >
            👥 العملاء
          </li>
          <li
            className="p-2 hover:bg-purple-700 cursor-pointer flex items-center rounded-lg transition"
            onClick={() => setActivePage("products")}
          >
            🛒 المنتجات
          </li>
          <li className="p-2 hover:bg-purple-700 cursor-pointer flex items-center rounded-lg transition">
          🛒    <ScrollToTopLink to={"/"}>الصفحة الرئيسية</ScrollToTopLink>
          </li>
        </ul>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 p-6">
        <button
          className="md:hidden mb-4 p-2 bg-purple-800 text-white rounded hover:bg-purple-700 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "إخفاء القائمة" : "إظهار القائمة"}
        </button>

        {renderPage()}
      </div>
    </div>
  );
}

const ProtectDashboard = withAdminAuth(AdminDashboard);
export default ProtectDashboard;
