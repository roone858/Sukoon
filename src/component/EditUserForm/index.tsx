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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-6 sm:p-12">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
        <h2 className="text-2xl xl:text-3xl font-extrabold text-gray-900 dark:text-white text-center">
          تعديل بيانات المستخدم
        </h2>
        <form onSubmit={handleSubmit(handleOnSubmit)} className="mt-8">
          <div className="mb-5">
            <input
              type="text"
              {...register("name", { required: "هذا الحقل مطلوب" })}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-700 dark:text-white"
              placeholder="الاسم"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="mb-5">
            <input
              type="text"
              {...register("username", { required: "هذا الحقل مطلوب" })}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-700 dark:text-white"
              placeholder="اسم المستخدم"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <input
              type="text"
              {...register("email", { required: "هذا الحقل مطلوب" })}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-700 dark:text-white"
              placeholder="البريد الإلكتروني"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <input
              type="text"
              {...register("role", { required: "هذا الحقل مطلوب" })}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-700 dark:text-white"
              placeholder="الصلاحية"
            />
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          <div className="mb-5">
            <input
              type="file"
              accept="image/*"
              multiple
              // onChange={handleImageChange}
              className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white dark:bg-gray-700 dark:text-white"
            />
            <div className="mt-5 flex flex-wrap gap-2">
              <div className="relative">
                <img
                  loading="lazy"
                  src={user.profilePicture}
                  alt={`معاينة الصورة `}
                  className="w-32 h-32 object-cover rounded-lg"
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
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onCancel}
              className="cursor-pointer tracking-wide font-semibold bg-gray-500 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-600 active:bg-gray-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="cursor-pointer tracking-wide font-semibold bg-purple-800 text-gray-100 w-full py-4 rounded-lg hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
            >
              <svg
                className="w-6 h-6 -mr-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 4v16m8-8H4" />
              </svg>
              <span className="mr-3">حفظ</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
