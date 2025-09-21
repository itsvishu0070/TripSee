import axios from "axios";

// Create an Axios instance with a base URL.
// This prevents us from having to type the full URL for every request.
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

// We can also add an interceptor here later to automatically add the
// auth token to every request, which is very useful.

export default API;
