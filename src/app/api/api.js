import axios from "axios";
import Cookies from "js-cookie";

const token = Cookies.get("token");

export const bookSeats = (numOfSeats) =>
  axios.post(
    `http://localhost:4000/api/seats/book`,
    { numOfSeats },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

export const resetBookings = () =>
  axios.post(`http://localhost:4000/api/seats/initialize`);

export const fetchSeats = () => axios.get(`http://localhost:4000/api/seats`);
