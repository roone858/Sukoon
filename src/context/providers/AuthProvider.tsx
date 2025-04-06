// AuthProvider.tsx
import { ReactNode, useEffect, useState, useCallback, useMemo } from "react";
import authService from "../../services/auth.service";
import { AuthContext } from "..";
import { emptyUser, User } from "../../util/types";
import { setTokenInAxios } from "../../util/axios";
import {
  getTokenInSessionStorage,
  SetTokenInSessionStorage,
  clearSessionStorage,
} from "../../util/sessionStorage";
import { toast } from "react-toastify";
import { UserUpdateData } from "../../components/ProfilePage/components/UpdateUserForm";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authService.login({
        identifier: email,
        password: password,
      });
      SetTokenInSessionStorage(response.access_token);
      window.location.href = "/";
    } catch (err) {
      setError("خطأ في البريد الإلكتروني أو كلمة المرور");
      toast.error("خطأ في البريد الإلكتروني أو كلمة المرور");
      setIsAuthenticated(false);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(emptyUser);
      setIsAuthenticated(false);
      clearSessionStorage();
      toast.success("تم تسجيل الخروج بنجاح");
    } catch {
      toast.error("حدث خطأ أثناء تسجيل الخروج");
    }
  }, []);
  const updateAuthenticatedUser = useCallback(
    async (data: FormData | UserUpdateData) => {
      try {
        const newData = await authService.updateAuthenticatedUser(data);
        setUser(newData);
        toast.success("تم تحديث البيانات بنجاح ");
      } catch {
        toast.error("حدث خطأ أثناء تحديث البيانات ");
      }
    },
    []
  );

  const verifyAndFetchUser = useCallback(async () => {
    setIsLoading(true);

    try {
      const token = getTokenInSessionStorage();
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      setTokenInAxios(token);
      await authService.verifyToken();
      const userProfile = await authService.getProfile();

      setUser(userProfile);
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      clearSessionStorage();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    verifyAndFetchUser();
  }, [verifyAndFetchUser]);

  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      error,
      login,
      logout,
      setUser,
      updateAuthenticatedUser,
      setIsAuthenticated,
      setIsLoading,
      verifyAndFetchUser,
    }),
    [
      user,
      isAuthenticated,
      isLoading,
      error,
      login,
      logout,
      updateAuthenticatedUser,
      verifyAndFetchUser,
    ]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
