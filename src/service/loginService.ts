import { ENDPOINTS } from "../utils/constants";
import apiClient from "./baseService";

interface ILoginPayload {
  email: string;
  password: string;
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
