import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const axiosWithAuth = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw "Token not found";
    }
    return axios.create({
      baseURL: "https://6be60ffc.ngrok.io/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    });
  } catch (err) {
    throw err;
  }
};
