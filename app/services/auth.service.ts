import api from "./api.service";

const ENDPOINT = "/auth/signin";
const ENDPOINT_SIGNUP = "/auth/signup";
const ENDPOINT_UPDATE = "/auth/update";
const ENDPOINT_CREATE = "/auth/create";

interface UserCredentials {
  email: string;
  password: string;
  name?: string;
}

interface UserResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token: string;
}

const signin = async (credentials: Pick<UserCredentials, "email" | "password">) => {
  try {
    const response = await api.post(ENDPOINT, credentials);
    return response.data as UserResponse;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    throw error;
  }
};

const signup = async (credentials: UserCredentials) => {
  try {
    const response = await api.post(ENDPOINT_SIGNUP, credentials);
    return response.data as UserResponse;
  } catch (error: any) {
    if (error.response?.data?.error) {
      throw error.response.data.error;
    } else if (error.response?.data?.message) {
      throw error.response.data.message;
    } else if (error.message) {
      throw error.message;
    }
    throw "Une erreur est survenue lors de l'inscription";
  }
};

const updateProfile = async (credentials: Partial<UserCredentials>) => {
  const response = await api.put(ENDPOINT_UPDATE, credentials);
  return response.data as UserResponse;
};

const createUser = async (credentials: UserCredentials) => {
  const response = await api.post(ENDPOINT_CREATE, credentials);
  return response.data as UserResponse;
};

const AuthService = {
  signin,
  signup,
  updateProfile,
  createUser
};

export default AuthService;
