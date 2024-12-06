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

export const getClaimAPI = async (page:any) => {
  try {
    const response = await api.get(`/claim?page=${page}&limit=10`);
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

export const createClaim = async (data: any) => {
  try {
    const formData = new FormData();

    // Append simple fields
    formData.append("issueDescription", data.issueDescription);
    formData.append("company", data.company);
    formData.append("model", data.model);
    formData.append("yearOfManufacturing", data.yearOfManufacturing.toString());
    formData.append("vehicleNumber", data.vehicleNumber);
    formData.append("repairCenter", "6750631d5825e4dfac3e33c4");

    // Append files (assuming documents is an object or array of files)
    Object.keys(data.documents).forEach((key) => {
      formData.append("file", data.documents[key]); // Key must match the field name used in backend
    });

    // Send the request
    const response = await api.post("/claim", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // Return the data from the API response
  } catch (error: any) {
    // Handle and throw the error
    if (error.response) {
      throw new Error(error.response.data.message || "Claim creation failed");
    } else {
      throw new Error("Network error or server unavailable");
    }
  }
};


export const getRepairecenterApi = async () => {
  try {
    const response = await api.get("/repair-centers");
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

export const AddFeedbackAPI = async ({ claimId, score, comments }: any) => {
  try {
    const response = await api.post("/feedback", { claimId, score, comments });
    return response.data; // Return the data from the API response
  } catch (error: any) {
    // Handle and throw the error
    if (error.response) {
      throw new Error(error.response.data.message || "Feedback submission failed");
    } else {
      throw new Error("Network error or server unavailable");
    }
  }
};

export const claimAppealApi = async (claimId: any, value:Object) => {
  try {
    const response = await api.put(`claim/appeal/${claimId}`, value);
    return response.data; // Return the data from the API response
  } catch (error: any) {
    // Handle and throw the error
    if (error.response) {
      throw new Error(error.response.data.message || "claim appeal submission failed");
    } else {
      throw new Error("Network error or server unavailable");
    }
  }
};


