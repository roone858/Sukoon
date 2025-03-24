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
    <div className="relative">
      {/* Mobile View - Cards */}
      <div className="sm:hidden space-y-3">
        {users?.map((user) => (
          <UserCard 
            key={user._id}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden sm:block overflow-x-auto shadow-md sm:rounded-lg">
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
      </div>

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

// Mobile User Card Component
const UserCard: React.FC<{
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}> = ({ user, onEdit, onDelete }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 border border-gray-200 dark:border-gray-700">
    <div className="flex items-start gap-3">
      <img
        className="w-12 h-12 rounded-full object-cover"
        src={`${apiUrl}/users/profile-picture/default-profile-picture.webp`}
        alt={user.name}
      />
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          @{user.username}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        
        <div className="flex justify-between items-center mt-3">
          <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
            {user.role}
          </span>
          
          {user.role !== "admin" && (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(user)}
                className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-300 px-2 py-1 rounded"
              >
                تعديل
              </button>
              <button
                onClick={() => onDelete(user._id || "")}
                className="text-xs bg-red-100 dark:bg-red-900/50 text-red-600 dark:text-red-300 px-2 py-1 rounded"
              >
                حذف
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

// Delete Confirmation Component
const DeleteConfirmation: React.FC<{
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ onConfirm, onCancel }) => (
  <div className="text-right">
    <p>هل أنت متأكد من أنك تريد حذف هذا المستخدم؟</p>
    <div className="flex justify-end gap-3 mt-3">
      <button
        onClick={onConfirm}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition-colors"
      >
        نعم
      </button>
      <button
        onClick={onCancel}
        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1.5 rounded-md text-sm transition-colors"
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
      <th scope="col" className="px-4 py-3">
        الاسم
      </th>
      <th scope="col" className="px-4 py-3">
        اسم المستخدم
      </th>
      <th scope="col" className="px-4 py-3">
        البريد الإلكتروني
      </th>
      <th scope="col" className="px-4 py-3">
        الصلاحية
      </th>
      <th scope="col" className="px-4 py-3">
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
    } border-b dark:border-gray-700`}
  >
    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      <div className="flex items-center justify-start">
      <img
          className="w-8 h-8 ml-2 rounded-full object-cover"
          src={`${apiUrl}/users/profile-picture/default-profile-picture.webp`}
          alt={user.name}
        />
        {user.name}
  
      </div>
    </td>
    <td className="px-4 py-3">{user.username}@</td>
    <td className="px-4 py-3">{user.email}</td>
    <td className="px-4 py-3">
      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700">
        {user.role}
      </span>
    </td>
    <td className="px-4 py-3 space-x-2 space-x-reverse">
      {user.role !== "admin" ? (
        <>
          <button
            onClick={() => onEdit(user)}
            className="font-medium text-purple-600 dark:text-purple-500 hover:underline text-sm"
          >
            تعديل
          </button>
          <button
            onClick={() => onDelete(user._id || "")}
            className="font-medium text-red-600 dark:text-red-500 hover:underline text-sm"
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