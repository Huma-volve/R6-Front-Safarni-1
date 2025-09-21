
import { PaymentProvider } from "../../context/CheckoutContext";
import Payment from "./Payment";

export default function Checkout() {
  return (
    <PaymentProvider>
      <Payment bookingId={1} bookingType="flight" />
    </PaymentProvider>
  );
}