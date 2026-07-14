import apiClient from "./apiClient";

export const toggleLikeApi = async (productId) => {
  const res = await apiClient.post(`/likes/toggle?productId=${productId}`);
  return res.data;
};

export const getLikeStatusApi = async (productId) => {
  const res = await apiClient.get(`/likes/status/${productId}`);
  return res.data;
};