import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const PrivateRoute = () => {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
