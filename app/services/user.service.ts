import api from "./api.service";

interface UserCredentials {
  email: string;
  password: string;
  name: string;
}

interface User {
  id: number;
  email: string;
  name: string;
}

const getUserWithToken = async (token: string) => {
  const response = await api.get("/users/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const createUser = async (credentials: UserCredentials) => {
  const response = await api.post("/users", credentials);
  return response.data;
};

const updateUser = async (id: number, credentials: Partial<UserCredentials>) => {
  const response = await api.put(`/users/${id}`, credentials);
  return response.data;
};

const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

const getUserById = async (id: number) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

const UserService = {
  getUserWithToken,
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
};

export default UserService;
