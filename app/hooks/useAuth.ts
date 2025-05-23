import { useContext } from "react";
import AuthService from "../services/auth.service";
import AuthContext from "../context/AuthContext";
import { removeToken, saveToken } from "../utils/token-jwt";
import UserService from "../services/user.service";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const signin = async (credentials: any) => {
    try {
      const response = await AuthService.signin(credentials);
      // console.log("response : ", response);
      setUser(response.user);
      // save token in async storage
      saveToken(response.token);
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (credentials: any) => {
    try {
      const response = await AuthService.signup(credentials);
      // Après l'inscription réussie, on connecte automatiquement l'utilisateur
      if (response.user && response.token) {
        setUser(response.user);
        saveToken(response.token);
      }
      return response;
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      throw error; // Propager l'erreur pour la gérer dans le composant
    }
  };

  const signout = async () => {
    setUser(null);
    removeToken();
  };

  const updateProfile = async (credentials: any) => {
    try {
      const updatedUser = await UserService.updateUser(user.id, credentials);
      setUser(updatedUser);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { user, signin, signout, signup, updateProfile };
};

export default useAuth;
