import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const bookSeats = (numOfSeats) =>
  axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/seats/book`,
    { numOfSeats },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const resetBookings = () =>
  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/seats/initialize`);

export const fetchSeats = () =>
  axios.get(`${process.env.NEXT_PUBLIC_API_URL}/seats`);
