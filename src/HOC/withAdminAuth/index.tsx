import { useContext, useEffect, ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";

const withAdminAuth = <P extends object>(
  WrappedComponent: ComponentType<P>
) => {
  return (props: P) => {
    const navigate = useNavigate();
    const { user, isLoading, isAuthenticated } = useContext(AuthContext);

    useEffect(() => {
      if (!isLoading && user?.role !== "admin") navigate("/"); // Redirect if not an admin
    }, [user, navigate, isLoading, isAuthenticated]);

    return user?.role === "admin" ? <WrappedComponent {...props} /> : null;
  };
};

export default withAdminAuth;
