import { ReactNode, useEffect, useState, useCallback } from "react";
import authService from "../../services/auth.service";
import { AuthContext } from "..";
import { emptyUser, User } from "../../util/types";
import { setTokenInAxios } from "../../util/axios";
import {
  getTokenInSessionStorage,
  SetTokenInSessionStorage,
} from "../../util/sessionStorage";
import { toast } from "react-toastify";
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(emptyUser);
  const [loading, setLoading] = useState(true);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await authService.login({
        identifier: email,
        password: password,
      });
      setTokenInAxios(response.access_token);
      SetTokenInSessionStorage(response.access_token);
      setIsAuthenticated(true);
      const userProfile = await authService.getProfile();
      setUser(userProfile);
      toast.success("تم تسجيل الدخول بنجاح");
    } catch {
      toast.error("خطأ في البريد الإلكتروني أو كلمة المرور");
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);
  const verifyAndFetchUser = useCallback(async () => {
    try {
      await authService.verifyToken();
      setIsAuthenticated(true);
      const userProfile = await authService.getProfile();
      setUser(userProfile);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setTokenInAxios();
    if (getTokenInSessionStorage()) {
      verifyAndFetchUser();
    } else {
      setLoading(false); // No token, no need to wait
    }
  }, [verifyAndFetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        setUser,
        setIsAuthenticated,
        isAuthenticated,
        loading,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
