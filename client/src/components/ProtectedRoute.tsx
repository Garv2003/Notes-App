import { useAuth } from "../context/auth";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { auth } = useAuth();

  if (!auth.isLoaded) {
    return <Loader />;
  }

  return <>{auth.isSignedIn ? children : <Navigate to="/sign-in" />}</>;
};

export default ProtectedRoute;
