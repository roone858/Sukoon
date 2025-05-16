// components/UpdateUserForm.tsx
import { useState, useRef, ChangeEvent } from "react";
import { FiUpload, FiCheckCircle } from "react-icons/fi";
import { User } from "../../../util/types";
import { useAuthContext } from "../../../context/hooks/useAuthContext";

interface UpdateUserFormProps {
  user: User;
  onCancel: () => void;
  onSuccess: () => void;
}

export interface UserUpdateData {
  name: string;
  email: string;
  phone?: string;
  profilePicture?: File | string;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  user,
  onCancel,
  onSuccess,
}) => {
  const [formData, setFormData] = useState<UserUpdateData>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    profilePicture: user?.profilePicture || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.profilePicture || null
  );
  const [isEmailVerified] = useState(user?.emailConfirmed || false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateAuthenticatedUser} = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      // Store the File object in formData
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
      }));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create FormData object
      const formDataToSend = new FormData();

      // Append all fields to FormData
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      if (formData.phone) {
        formDataToSend.append("phone", formData.phone);
      }

      // Append the image file if it exists
      if (formData.profilePicture instanceof File) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      } else if (typeof formData.profilePicture === "string") {
        // If it's a string (existing URL), send it as is
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      // Update headers to multipart/form-data
      await updateAuthenticatedUser(formDataToSend);
      onSuccess();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Profile Picture Upload */}
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <img
            src={imagePreview || "/default-avatar.webp"}
            alt="Profile preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-purple-200"
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="absolute bottom-0 right-0 bg-purple-700 text-white p-2 rounded-full"
          >
            <FiUpload size={16} />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>

      {/* Name Field */}
      <div>
        <label className="block text-gray-700 text-sm mb-1">الاسم الكامل</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          required
        />
      </div>

      {/* Email Field with Verification Status */}
      <div>
        <div className="flex justify-between items-center mb-1">
          <label className="block text-gray-700 text-sm">
            البريد الإلكتروني
          </label>
          {isEmailVerified && (
            <span className="flex items-center text-green-600 text-xs">
              <FiCheckCircle className="ml-1" />
              مفعل
            </span>
          )}
        </div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          required
          disabled={isEmailVerified} // Disable if email is verified
        />
        {!isEmailVerified && (
          <button
            type="button"
            className="text-purple-700 text-xs mt-1"
            onClick={() => {
              // Add your email verification logic here
              alert("تم إرسال رابط التفعيل إلى بريدك الإلكتروني");
            }}
          >
            إرسال رابط التفعيل
          </button>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-gray-700 text-sm mb-1">رقم الجوال</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone || ""}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
          placeholder="+966XXXXXXXXX"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-600 px-4 py-2 rounded-lg border border-gray-300 text-sm"
          disabled={isLoading}
        >
          إلغاء
        </button>
        <button
          type="submit"
          className="bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center justify-center min-w-24"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              جاري الحفظ...
            </>
          ) : (
            "حفظ التغييرات"
          )}
        </button>
      </div>
    </form>
  );
};

export default UpdateUserForm;
