import React, { useState } from "react";
import { toast } from "react-toastify";
import { useStoreContext } from "../../context/useContext/useStoreContext";
import { User } from "../../util/types";
import usersService from "../../services/users.service";
import EditUserForm from "../EditUserForm";
import { apiUrl } from "../../util/urls";

const UserTable: React.FC = () => {
  const { users, updateUsers } = useStoreContext();
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleDelete = async (id: string) => {
    toast.info(
      <DeleteConfirmation
        onConfirm={async () => {
          const user = await usersService.delete(id);
          if (user) {
            updateUsers(users.filter((user) => user._id !== id));
            toast.success("تم حذف المستخدم بنجاح!");
          }
          toast.dismiss();
        }}
        onCancel={() => toast.dismiss()}
      />,
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
    if (res) {
      updateUsers(
        users.map((user) =>
          user._id === updatedUser._id ? { ...user, ...updatedUser } : user
        )
      );
      setEditingUser(null);
      toast.success("تم تحديث البيانات بنجاح!");
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-right rtl:text-right text-gray-500 dark:text-gray-400">
        <TableHeader />
        <tbody>
          {users?.map((user, index) => (
            <UserRow
              key={user._id}
              user={user}
              index={index}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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

// Delete Confirmation Component
const DeleteConfirmation: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => (
  <div>
    <p>هل أنت متأكد من أنك تريد حذف هذا المستخدم؟</p>
    <div className="flex justify-end mt-2">
      <button
        onClick={onConfirm}
        className="bg-red-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-red-600 transition-colors"
      >
        نعم
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600 transition-colors"
      >
        لا
      </button>
    </div>
  </div>
);

// Table Header Component
const TableHeader: React.FC = () => (
  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    <tr>
      <th scope="col" className="px-6 py-3">
        الاسم
      </th>
      <th scope="col" className="px-6 py-3">
        اسم المستخدم
      </th>
      <th scope="col" className="px-6 py-3">
        البريد الإلكتروني
      </th>
      <th scope="col" className="px-6 py-3">
        الصلاحية
      </th>
      <th scope="col" className="px-6 py-3">
        الإجراء
      </th>
    </tr>
  </thead>
);

// User Row Component
const UserRow: React.FC<{
  user: User;
  index: number;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}> = ({ user, index, onEdit, onDelete }) => (
  <tr
    className={`${
      index % 2 === 0
        ? "bg-white dark:bg-gray-900"
        : "bg-gray-50 dark:bg-gray-800"
    } border-b dark:border-gray-700 border-gray-200`}
  >
    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      <div className="flex items-center">
        <img
          className="w-10 h-10 ml-2 rounded-full"
          src={`${apiUrl}/users/profile-picture/default-profile-picture.webp`}
          alt={user.name}
        />
        {user.name}
      </div>
    </td>
    <td className="px-6 py-4">{user.username}</td>
    <td className="px-6 py-4">{user.email}</td>
    <td className="px-6 py-4">{user.role}</td>
    <td className="px-6 py-4">
      {user.role !== "admin" ? (
        <>
          <button
            onClick={() => onEdit(user)}
            className="font-medium cursor-pointer text-purple-600 dark:text-purple-500 hover:underline mr-4"
          >
            تعديل
          </button>
          <button
            onClick={() => onDelete(user._id || "")}
            className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
          >
            حذف
          </button>
        </>
      ) : (
        <span className="text-xs text-gray-500">لا يمكن اتخاذ إجراء مع المسئول</span>
      )}
    </td>
  </tr>
);

export default UserTable;