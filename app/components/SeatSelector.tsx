"use client";

import { Armchair } from "lucide-react";
import { useState } from "react";

const rows = ["A", "B", "C", "D", "E", "F"];
const cols = [1, 2, 3, 4, 5, 6];

export default function SeatSelector() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seatId: string) => {
    setSelectedSeats(
      (prev) =>
        prev.includes(seatId)
          ? prev.filter((seat) => seat !== seatId) // remove
          : [...prev, seatId], // add
    );
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Select Your Seats</h2>

      <div className="grid grid-cols-6 gap-3">
        {rows.map((row) =>
          cols.map((col) => {
            const seatId = `${row}${col}`;
            const isSelected = selectedSeats.includes(seatId);

            return (
              <button
                key={seatId}
                onClick={() => toggleSeat(seatId)}
                className={`w-12 h-12 rounded-lg font-semibold transition
                  ${
                    isSelected
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }
                `}
              >
                <Armchair />
                {seatId}
              </button>
            );
          }),
        )}
      </div>

      <div>
        <p className="text-sm">
          Selected Seats: {selectedSeats.join(", ") || "None"}
        </p>
      </div>

      <button
        onClick={() => console.log(selectedSeats)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Confirm Booking
      </button>
    </div>
  );
}
