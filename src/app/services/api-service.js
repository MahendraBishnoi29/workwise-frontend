import Cookies from "js-cookie";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const fetchWithAuth = async (endpoint, options = {}) => {
  const token = Cookies.get("token");
  const defaultHeaders = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }

  return response.json();
};

export const authService = {
  login: (credentials) =>
    fetchWithAuth("/user/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  signup: (userData) =>
    fetchWithAuth("/user/signup", {
      method: "POST",
      body: JSON.stringify(userData),
    }),
};

export const bookingService = {
  fetchSeats: () => fetchWithAuth("/seats"),

  bookSeats: (count) =>
    fetchWithAuth("/seats/book", {
      method: "POST",
      body: JSON.stringify({ count }),
    }),

  resetBookings: () =>
    fetchWithAuth("/seats/initialize", {
      method: "POST",
    }),
};
