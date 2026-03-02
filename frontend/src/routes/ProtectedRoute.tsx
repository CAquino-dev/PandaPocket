import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { token, loading } = useAuth();

  // Show a simple loading screen while checking auth
  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  // Redirect if no token
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise render child routes
  return <Outlet />;
};

export default ProtectedRoute;