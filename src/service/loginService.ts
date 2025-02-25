import { ENDPOINTS } from "../utils/constants";
import apiClient from "./baseService";

interface ILoginPayload {
  email: string;
  password: string;
}
interface ISignPayload {
  full_name: string;
  email: string;
  gender: string;
  password: string;
  date_of_birth: string;
}

interface IOTPPayload {
  email: string;
  otp: string;
}
export const doLogin = async (payload: ILoginPayload) => {
  try {
    const response = await apiClient.post(ENDPOINTS.login, payload);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const doSignUp = async (payload: ISignPayload) => {
  try {
    const response = await apiClient.post(ENDPOINTS.user, payload);
    console.log("we succeed", response.data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
  }
};

export const doOTPVeify = async (payload: IOTPPayload) => {
  try {
    const response = await apiClient.post(ENDPOINTS.verfiyOTP, payload);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
  }
};
