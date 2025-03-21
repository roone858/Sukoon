import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStoreContext } from "../../context/useContext/useStoreContext";

import { User } from "../../util/types";
import usersService from "../../services/users.service";
import EditUserForm from "../EditUserForm";
import { apiUrl } from "../../util/urls";

const UserTable: React.FC = () => {
  const { users } = useStoreContext();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDelete = (id: string) => {
    toast.info(
      <div>
        <p>هل أنت متأكد من أنك تريد حذف هذا المستخدم</p>
        <div className="flex justify-end mt-2">
          <button
            onClick={async () => {
              await usersService.delete(id);
              toast.dismiss();
              toast.success("تم حذف المستخدم بنجاح!");
            }}
            className="bg-red-500 text-white px-3 py-1 rounded-md mr-2"
          >
            نعم
          </button>
          <button
            onClick={() => toast.dismiss()}
            className="bg-gray-500 text-white px-3 py-1 rounded-md"
          >
            لا
          </button>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: false,
        closeButton: false,
        draggable: false,
      }
    );
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };
  const handleSave = async (updatedUser: User) => {
    const res = await usersService.update(updatedUser, null);
    // setProducts(
    //   products.map((product) =>
    //     product._id === editingProduct?._id
    //       ? { ...product, ...updatedProduct }
    //       : product
    //   )
    // );
    console.log(res);
    setEditingUser(null);
    toast.success("تم تحديث البيانات بنجاح!");
  };
  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-right rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              الاسم
            </th>
            <th scope="col" className="px-6 py-3">
              اسم المستخدم
            </th>
            <th scope="col" className="px-6 py-3">
              الاميل
            </th>
            <th scope="col" className="px-6 py-3">
              الصلاحية
            </th>
            <th scope="col" className="px-6 py-3">
              الإجراء
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50 dark:bg-gray-800"
              } border-b dark:border-gray-700 border-gray-200`}
            >
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                <div className="flex items-center">
                  <img
                    className="w-10 h-10 ml-2"
                    src={`${apiUrl}/users/profile-picture/default-profile-picture.webp`}
                    alt=""
                  />
                  {user.name}
                </div>
              </th>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.role}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleEdit(user)}
                  className="font-medium text-purple-600 dark:text-purple-500 hover:underline"
                >
                  تعديل
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingUser && (
        <EditUserForm
          user={editingUser}
          onSubmit={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default UserTable;
