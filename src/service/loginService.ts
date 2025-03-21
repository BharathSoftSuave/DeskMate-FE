import {
  ILoginPayload,
  IOTPPayload,
  ISignPayload,
} from "../interface/authInterface";
import { IDashBoard, IPopup } from "../interface/dashboardInterface";
import { ENDPOINTS } from "../utils/constants";
import apiClient from "./baseService";

export const doLogin = async (payload: ILoginPayload) => {
  try {
    const response = await apiClient.post(ENDPOINTS.login, payload);
    if (response) {
      localStorage.setItem("accessToken", response.data.access_token);
    }
    getMe();
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const getMe = async () => {
  try {
    const response = await apiClient.get(ENDPOINTS.getMe);
    if (response) {
      localStorage.setItem("currentUser", response.data.full_name);
      localStorage.setItem("userId", response.data.id);
    }
    return response.data;
  } catch (error) {
    console.error("API Request Error get ME:", error);
    throw error;
  }
};

export const doSignUp = async (payload: ISignPayload) => {
  try {
    const response = await apiClient.post(ENDPOINTS.user, payload);
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

export const getDashboard = async (payload: IDashBoard) => {
  try {
    const response = await apiClient.get(ENDPOINTS.getDashboard, {
      params: payload,
    });
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
  }
};

const p1 = {
  office_condition: "all",
  desk_condition: "without_desk",
  office_id: "string",
};

export const getPopup = async (queryParam: IPopup) => {
  try {
    const response = await apiClient.post(ENDPOINTS.Ausers, p1, {
      params: queryParam,
    });
    console.log(" pop in ", response.data);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
  }
};

export const allocateOrRevokeDesk = async (payload: any) => {
  try {
    const response = await apiClient.put(ENDPOINTS.desk, payload);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const swap = async (payload: any) => {
  try {
    const response = await apiClient.put(ENDPOINTS.swap, payload);
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};
