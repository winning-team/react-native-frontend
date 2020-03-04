import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const axiosWithAuth = async () => {
  try {
    const token = await SecureStore.getItemAsync("token");
    return axios.create({
      baseURL: "https://50489f90.ngrok.io/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      }
    });
  } catch (err) {
    throw err;
  }
};
