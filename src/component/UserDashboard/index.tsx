import { useEffect } from "react";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import UserTable from "../UserTable";
import usersService from "../../services/users.service";

const UserDashboard = () => {
  const { updateUsers } = useStoreContext();
  useEffect(() => {
    (async () => {
      const users = await usersService.getAll();
      updateUsers(users);
    })();
  }, [updateUsers]);
  return (
    <div className="p-6  dark:bg-gray-900 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        قائمة المستخدمين
      </h1>
      <UserTable />
    </div>
  );
};

export default UserDashboard;
