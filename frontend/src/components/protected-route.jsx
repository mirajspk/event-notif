import { Link, useLocation } from "react-router";
import { useAuth } from "@/context/auth-context";


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Link to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
