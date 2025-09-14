
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useConfirmCheckout } from "../../hooks/useCheckout";
import { useCheckout } from "../../context/useCheckout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import PaymentOptions from "../../components/checkout/PaymentOptions";

const PaymentSchema = Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

// "data": {
//   "payment_id": 47,
//     "client_secret": "pi_3S73lS00Xq5cUHDc1SxFnEBb_secret_cAFMBRTpPMD396Nx12Xw2gNf1"
// }

export default function Payment() {
  const { paymentInfo, paymentMethod } = useCheckout();
  // const confirmMutation = useConfirmCheckout();
  useConfirmCheckout()
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const [step, setStep] = useState<"options" | "form">("options");

  if (step === "options") {
    return <PaymentOptions onNext={() => setStep("form")} />;
  }

  if (paymentMethod === "paypal") {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-sm bg-white text-center">
        <h1 className="text-xl font-bold mb-4">Pay with PayPal</h1>
        <button
          onClick={() => navigate("/checkout/success")}
          className="px-6 py-2 bg-yellow-500 text-white rounded"
        >
          Fake PayPal Success
        </button>
      </div>
    );
  }

  if (paymentMethod === "visa" || paymentMethod === "mastercard") {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow-sm bg-white">
        <h1 className="text-xl font-bold mb-4">Complete Your Payment</h1>

        <Formik
          initialValues={{ name: "", email: "" }}
          validationSchema={PaymentSchema}
          onSubmit={async (values) => {
            if (!stripe || !elements || !paymentInfo) return;

            const cardElement = elements.getElement(CardElement);
            if (!cardElement) return;

            // Step 1: أنشيء PaymentMethod من Stripe
            const { paymentMethod: pm, error } = await stripe.createPaymentMethod({
              type: "card",
              card: cardElement,
              billing_details: {
                name: values.name,
                email: values.email
              },
            });

            if (error) {
              console.error(error);
              return;
            }

            if (pm) {

              console.log("Stripe PaymentMethod:", paymentMethod);

              // Step 2: ابعت للسيرفر عشان يعمل confirm
              confirmMutation.mutate(
                {
                  payment_id: paymentInfo.payment_id,
                  payment_method_id: pm.id
                },
                {
                  onSuccess: (res) => {
                    if (res.status === "succeeded") {
                      navigate("/checkout/success");
                    } else {
                      alert(res.message || "Payment not completed");
                    }
                  },
                }
              );
            }
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4">
              <div>
                <Field name="name" placeholder="Full Name" className="w-full border px-2 py-1" />
                {errors.name && touched.name && <div className="text-red-500">{errors.name}</div>}
              </div>
              <div>
                <Field name="email" placeholder="Email" className="w-full border px-2 py-1" />
                {errors.email && touched.email && <div className="text-red-500">{errors.email}</div>}
              </div>

              <div className="border p-3 rounded">
                <CardElement />
              </div>

              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
                Confirm Booking
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  return <div>Please select a payment method first</div>;
}


