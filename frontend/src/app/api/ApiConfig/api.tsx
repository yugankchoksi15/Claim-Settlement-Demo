import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const loginAPI = async ({ email, password }: any) => {
  try {
    const response = await api.post("/login", { email, password });
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
  console.log("valuevaluevalue",value)
  try {
    const response = await api.post("/register", value);
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
