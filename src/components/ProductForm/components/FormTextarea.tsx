import { UseFormRegisterReturn, FieldError } from "react-hook-form";

type FormTextareaProps = {
  label: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

export const FormTextarea = ({
  label,
  register,
  error,
  required = false,
  placeholder = "",
  className = "",
}: FormTextareaProps) => (
  <div className={`space-y-2 ${className}`}>
    <label className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      {...register}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
        error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-purple-500"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
  </div>
);