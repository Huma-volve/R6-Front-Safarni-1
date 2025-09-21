// src/pages/Checkout/Payment.tsx
import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import CheckoutContext from "../../context/CheckoutContext";
import {
    initiateCheckout,
    confirmCheckout,
    processStripePayment,
} from "../../api/paymentApi";

import CardImg from "../../assets/Rectangle 20.png";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
    Backdrop,
    Button,
    Chip,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

export default function Payment({
    bookingId,
    bookingType,
}: {
    bookingId: number;
    bookingType: "room" | "car" | "flight" | "tour";
}) {
    const navigate = useNavigate();
    const ctx = useContext(CheckoutContext);
    if (!ctx) throw new Error("Must be used inside PaymentProvider");
    const { setLastPayment } = ctx;

    const methods = [
        { key: "paypal", label: "Paypal" },
        { key: "mastercard", label: "Mastercard" },
        { key: "visa", label: "Visa" },
    ];

    const initialValues = useMemo(
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
        mutationFn: async (payload: any) => {
            try {
                if (payload.method === "visa") {
                    const checkoutResp = await initiateCheckout(bookingId, bookingType);
                    await confirmCheckout({
                        reference: checkoutResp.reference ?? "demo-visa-ref",
                        status: "success",
                        method: "visa",
                    });
                    return { ...payload, reference: checkoutResp.reference ?? "demo-visa-ref" };
                } else {
                    // PayPal / Mastercard
                    const checkoutResp = await initiateCheckout(bookingId, bookingType);
                    await confirmCheckout({
                        reference: checkoutResp.reference ?? "demo-ref",
                        status: "success",
                        method: payload.method,
                    });
                    return { ...payload, reference: checkoutResp.reference ?? "demo-ref" };
                }
            } catch (err) {
                console.error("mutationFn exception:", err);
                return { ...payload, reference: "demo-fallback" };
            }
        },
        onSuccess: (data) => {
            setLastPayment(data);
            if (data.method !== "visa") {
                navigate("/checkout/success");
            }
        },
        onError: () => {
            console.error("Payment check:");
        },
    });

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            method: Yup.mixed().oneOf(["paypal", "mastercard", "visa"]).required(),
            fullName: Yup.string().required("Full name required"),
            email: Yup.string().email().required("Email required"),
        }),
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
                        <img src={CardImg} alt="card" className="h-110 w-auto object-contain" />
                    </div>
                </div>

                {/* Right  */}
                <div className="lg:col-span-7 md:h-120">
                    <div className="rounded-2xl p-6 md:p-8 bg-white">
                        <Typography variant="h6" className="text-center mb-6 pb-5">
                            Payment Method
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

                        <form onSubmit={formik.handleSubmit} className="space-y-6">
                            <TextField
                                name="fullName"
                                label="Full Name"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
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
                                        fullWidth
                                        disabled={disabled}
                                    />
                                    <div className="grid grid-cols-2 gap-6">
                                        <TextField
                                            name="expiry"
                                            label="Valid Date (MM/YY)"
                                            value={formik.values.expiry}
                                            onChange={formik.handleChange}
                                            disabled={disabled}
                                        />
                                        <TextField
                                            name="cvv"
                                            label="CVV"
                                            value={formik.values.cvv}
                                            onChange={formik.handleChange}
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
                                endIcon={<CheckCircleIcon />}
                                disabled={disabled}
                            >
                                Confirm Payment
                            </Button>
                        </form>
                    </div>
                </div>
            </div>

            <Backdrop open={mutation.isPending} sx={{ color: "#fff", zIndex: 9999 }}>
                <Stack alignItems="center" spacing={2}>
                    <CircularProgress color="inherit" />
                    <Typography>Processing your payment...</Typography>
                </Stack>
            </Backdrop>
        </div>
    );
}