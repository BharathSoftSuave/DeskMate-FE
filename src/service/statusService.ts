import apiClient from "./baseService";
import { STATUS_ENDPOINTS } from "../utils/constants";

export const getAllStatus = async () => {
  try {
    const response = await apiClient.get(STATUS_ENDPOINTS.getAllStatus);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const updateStatus = async (status: string) => {
  try {
    let urlStr = STATUS_ENDPOINTS.updateStatus;
    urlStr += `?status=${status}`;

    const response = await apiClient.put(urlStr);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};

export const getStatusTimeline = async () => {
  try {
    const response = await apiClient.get(STATUS_ENDPOINTS.getStatusTimeline);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}

export const updatecChronoLog = async () => {
  try {
    let urlStr = STATUS_ENDPOINTS.updatecChronoLog;
    const response = await apiClient.get(urlStr);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
}