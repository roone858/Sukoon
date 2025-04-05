import React, { useState } from "react";
import logo from "../../assets/logo.png";
import authService from "../../services/auth.service";
import { User } from "../../util/types";
import { toast } from "react-toastify";
import { SetTokenInSessionStorage } from "../../util/sessionStorage";
import { useAuthContext } from "../../context/hooks/useAuthContext";

// Define the User type

// Reusable Button Component
const SocialButton = ({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}) => (
  <button
    className="w-full max-w-xs font-bold shadow-sm rounded-lg py-2  sm:py-3 bg-purple-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-2 xs:mt-3 sm:mt-5"
    onClick={onClick}
  >
    <div className="bg-white p-2 rounded-full">{icon}</div>
    <span className="mr-4 text-sm">{text}</span>
  </button>
);

// Reusable Input Component with error handling
export const InputField = ({
  type,
  placeholder,
  onChange,
  name,
  value = "",
  error,
}: {
  type: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
  error?: string;
}) => (
  <div className="w-full">
    <input
      className={`w-full px-6 sm:px-8 py-4 rounded-lg font-medium bg-gray-100 border ${
        error ? "border-red-500" : "border-gray-200"
      } placeholder-gray-500 text-xs xs:text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5`}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
      value={value}
    />
    {error && <p className="text-red-500 text-xs mt-1 text-right">{error}</p>}
  </div>
);

// Reusable Divider Component
const Divider = ({ text }: { text: string }) => (
  <div className="my-6 xs:my-8 sm:my-12 border-b text-center">
    <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
      {text}
    </div>
  </div>
);

// Validation functions
const validateEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const validatePassword = (password: string) => {
  return password.length >= 8;
};

const validateUsername = (username: string) => {
  return /^[a-zA-Z0-9_]+$/.test(username) && username.length >= 3;
};

// Main SignUpPage Component
const SignUpPage = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { setUser } = useAuthContext();
  const [data, setData] = useState<User>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    if (!data.name.trim()) {
      newErrors.name = "الاسم مطلوب";
      isValid = false;
    }

    if (!data.username.trim()) {
      newErrors.username = "اسم المستخدم مطلوب";
      isValid = false;
    } else if (!validateUsername(data.username)) {
      newErrors.username =
        "اسم المستخدم يجب أن يحتوي على أحرف وأرقام فقط وأن يكون 3 أحرف على الأقل";
      isValid = false;
    }

    if (!data.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
      isValid = false;
    } else if (!validateEmail(data.email)) {
      newErrors.email = "البريد الإلكتروني غير صالح";
      isValid = false;
    }

    if (!data.password) {
      newErrors.password = "كلمة المرور مطلوبة";
      isValid = false;
    } else if (!validatePassword(data.password)) {
      newErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل";
      isValid = false;
    }

    if (!data.confirmPassword) {
      newErrors.confirmPassword = "تأكيد كلمة المرور مطلوب";
      isValid = false;
    } else if (data.password !== data.confirmPassword) {
      newErrors.confirmPassword = "كلمة المرور وتأكيدها غير متطابقين";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleGoogleSignUp = () => {
    toast.info("تسجيل الدخول عبر Google قريبًا");
  };

  const handleGitHubSignUp = () => {
    toast.info("تسجيل الدخول عبر facebook قريبًا");
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
 

    if (!validateForm()) {
      return;
    }

    // setIsLoading(true);
    try {
      // Call the auth service
      const res = await authService.signup(data);
      console.log(res.message);
      // Handle the response
      if (res.success) {
        toast.success("تم التسجيل بنجاح");
        SetTokenInSessionStorage(res.access_token);
        setUser(res.user); // Save token in session storage
        window.location.href = "/"; // Redirect to the dashboard or another page
      } else {
        setServerError(res.message || "حدث خطأ أثناء التسجيل");
      }
    } catch (err) {
      console.log(err);
      // Handle unexpected errors
      console.error("حدث خطأ غير متوقع:", err);
   setServerError("حدث خطأ أثناء الاتصال بالخادم");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="w-full max-w-4xl bg-white shadow sm:rounded-lg flex justify-center flex-1">
        {/* Left Side (Form) */}
        <div className="lg:w-1/2 xl:w-5/12 p-4 xs:p-6  sm:p-8">
          <div>
            <img src={logo} className=" w-18 xs:w-32 mx-auto" alt="شعار" />
          </div>
          <div className="mt-2 flex flex-col items-center">
            <h1 className="text-lg  xs:text-xl sm:text-2xl xl:text-3xl font-extrabold">
              تسجيل جديد
            </h1>
            <div className="w-full flex-1 mt-8">
              {/* Social Sign-Up Buttons */}
              <div className="flex flex-col items-center">
                <SocialButton
                  icon={
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  }
                  text="التسجيل عبر Google"
                  onClick={handleGoogleSignUp}
                />
                <SocialButton
                  icon={
                    <svg className="w-6" viewBox="0 0 32 32">
                      <path
                        fillRule="evenodd"
                        d="M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z"
                      />
                    </svg>
                  }
                  text="التسجيل عبر facebook"
                  onClick={handleGitHubSignUp}
                />
              </div>

              {/* Divider */}
              <Divider text="أو التسجيل باستخدام البريد الإلكتروني" />

              {/* Input Fields */}
              <form onSubmit={handleEmailSignUp} className="mx-auto max-w-xs">
                <InputField
                  type="text"
                  placeholder="الاسم"
                  name="name"
                  onChange={handleChangeInput}
                  value={data.name}
                  error={errors.name}
                />
                <InputField
                  type="text"
                  placeholder="اسم المستخدم"
                  name="username"
                  onChange={handleChangeInput}
                  value={data.username}
                  error={errors.username}
                />
                <InputField
                  type="email"
                  placeholder="البريد الإلكتروني"
                  name="email"
                  onChange={handleChangeInput}
                  value={data.email}
                  error={errors.email}
                />
                <InputField
                  type="password"
                  placeholder="كلمة المرور"
                  name="password"
                  onChange={handleChangeInput}
                  value={data.password}
                  error={errors.password}
                />
                <InputField
                  type="password"
                  placeholder="تأكيد كلمة المرور"
                  name="confirmPassword"
                  onChange={handleChangeInput}
                  value={data.confirmPassword}
                  error={errors.confirmPassword}
                />
                {serverError && (
                  <div className="text-red-500 text-sm mb-4 text-center">
                    {serverError}
                  </div>
                )}
                <button
                  type="submit"
                  className="mt-5  text-sm xs:text-base cursor-pointer tracking-wide font-semibold bg-purple-800 text-gray-100 w-full py-3 xs:py-4 rounded-lg hover:bg-purple-900 active:bg-purple-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  // disabled={isLoading}
                >
        
                    {/* <LoadingSpinner /> */}
             
                    <>
                      <svg
                        className="w-6 h-6 -mr-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="mr-3">تسجيل</span>
                    </>
                  
                </button>
                <p className="mt-6 text-xs text-gray-600 text-center">
                  أوافق على الالتزام بـ
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    شروط الخدمة
                  </a>
                  و
                  <a
                    href="#"
                    className="border-b border-gray-500 border-dotted"
                  >
                    سياسة الخصوصية
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Right Side (Illustration) */}
        <div className="flex-1 bg-purple-100 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage:
                "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
