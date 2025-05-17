import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUser,
  FiShoppingBag,
  FiHeart,
  FiMapPin,
  FiSettings,
  FiEdit,
  FiLogOut,
  FiChevronRight,
  FiPlus,
} from "react-icons/fi";
import { useAuthContext } from "../../context/hooks/useAuthContext";
import withAuth from "../../HOC/withAuth";
import { useStoreContext } from "../../context/hooks/useStoreContext";
import { useCartContext } from "../../context/hooks/useCartContext";
import UpdateUserForm from "./components/UpdateUserForm";
import { apiUrl } from "../../util/urls";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useAuthContext();
  const { products, removeFromWishlist, orders, fetchOrders } =
    useStoreContext();
  const { addToCart } = useCartContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // الطلبات

  //   const addresses = [];
  // المفضلة
  const favorites = user?.wishlist?.map((productId) =>
    products.find((product) => product.id == productId)
  );
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);
  return (
    <div className="bg-gray-50 min-h-screen pb-16" dir="rtl">
      {/* Header - Sticky على الهواتف */}
      <header className="bg-purple-700 text-white sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-xl font-bold">حسابي</h1>
        </div>
      </header>

      <main className="container mx-auto px-3 xs:px-4 mt-4">
        {/* Profile Card - تصميم مضغوط للهواتف */}
        <section className="bg-white rounded-lg shadow-xs p-4 mb-4 flex items-center">
          <img
            src={
              user?.profilePicture ||
              apiUrl + "/users/profile-picture/default-profile-picture.webp"
            }
            alt="صورة المستخدم"
            className="w-16 h-16 rounded-full border-2 border-purple-100 object-cover"
          />
          <div className="mr-3 flex-1 min-w-0">
            <h2 className="text-lg font-bold text-gray-800 truncate">
              {user?.name}
            </h2>
            <p className="text-gray-600 text-sm truncate">{user?.email}</p>
            <p className="text-gray-500 text-xs mt-1 truncate">
              عضو{" "}
              {user?.createdAt
                ? new Date(user?.createdAt).toLocaleDateString("ar-EG")
                : "غير معلوم"}
            </p>
          </div>
          <FiChevronRight className="text-gray-400" />
        </section>

        {/* Tabs - Scrollable للشاشات الصغيرة */}
        <nav className="bg-white rounded-lg shadow-xs overflow-hidden mb-4">
          <div className="flex overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center px-4 py-3 min-w-max ${
                activeTab === "profile"
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-600"
              }`}
              aria-label="الملف الشخصي"
            >
              <FiUser className="text-lg mb-1" />
              <span className="text-xs">الملف الشخصي</span>
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex flex-col items-center px-4 py-3 min-w-max ${
                activeTab === "orders"
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-600"
              }`}
              aria-label="الطلبات"
            >
              <FiShoppingBag className="text-lg mb-1" />
              <span className="text-xs">الطلبات</span>
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={`flex flex-col items-center px-4 py-3 min-w-max ${
                activeTab === "favorites"
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-600"
              }`}
              aria-label="المفضلة"
            >
              <FiHeart className="text-lg mb-1" />
              <span className="text-xs">المفضلة</span>
            </button>
            <button
              onClick={() => setActiveTab("addresses")}
              className={`flex flex-col items-center px-4 py-3 min-w-max ${
                activeTab === "addresses"
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-600"
              }`}
              aria-label="العناوين"
            >
              <FiMapPin className="text-lg mb-1" />
              <span className="text-xs">العناوين</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex flex-col items-center px-4 py-3 min-w-max ${
                activeTab === "settings"
                  ? "text-purple-700 border-b-2 border-purple-700"
                  : "text-gray-600"
              }`}
              aria-label="الإعدادات"
            >
              <FiSettings className="text-lg mb-1" />
              <span className="text-xs">الإعدادات</span>
            </button>
          </div>
        </nav>

        {/* Tab Content */}
        <section className="bg-white rounded-lg shadow-xs p-4">
          {/* Profile Tab */}
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  {isEditing ? "تعديل المعلومات" : "معلومات الحساب"}
                </h2>
                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="text-purple-700 text-sm flex items-center"
                    aria-label="تعديل الملف الشخصي"
                  >
                    <FiEdit className="ml-1 text-xs" />
                    تعديل
                  </button>
                )}
              </div>

              {isEditing ? (
                user && (
                  <UpdateUserForm
                    user={user}
                    onCancel={() => setIsEditing(false)}
                    onSuccess={() => setIsEditing(false)}
                  />
                )
              ) : (
                <>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">
                        الاسم الكامل
                      </span>
                      <span className="font-medium text-sm">{user?.name}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">
                        البريد الإلكتروني
                      </span>
                      <span className="font-medium text-sm truncate max-w-[150px]">
                        {user?.email}
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600 text-sm">رقم الجوال</span>
                      <span className="font-medium text-sm">
                        {user?.phone || "غير متوفر"}
                      </span>
                    </div>
                  </div>

                  <button
                    className="mt-6 text-red-600 text-sm flex items-center justify-center w-full py-2 border border-red-100 rounded-lg"
                    aria-label="تسجيل الخروج"
                  >
                    <FiLogOut className="ml-1" />
                    تسجيل الخروج
                  </button>
                </>
              )}
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                سجل الطلبات
              </h2>

              {orders.length === 0 ? (
                <EmptyState
                  icon={<FiShoppingBag className="w-10 h-10" />}
                  title="لا توجد طلبات سابقة"
                  actionText="تصفح المنتجات"
                />
              ) : (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      className="border rounded-lg p-3 hover:shadow-xs transition-shadow"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p  className="font-medium text-sm">
                            طلب <span dir="ltr"> {order.orderNumber}#</span>
                          </p>
                          <p className="text-gray-500 text-xs mt-1">
                            {order?.createdAt &&
                              new Date(order?.createdAt).toLocaleDateString(
                                "ar-EG"
                              )}
                          </p>
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-sm">
                            {order.payment.amount}
                          </p>
                          <p
                            className={`text-xs mt-1 ${
                              order.status === "delivered"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {order.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between items-center">
                        <Link
                          to={"/orders/" + order._id}
                          className="text-purple-700 text-xs flex items-center"
                          aria-label="عرض تفاصيل الطلب"
                        >
                          التفاصيل <FiChevronRight className="mr-1" />
                        </Link>
                        {order.status === "delivered" && (
                          <button
                            className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs"
                            aria-label="إعادة طلب"
                          >
                            إعادة طلب
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Favorites Tab */}
          {activeTab === "favorites" && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                قائمة المفضلة
              </h2>

              {favorites?.length === 0 ? (
                <EmptyState
                  icon={<FiHeart className="w-10 h-10" />}
                  title="لا توجد منتجات في المفضلة"
                  actionText="تصفح المنتجات"
                />
              ) : (
                <div className="grid grid-cols-1 gap-3">
                  {favorites?.map((product) => (
                    <div
                      key={product?.id}
                      className="border rounded-lg p-3 flex hover:shadow-xs transition-shadow"
                    >
                      <img
                        src={product?.images[0].url}
                        alt={product?.name}
                        className="w-16 h-16 object-cover rounded self-center"
                        loading="lazy"
                      />
                      <div className="mr-3 flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate">
                          {product?.name}
                        </h3>
                        <p className="text-purple-700 font-bold text-sm mt-1">
                          {product?.finalPrice}
                        </p>
                        <div className="mt-2 flex justify-between">
                          <button
                            onClick={() =>
                              product && removeFromWishlist(product.id)
                            }
                            className="text-red-500 text-xs"
                            aria-label="إزالة من المفضلة"
                          >
                            إزالة
                          </button>
                          <button
                            onClick={() =>
                              product &&
                              addToCart({
                                productId: product.id,
                                quantity: 1,
                                name: product.name,
                                originalPrice: product.price,
                                image: product.images[0]?.url || "",
                                discountPercentage: product.discount || 0,
                                finalPrice: product.finalPrice || product.price,
                                itemTotal: product.finalPrice || product.price,
                              })
                            }
                            className="bg-purple-700 text-white px-2 py-1 rounded text-xs"
                            aria-label="إضافة إلى السلة"
                          >
                            أضف للسلة
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Addresses Tab */}
          {activeTab === "addresses" && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800">
                  عناوين الشحن
                </h2>
                <button
                  className="bg-purple-700 text-white px-3 py-1 rounded-lg text-sm flex items-center"
                  aria-label="إضافة عنوان جديد"
                >
                  <FiPlus className="ml-1 text-xs" />
                  جديد
                </button>
              </div>

              {/* {addresses.length === 0 ? ( */}
              <EmptyState
                icon={<FiMapPin className="w-10 h-10" />}
                title="لا توجد عناوين مسجلة"
              />
              {/* ) : (
                <div className="grid grid-cols-1 gap-3">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`border rounded-lg p-4 relative ${
                        address.isDefault
                          ? "border-purple-300 bg-purple-50"
                          : ""
                      }`}
                    >
                      {address.isDefault && (
                        <span className="absolute top-2 left-2 bg-purple-700 text-white text-xxs px-2 py-0.5 rounded">
                          افتراضي
                        </span>
                      )}
                      <h3 className="font-bold text-sm mb-1">
                        {address.title}
                      </h3>
                      <p className="text-gray-600 text-xs leading-5">
                        {address.details}
                      </p>
                      <div className="mt-3 flex justify-between">
                        <button
                          className="text-purple-700 text-xs"
                          aria-label="تعديل العنوان"
                        >
                          تعديل
                        </button>
                        {!address.isDefault && (
                          <button
                            className="text-gray-600 text-xs"
                            aria-label="تعيين كافتراضي"
                          >
                            تعيين افتراضي
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )} */}
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                إعدادات الحساب
              </h2>

              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-bold text-sm mb-3">تفضيلات الإشعارات</h3>
                  <div className="space-y-3">
                    <ToggleSetting label="إشعارات الطلبات" defaultChecked />
                    <ToggleSetting label="العروض والتخفيضات" defaultChecked />
                    <ToggleSetting label="النشرة البريدية" />
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h3 className="font-bold text-sm mb-3">تغيير كلمة المرور</h3>
                  <form className="space-y-3">
                    <InputField type="password" label="كلمة المرور الحالية" />
                    <InputField type="password" label="كلمة المرور الجديدة" />
                    <InputField type="password" label="تأكيد كلمة المرور" />
                    <button
                      className="bg-purple-700 text-white w-full py-2 rounded-lg text-sm"
                      aria-label="حفظ كلمة المرور الجديدة"
                    >
                      حفظ التغييرات
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation - للهواتف فقط */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 z-10">
        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "profile" ? "text-purple-700" : "text-gray-500"
          }`}
          aria-label="الملف الشخصي"
        >
          <FiUser className="text-lg" />
          <span className="text-xxs mt-1">الملف</span>
        </button>
        <button
          onClick={() => setActiveTab("orders")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "orders" ? "text-purple-700" : "text-gray-500"
          }`}
          aria-label="الطلبات"
        >
          <FiShoppingBag className="text-lg" />
          <span className="text-xxs mt-1">الطلبات</span>
        </button>
        <button
          onClick={() => setActiveTab("favorites")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "favorites" ? "text-purple-700" : "text-gray-500"
          }`}
          aria-label="المفضلة"
        >
          <FiHeart className="text-lg" />
          <span className="text-xxs mt-1">المفضلة</span>
        </button>
        <button
          onClick={() => setActiveTab("addresses")}
          className={`flex flex-col items-center p-2 ${
            activeTab === "addresses" ? "text-purple-700" : "text-gray-500"
          }`}
          aria-label="العناوين"
        >
          <FiMapPin className="text-lg" />
          <span className="text-xxs mt-1">العناوين</span>
        </button>
      </nav>
    </div>
  );
};

// Component for Empty State
const EmptyState = ({
  icon,
  title,
  actionText,
}: {
  icon: React.ReactNode;
  title: string;
  actionText?: string;
}) => (
  <div className="text-center py-6">
    <div className="w-12 h-12 mx-auto text-gray-400 mb-3 flex items-center justify-center">
      {icon}
    </div>
    <p className="text-gray-500 text-sm">{title}</p>
    {actionText && (
      <Link
        to="/products"
        className="mt-3 inline-block bg-purple-700 text-white px-4 py-2 rounded-lg text-sm"
        aria-label={actionText}
      >
        {actionText}
      </Link>
    )}
  </div>
);

// Reusable Toggle Component
const ToggleSetting = ({
  label,
  defaultChecked = false,
}: {
  label: string;
  defaultChecked?: boolean;
}) => (
  <div className="flex justify-between items-center">
    <span className="text-sm">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        defaultChecked={defaultChecked}
        aria-label={label}
      />
      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-purple-700"></div>
    </label>
  </div>
);

// Reusable Input Component
const InputField = ({ type, label }: { type: string; label: string }) => (
  <div>
    <label className="block text-gray-700 text-xs mb-1">{label}</label>
    <input
      type={type}
      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-transparent"
      aria-label={label}
    />
  </div>
);

const AuthGuard = withAuth(ProfilePage);
export default AuthGuard;
