import { useEffect } from "react";
import { useNavigate, Routes, Route, Link, useParams } from "react-router-dom";
import {
  IoPersonOutline,
  IoSettingsOutline,
  IoLocationOutline,
  IoHeartOutline,
  IoBagOutline,
} from "react-icons/io5";
import "./style.css";
import { useAuthContext } from "../../context/useContext/useAuthContext";
import ProfileTab from "./components/ProfileTab";
import OrdersTab from "./components/OrdersTab";
import AddressesTab from "./components/AddressesTab";
import WishlistTab from "./components/WishlistTab";
import SettingsTab from "./components/SettingsTab";

interface Address {
  id: number;
  title: string;
  address: string;
  isDefault: boolean;
}

const ProfilePage = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const { tab } = useParams();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const tabs = [
    {
      id: "profile",
      label: "الملف الشخصي",
      icon: <IoPersonOutline className="w-5 h-5" />,
      path: "/",
    },
    {
      id: "orders",
      label: "طلباتي",
      icon: <IoBagOutline className="w-5 h-5" />,
      path: "orders",
    },
    {
      id: "wishlist",
      label: "المفضلة",
      icon: <IoHeartOutline className="w-5 h-5" />,
      path: "wishlist",
    },
    {
      id: "addresses",
      label: "العناوين",
      icon: <IoLocationOutline className="w-5 h-5" />,
      path: "addresses",
    },
    {
      id: "settings",
      label: "الإعدادات",
      icon: <IoSettingsOutline className="w-5 h-5" />,
      path: "settings",
    },
  ];

  const addresses = [
    {
      id: 1,
      title: "المنزل",
      address: "شارع 123، حي النخيل، الرياض",
      isDefault: true,
    },
    {
      id: 2,
      title: "العمل",
      address: "شارع الملك فهد، برج المملكة، الرياض",
      isDefault: false,
    },
  ] as Address[];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-4">
      <div className="flex flex-col gap-2">
        {/* Horizontal Tabs */}
        <div className="w-full overflow-x-auto rounded-lg shadow p-2 ">
          <div className="bg-white ">
            <div className="flex gap-2 min-w-max">
              {tabs.map((tabItem) => (
                <Link
                  key={tabItem.id}
                  to={`/profile/${tabItem.path}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
                    tab === tabItem.path
                      ? "bg-purple-50 text-purple-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {tabItem.icon}
                  <span>{tabItem.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full">
          <div className="bg-white rounded-lg shadow p-6">
            <Routes>
              <Route path="*" element={<ProfileTab />} />
              <Route path="/orders" element={<OrdersTab />} />
              <Route path="/wishlist" element={<WishlistTab />} />
              <Route
                path="/addresses"
                element={<AddressesTab addresses={addresses} />}
              />
              <Route path="/settings" element={<SettingsTab />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
