import { use } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "../Context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-warning"></span>
      </div>
    );
  }

  if (!user) {
    return (
      <Navigate to="/auth/login" state={{ from: location.pathname }} replace />
    );
  }

  return children;
};

export default PrivateRoute;
