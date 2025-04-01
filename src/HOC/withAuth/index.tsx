import { ComponentType, FC, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage";
import { AuthContext } from "../../context";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P> => {
  const AuthWrapper: FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) return <LoadingPage />;
    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
