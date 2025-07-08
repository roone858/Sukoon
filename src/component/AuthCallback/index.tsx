// AuthCallback.tsx
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage";
import { useAuthContext } from "../../context/hooks/useAuthContext";
import { setTokenInSessionStorage } from "../../util/sessionStorage";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { verifyAndFetchUser, user } = useAuthContext();

  useEffect(() => {
    const token = searchParams.get("token");

    const handleAuth = async () => {
      if (!token) {
        throw new Error("Authentication token missing");
      }

      setTokenInSessionStorage(token);
      window.location.href = "/";
    };

    handleAuth();
  }, [navigate, searchParams, user, verifyAndFetchUser]);

  return <LoadingPage />;
};

export default AuthCallback;
