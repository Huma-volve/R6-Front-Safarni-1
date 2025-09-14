import CardImg from "../../assets/Rectangle 20.png";
import { useMemo, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Backdrop,
  Button,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import type { PaymentFormValues, PaymentMethod } from "../../context/CheckoutContext";
import CheckoutContext from "../../context/CheckoutContext";

const methods: { key: PaymentMethod; label: string }[] = [
  { key: "paypal", label: "Paypal" },
  { key: "mastercard", label: "Mastercard" },
  { key: "visa", label: "Visa" },
];

const validationSchema = Yup.object({
  method: Yup.mixed<PaymentMethod>().oneOf(["paypal", "mastercard", "visa"]).required(),
  fullName: Yup.string().min(3, "Too short").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  cardNumber: Yup.string().when("method", {
    is: (m: PaymentMethod) => m !== "paypal",
    then: (s) =>
      s
        .required("Required")
        .matches(/^\d{13,19}$/, "Card number must be 13-19 digits"),
    otherwise: (s) => s.optional(),
  }),
  expiry: Yup.string().when("method", {
    is: (m: PaymentMethod) => m !== "paypal",
    then: (s) =>
      s
        .required("Required")
        .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY"),
    otherwise: (s) => s.optional(),
  }),
  cvv: Yup.string().when("method", {
    is: (m: PaymentMethod) => m !== "paypal",
    then: (s) => s.required("Required").matches(/^\d{3,4}$/, "3-4 digits"),
    otherwise: (s) => s.optional(),
  }),
});

export default function Payment() {
  const navigate = useNavigate();
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error("Must be used inside PaymentProvider");
  const { setLastPayment } = ctx;

  const initialValues: PaymentFormValues = useMemo(
    () => ({
      method: "paypal",
      fullName: "",
      email: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    }),
    []
  );

  const mutation = useMutation({
    mutationFn: async (payload: PaymentFormValues) => {
      await new Promise((res) => setTimeout(res, 1600));
      return payload;
    },
    onSuccess: (data) => {
      setLastPayment(data);
      navigate("/checkout/success");
    },
  });

  const formik = useFormik<PaymentFormValues>({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (vals) => mutation.mutate(vals),
  });

  const isCard = formik.values.method !== "paypal";
  const disabled = mutation.isPending;

  return (
    <div className="px-6 md:px-10 lg:px-16 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start md:h-120">
        {/* Left  */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl h-120 w-full bg-gray-100 flex items-center justify-center">
            <img
              src={CardImg}
              alt="card"
              className="h-110 w-auto object-contain"
            />
          </div>
        </div>

        {/* form */}
        <div className="lg:col-span-7 md:h-120">
          <div className="rounded-2xl p-6 md:p-8 bg-white">
            <Typography variant="h6" className="text-center mb-6 pb-5">
              Payment Method
            </Typography>

            <div>
              <Typography variant="body2" className="mb-5 pb-5 text-gray-600">
                Add Your Payment Method
              </Typography>
              <Stack direction="row" spacing={1.5} className="mb-6">
                {methods.map((m) => {
                  const selected = formik.values.method === m.key;
                  return (
                    <Chip
                      key={m.key}
                      color={selected ? "primary" : "default"}
                      variant={selected ? "filled" : "outlined"}
                      icon={<CreditCardIcon />}
                      label={m.label}
                      clickable
                      onClick={() => formik.setFieldValue("method", m.key)}
                      disabled={disabled}


                    />
                  );
                })}
              </Stack>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <TextField
                name="fullName"
                label="Full Name"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                fullWidth
                disabled={disabled}
              />

              <TextField
                name="email"
                label="Your Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
                disabled={disabled}

              />

              {isCard && (
                <>
                  <TextField
                    name="cardNumber"
                    label="Card Number"
                    value={formik.values.cardNumber}
                    onChange={(e) => {
                      const onlyDigits = e.target.value.replace(/\D/g, "");
                      formik.setFieldValue("cardNumber", onlyDigits);
                    }}
                    onBlur={formik.handleBlur}
                    error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
                    helperText={formik.touched.cardNumber && formik.errors.cardNumber}
                    fullWidth
                    disabled={disabled}
                    autoComplete="off"
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <TextField
                      name="expiry"
                      label="Valid Date (MM/YY)"
                      value={formik.values.expiry}
                      onChange={(e) => {
                        let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                        if (v.length >= 3) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                        formik.setFieldValue("expiry", v);
                      }}
                      onBlur={formik.handleBlur}
                      error={formik.touched.expiry && Boolean(formik.errors.expiry)}
                      helperText={formik.touched.expiry && formik.errors.expiry}
                      disabled={disabled}
                    />
                    <TextField
                      name="cvv"
                      label="CVV"
                      value={formik.values.cvv}
                      onChange={(e) => formik.setFieldValue("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                      onBlur={formik.handleBlur}
                      error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                      helperText={formik.touched.cvv && formik.errors.cvv}
                      disabled={disabled}
                    />
                  </div>
                </>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                className="!mt-4"
                endIcon={<CheckCircleIcon />}
                disabled={disabled}
              >
                Confirm Payment
              </Button>
            </form>
          </div>
        </div>
      </div>

      <Backdrop open={mutation.isPending} sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}>
        <Stack alignItems="center" spacing={2}>
          <CircularProgress color="inherit" />
          <Typography>Processing your payment...</Typography>
        </Stack>
      </Backdrop>
    </div>
  );
}