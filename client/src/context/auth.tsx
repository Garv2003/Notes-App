import { useContext, createContext, useEffect, ReactNode } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import Loader from "../components/Loader";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { isSignedIn, user, isLoaded } = useUser();

  const SetAddUser = async () => {
    if (isSignedIn && user) {
      try {
        await axios.post(import.meta.env.VITE_API_URL + "/new_user", user);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    SetAddUser();
  }, [isSignedIn, user]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={
        {
          auth: { isSignedIn, user: user, isLoaded },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
