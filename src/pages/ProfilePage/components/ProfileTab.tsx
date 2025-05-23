import { useAuthContext } from "../../../context/hooks/useAuthContext";
import { useStoreContext } from "../../../context/hooks/useStoreContext";
import { apiUrl } from "../../../util/urls";
import NotFoundPage from "../../NotFoundPage";

const ProfileTab = () => {
  const { orders } = useStoreContext();
  const { user } = useAuthContext();
  if (!user) return <NotFoundPage />;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <img
          src={`${apiUrl}/users/profile-picture/${user.profilePicture}`}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-purple-100"
        />
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">
            {/* عضو منذ {new Date(user.joinDate).toLocaleDateString("ar-SA")} */}
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="profile-card">
          <h3 className="text-lg font-medium mb-4">المعلومات الشخصية</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-500">البريد الإلكتروني</span>
              <span>{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">رقم الهاتف</span>
              {/* <span>{user.phone}</span> */}
            </div>
          </div>
        </div>

        <div className="profile-card">
          <h3 className="text-lg font-medium mb-4">إحصائيات</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {orders.length}
              </div>
              <div className="text-sm text-gray-500">إجمالي الطلبات</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {Array.from([1, 2, 3, 4]).length}
              </div>
              <div className="text-sm text-gray-500">منتجات في المفضلة</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
