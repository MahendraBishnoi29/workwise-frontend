"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { SeatBookingArea } from "../components/seat-booking-area";
import { BookingInput } from "../components/booking-input";
import { fetchSeats } from "../api/api";
import { useAuth } from "../hooks/useAuth";
import { bookingService } from "../services/api-service";

export default function BookingPage() {
  const router = useRouter();
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    const email = Cookies.get("userEmail");

    if (!token) {
      router.push("/auth/login");
      return;
    }

    setUserEmail(email || "");
    fetchSeatData();
  }, [router]);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userEmail");
    router.push("/auth/login");
  };

  const fetchSeatData = async () => {
    try {
      const response = await bookingService.fetchSeats();
      setSeats(response.availableSeatsForBooking);
    } catch (error) {
      console.error("Failed to fetch seats:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
      <div className="h-full container mx-auto p-4 md:p-6">
        <header className="flex justify-between items-center mb-4">
          <div className="text-left">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Seat Booking System
            </h1>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              Welcome, {userEmail}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </header>

        <div className="flex flex-col md:flex-row gap-4 md:gap-6 h-[calc(100%-5rem)]">
          <div className="md:flex-1 h-full overflow-auto">
            <div className="bg-white p-4 rounded-xl shadow-lg h-full">
              <SeatBookingArea data={seats} loading={loading} />
            </div>
          </div>
          <div className="">
            <BookingInput onBookingUpdate={fetchSeatData} />
          </div>
        </div>
      </div>
    </main>
  );
}
