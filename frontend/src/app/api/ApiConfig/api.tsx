import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Add a request interceptor to include the bearer token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get the token from localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Set the bearer token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

export const loginAPI = async ({ email, password }: any) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data; // Return the data from the API response
  } catch (error: any) {
    // Handle and throw the error
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else {
      throw new Error("Network error or server unavailable");
    }
  }
};

export const signupApi = async (value: any) => {
  try {
    const response = await api.post("/auth/register", value);
    return response.data; // Return the data from the API response
  } catch (error: any) {
    // Handle and throw the error
    if (error.response) {
      throw new Error(error.response.data.message || "Signup failed");
    } else {
      throw new Error("Network error or server unavailable");
    }
  }
};

export const getClaimAPI = async () => {
  try {
    const response = await api.get("/claim");
    return response.data; // Return the data from the API response
  } catch (error: any) {
    // Handle and throw the error
    if (error.response) {
      throw new Error(error.response.data.message || "get claim failed");
    } else {
      throw new Error("Network error or server unavailable");
    }
  }
};
