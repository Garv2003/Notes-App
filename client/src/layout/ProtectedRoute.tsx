import { useAuth } from "../context/auth";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "../components/Loader";

const ProtectedRoute = () => {
  const { auth } = useAuth();

  if (!auth.isLoaded) {
    return <Loader />;
  }

  return <>{auth.isSignedIn ? <Outlet /> : <Navigate to="/sign-in" />}</>;
};

export default ProtectedRoute;
