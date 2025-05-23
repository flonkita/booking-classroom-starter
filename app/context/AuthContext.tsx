import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getToken, removeToken } from "../utils/token-jwt";
import UserService from "../services/user.service";

interface AuthContextType {
  user: any | null;
  setUser: (user: any | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

interface AuthContextProviderProps {
  children: React.ReactNode;
}

const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState(null);

  const initializeAuth = async () => {
    const token = await getToken();
    if (token) {
      try {
        const user = await UserService.getUserWithToken(token);
        setUser(user);
      } catch (error) {
        console.error(error);
        setUser(null);
        removeToken();
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContextProvider };
export default AuthContext;
