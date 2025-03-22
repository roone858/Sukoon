import { ReactNode, useEffect, useState, useCallback } from "react";
import authService from "../../services/auth.service";
import { AuthContext } from "..";
import { emptyUser, User } from "../../util/types";
import { setTokenInAxios } from "../../util/axios";
import { getTokenInSessionStorage } from "../../util/sessionStorage";
export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>(emptyUser);
  const [loading, setLoading] = useState(true);

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
      value={{ isAuthenticated, user, setUser, setIsAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
