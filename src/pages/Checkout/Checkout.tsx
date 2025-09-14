import { useCheckoutMutation } from "../../hooks/useCheckout";
import { useCheckout } from "../../context/useCheckout";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const mutation = useCheckoutMutation();
  const { setBooking, setPaymentInfo } = useCheckout();
  const navigate = useNavigate();

  const handleStartCheckout = async () => {
    // Example: Room booking with ID 1
    setBooking(1, "flight");
    mutation.mutate(
      { booking_id: 1, booking_type: "flight" },
      {
        onSuccess: (res) => {
          setPaymentInfo(res);
          navigate("/checkout/payment");
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleStartCheckout}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Proceed to Payment
      </button>
    </div>
  );
}