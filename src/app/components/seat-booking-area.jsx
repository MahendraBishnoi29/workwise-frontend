import { Seat } from "./seat";

export const SeatBookingArea = ({ loading, data }) => {
  const stats = {
    booked: data?.filter((seat) => seat.isBooked).length || 0,
    available: data?.filter((seat) => !seat.isBooked).length || 0,
  };

  return (
    <div className="h-full flex flex-col gap-4">
      <h2 className="text-xl font-bold text-gray-800 text-center">
        {loading ? "Loading..." : "Seat Selection"}
      </h2>

      <div className="grid grid-cols-7 gap-2 bg-gray-50 p-4 rounded-xl flex-1">
        {data?.map((seat) => (
          <Seat
            key={seat.id}
            isBooked={seat.isBooked}
            seatNumber={seat.seatNumber}
          />
        ))}
      </div>

      <div className="flex gap-3 text-sm">
        <div className="flex-1 flex items-center justify-center gap-2 bg-amber-400/20 p-3 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="font-semibold text-gray-700">
            Booked: {stats?.booked || 0}
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center gap-2 bg-emerald-500/20 p-3 rounded-lg">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="font-semibold text-gray-700">
            Available: {stats?.available || 0}
          </span>
        </div>
      </div>
    </div>
  );
};
