// import {
//      Dispatch,
//      ReactNode,
//      SetStateAction,
//      createContext,
//      useEffect,
//      useState,
//      useCallback,
//    } from "react";
//    import { getTokenInSessionStorage } from "../../utils/sessionStorage";
//    import authService from "../../services/auth.service";
//    import { setTokenInAxios } from "../../utils/axios";
//    import { UserType } from "../../types";
// export const AuthProvider: React.FC<{ children: ReactNode }> = ({
//      children,
//    }) => {
//      const [isAuthenticated, setIsAuthenticated] = useState(false);
//      const [user, setUser] = useState<UserType>({
//        _id: "",
//        googleId: "",
//        email: "",
//        profile: {
//          name: "",
//          photo: "",
//        },
//        username: "",
//      });
//      const [loading, setLoading] = useState(true);
   
//      const verifyAndFetchUser = useCallback(async () => {
//        try {
//          await authService.verifyToken();
//          setIsAuthenticated(true);
//          const userProfile = await authService.getProfile();
//          setUser(userProfile);
//        } catch {
//          setIsAuthenticated(false);
//        } finally {
//          setLoading(false);
//        }
//      }, []);
     
//      useEffect(() => {
//        setTokenInAxios();
//        if (getTokenInSessionStorage()) {
//          verifyAndFetchUser();
//        } else {
//          setLoading(false); // No token, no need to wait
//        }
//      }, [verifyAndFetchUser]);
   
//      return (
//        <AuthContext.Provider
//          value={{ isAuthenticated, user, setIsAuthenticated, loading }}
//        >
//          {children}
//        </AuthContext.Provider>
//      );
//    };