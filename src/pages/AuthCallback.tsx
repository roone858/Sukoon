import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../context/hooks/useAuthContext";
import { toast } from "react-toastify";
import axios from "axios";

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuthContext();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const token = searchParams.get("token");
        if (!token) {
          throw new Error("No token provided");
        }

        // Store the token
        localStorage.setItem("token", token);

        // Fetch user profile
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Update user context
        setUser(response.data);
        
        toast.success("تم تسجيل الدخول بنجاح");
        navigate("/");
      } catch (error) {
        console.error("Auth callback error:", error);
        toast.error("حدث خطأ أثناء تسجيل الدخول");
        navigate("/login");
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [searchParams, navigate, setUser]);

  if (isProcessing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">جاري معالجة تسجيل الدخول...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthCallback; 