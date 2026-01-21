import axios from 'axios'

const DB_URL = import.meta.env.VITE_DB_URL;


export const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
  timeout: 5000,
  withCredentials: true,
});



