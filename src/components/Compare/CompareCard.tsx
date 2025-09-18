import { useState } from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Tour } from "../../types/mohamed/types";

const CompareCard = ({ tour }: { tour: Tour | null }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(false);

  const handleCheckout = () => {
    if (selected && tour) {
      console.log("Selected Tour:", tour);
      navigate("/checkout");
    }
  };

  if (!tour) {
    return null;
  }

  return (
    <>
      <h2 className="text-3xl text-gray-900 font-medium py-6">Compare</h2>
      <div
        onClick={() => setSelected(!selected)}
        className={`bg-gray-100/50 mt-10 w-1/2 p-6 rounded-xl text-black border leading-7 cursor-pointer transition 
            ${
              selected
                ? "border-blue-600 shadow-lg"
                : "border-gray-300 hover:border-blue-400"
            }`}
      >
        <h2 className="text-lg font-medium">{tour.title}</h2>
        <p className="text-4xl font-bold">
          ${tour.price}{" "}
          <span className="text-gray-500 font-normal text-sm">/ Person</span>
        </p>
        <p className="flex gap-3 pt-3">
          <Check className="w-5 text-green-600" />
          Duration: {tour.duration ?? "N/A"}
        </p>
        <p className="flex gap-3">
          <Check className="w-5 text-green-600" />
          Location: {tour.location ?? "N/A"}
        </p>
        <p className="flex gap-3">
          <Check className="w-5 text-green-600" />
          Availability: {tour?.availability || "Available"}
        </p>
        <p className="flex gap-3">
          <Check className="w-5 text-green-600" />
          Guide: {tour?.guides || "Yes"}
        </p>
        <p className="flex gap-3">
          <Check className="w-5 text-green-600" />
          Transportation: {tour.transportation || "Included"}
        </p>
      </div>

      <div className="flex items-center justify-center md:w-xl h-14 m-auto mt-5 mb-24">
        <button
          onClick={handleCheckout}
          disabled={!selected}
          className="bg-blue-700 py-2 px-4 rounded-lg text-white w-full text-xl font-medium cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500"
        >
          Check Out
        </button>
      </div>
    </>
  );
};

export default CompareCard;
