import axios from "axios";

export type Token = string;

export type SetToken = (offerToken?: string) => void;

let token: Token = "";

export const setTokenInAxios: SetToken = (offerToken?: string) => {
  token = `Bearer ${offerToken || sessionStorage.getItem("access_token") || ""}`;
  axios.defaults.headers.common.Authorization = token;
};
setTokenInAxios("");
export default axios;
