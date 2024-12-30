"use client";
import { useState } from "react";
import { Seat } from "./seat";
import { useBooking } from "../hooks/useBooking";

export const BookingInput = ({ onBookingUpdate }) => {
  const [seatCount, setSeatCount] = useState(0);
  const {
    bookedSeats,
    isBooking,
    isResetting,
    handleBooking,
    handleReset,
    isProcessing,
  } = useBooking(onBookingUpdate);

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex items-center gap-3">
        <h3 className="text-lg font-bold text-gray-800">Selected Seats</h3>
        <div className="flex gap-2">
          {bookedSeats?.map((seat) => (
            <Seat key={seat._id} isBooked={true} seatNumber={seat.seatNumber} />
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <input
          type="number"
          disabled={isProcessing}
          className="flex-1 px-4 text-black py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
          placeholder="Number of seats"
          onChange={(e) => setSeatCount(parseInt(e.target.value))}
        />
        <button
          disabled={isProcessing}
          onClick={() => handleBooking(seatCount)}
          className="px-8 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isBooking ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Booking...
            </span>
          ) : (
            "Book Seats"
          )}
        </button>
      </div>

      <button
        disabled={isProcessing}
        onClick={handleReset}
        className="w-full py-2 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isResetting ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Resetting...
          </span>
        ) : (
          "Reset All Bookings"
        )}
      </button>
    </div>
  );
};
