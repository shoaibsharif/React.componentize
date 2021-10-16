import axios, { AxiosRequestConfig } from "axios";

const getUser = () => {
  /**@type AxiosRequestConfig */
  const config = {
    method: "GET",
    crossdomain: true,
    url: "/users/current",
  };
  return axios(config);
};

const login = ({ email, password }) => {
  return axios({
    method: "POST",
    url: "/users/login",
    data: { email, password, tenantId: "U023C6VN34L" },
  });
};

const logout = () => {
  return axios({ url: "/users/logout", method: "GET" });
};

export default { getUser, login, logout };
