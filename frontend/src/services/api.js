import axios from "axios";

const API_URL = "https://notenest-f6h2.onrender.com/api"; // Production URL
//const API_URL = "http://localhost:5000/api"; // Local development URL

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const registerUser = async (username, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { username, email, password });
  return response.data;
}

export const getNotes = async (token) => {
  const response = await axios.get(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const createNote = async (title, content, token) => {
  const response = await axios.post(`${API_URL}/notes`, { title, content }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};