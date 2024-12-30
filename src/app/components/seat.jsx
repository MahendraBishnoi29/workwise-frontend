export const Seat = ({ seatNumber, isBooked }) => {
  return (
    <div
      className={`
        relative w-10 h-10 md:w-12 md:h-12
        ${isBooked ? "bg-amber-400" : "bg-emerald-500"} 
        rounded-lg transition-all duration-300 
        hover:scale-105 cursor-pointer
        flex flex-col items-center justify-center
        shadow-sm
      `}
    >
      <div className="absolute top-1 w-8 h-1.5 bg-gray-700/20 rounded-t-lg" />
      <span className="font-bold text-white text-sm mt-1">{seatNumber}</span>
    </div>
  );
};
