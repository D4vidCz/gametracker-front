// src/api/reviews.js
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:4000";
const API_URL = `${API_BASE}/api/reviews`;

export async function fetchReviewsByGame(gameId) {
  const res = await axios.get(`${API_URL}/game/${gameId}`);
  return res.data;
}

export async function fetchReviewStatsByGame(gameId) {
  const res = await axios.get(`${API_URL}/stats/${gameId}`);
  return res.data;
}

export async function createReview(review) {
  const res = await axios.post(API_URL, review);
  return res.data;
}

export async function deleteReview(id) {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
}

export async function updateReview(id, data) {
  const res = await axios.put(`${API_URL}/${id}`, data);
  return res.data;
}
