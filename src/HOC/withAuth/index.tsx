import { ComponentType, FC,  useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../pages/LoadingPage";
import { useAuthContext } from "../../context/hooks/useAuthContext";

const withAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
): FC<P> => {
  const AuthWrapper: FC<P> = (props) => {
    const { isAuthenticated, isLoading } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        navigate("/login",{ replace: true });
      }
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) return <LoadingPage />;
    if (!isAuthenticated) return null;

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
