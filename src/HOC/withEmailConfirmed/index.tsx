import { useContext, useEffect, ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { UserType } from "../../types";
import LoadingPage from "../../page/LoadingPage";

interface AuthContextType {
  user: UserType | null;
  loading: boolean;
  isAuthenticated: boolean;
}

const withEmailConfirmed = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  const WithEmailConfirmed: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const { user, loading, isAuthenticated } = useContext(
      AuthContext
    ) as unknown as AuthContextType;

    useEffect(() => {
      if (!loading && !user?.emailConfirmed) {
        navigate("/");
      }
    }, [user, loading, isAuthenticated, navigate]);

    if (loading || !user?.emailConfirmed) {
      return <LoadingPage />;
    }

    return <WrappedComponent {...props} />;
  };

  return WithEmailConfirmed;
};

export default withEmailConfirmed;
