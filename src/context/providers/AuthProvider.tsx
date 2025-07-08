// AuthProvider.tsx
import { ReactNode, useState, useCallback, useMemo, useEffect } from "react";
import authService from "../../services/auth.service";
import { AuthContext } from "..";
import { emptyUser, User } from "../../util/types";
import { setTokenInAxios } from "../../util/axios";
import {
  getTokenInSessionStorage,
  setTokenInSessionStorage,
  clearSessionStorage,
} from "../../util/sessionStorage";
import { toast } from "react-toastify";
import { UserUpdateData } from "../../components/ProfilePage/components/UpdateUserForm";
import { useNavigate } from "react-router-dom";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigator = useNavigate();

  const verifyAndFetchUser = useCallback(async () => {
    try {
      const token = getTokenInSessionStorage();
      if (!token) {
        setIsAuthenticated(false);
        return;
      }

      setTokenInAxios(token);
      await authService.verifyToken();
      const userProfile = await authService.getProfile();
      console.log(userProfile);
      if (!userProfile) {
        setIsAuthenticated(false);
        clearSessionStorage();
        return;
      }
      setUser(userProfile);
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
      clearSessionStorage();
    }
  }, []);
  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await authService.login({
          identifier: email,
          password: password,
        });
        setTokenInSessionStorage(response.access_token);
        await verifyAndFetchUser();
        navigator("/");
      } catch (err: unknown) {
        if (
          err &&
          typeof err === "object" &&
          "code" in err &&
          (err as { code?: unknown }).code === "ERR_NETWORK"
        ) {
          setError("السيرفر غير متصل بالانترنت");
          toast.error("السيرفر غير متصل بالانترنت");
        } else {
          setError("خطأ في البريد الإلكتروني أو كلمة المرور");
          toast.error("خطأ في البريد الإلكتروني أو كلمة المرور");
        }
        setIsAuthenticated(false);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [navigator, verifyAndFetchUser]
  );

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
