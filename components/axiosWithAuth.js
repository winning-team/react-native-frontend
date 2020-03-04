import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const axiosWithAuth = async () => {
  try {
<<<<<<< HEAD
    const token = await SecureStore.getItemAsync('token');
    if (!token) {
      throw 'Token not found';
    }
    return axios.create({
      baseURL: 'https://5d0cdb07.ngrok.io',
=======
    const token = await SecureStore.getItemAsync("token");
    if (!token) {
      throw "Token not found";
    }
    return axios.create({
      baseURL: "https://50489f90.ngrok.io/",
>>>>>>> 1669783264eaed1b382410dab84818778390a35e
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    });
  } catch (err) {
    throw err;
  }
};
