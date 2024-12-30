import { useState } from "react";
import { bookSeats, resetBookings } from "../api/api";
import { toast } from "sonner";

export const useBooking = (onBookingUpdate) => {
  const [bookedSeats, setBookedSeats] = useState([]);
  const [isBooking, setIsBooking] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const handleBooking = async (seatCount) => {
    if (seatCount > 7) {
      toast.error("You can book up to 7 seats at a time");
      return;
    }

    if (!seatCount || seatCount <= 0) {
      toast.error("Please enter a valid seat count");
      return;
    }

    setIsBooking(true);
    try {
      const response = await bookSeats(seatCount);
      setBookedSeats(Array.isArray(response.data) ? response.data : []);
      onBookingUpdate();
      if (response.status === 200) {
        toast.success("Seats booked successfully");
      } else {
        toast.error(response.data.message || "Failed to book seats");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to book seats"
      );
    } finally {
      setIsBooking(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);
    try {
      await resetBookings();
      onBookingUpdate();
      setBookedSeats([]);
      toast.success("Bookings reset successfully");
    } catch (error) {
      toast.error("Failed to reset bookings");
    } finally {
      setIsResetting(false);
    }
  };

  return {
    bookedSeats,
    isBooking,
    isResetting,
    handleBooking,
    handleReset,
    isProcessing: isBooking || isResetting,
  };
};
