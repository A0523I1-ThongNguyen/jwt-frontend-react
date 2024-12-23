import axios from "axios";

const createUser = (email, phone, userName, password) => {
  return axios.post("http://localhost:8081/api/v1/register", {
    email,
    phone,
    userName,
    password,
  });
};

const loginUser = async (valueLogin, valuePassword) => {
  return await axios.post("http://localhost:8081/api/v1/login", {
    valueLogin,
    valuePassword,
  });
};

export { createUser, loginUser };
