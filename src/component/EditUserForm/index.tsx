import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { User } from "../../util/types";

interface EditUserFormProps {
  user: User;
  onSubmit: (data: {
    _id: string;
    name: string;
    username: string;
    email: string;
    role?: "admin" | "user";
  }) => void;
  onCancel: () => void;
}

interface FormInputs {
  name: string;
  username: string;
  email: string;
  role?: "admin" | "user";
}

const EditUserForm: React.FC<EditUserFormProps> = ({
  user,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });

  const handleOnSubmit: SubmitHandler<FormInputs> = (data) => {
    onSubmit({
      _id: user._id || "",
      ...data,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          تعديل بيانات المستخدم 
        </h2>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الاسم
            </label>
            <input
              type="text"
              {...register("name", { required: "هذا الحقل مطلوب" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              اسم المستخدم
            </label>
            <input
              type="text"
              {...register("username", { required: "هذا الحقل مطلوب" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              email
            </label>
            <input
              type="text"
              {...register("email", { required: "هذا الحقل مطلوب" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              الصلاحية
            </label>
            <input
              type="text"
              {...register("role", { required: "هذا الحقل مطلوب" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              صورة البروفايل
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              // onChange={handleImageChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white"
            />
            <div className="mt-4 flex flex-wrap gap-2">
              <div className="relative">
                <img
                  src={user.profilePicture}
                  alt={`معاينة الصورة `}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                {/* <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    &times;
                  </button> */}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-gray-600"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
            >
              حفظ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
