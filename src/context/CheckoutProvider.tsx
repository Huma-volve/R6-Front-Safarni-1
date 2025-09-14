import React, { useState } from "react";
import { CheckoutContext } from "./CheckoutContext";
import type { CheckoutResponse } from "../types/sylvia/checkout";

const CheckoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bookingId, setBookingId] = useState<number | null>(null);
    const [bookingType, setBookingType] = useState<string | null>(null);
    const [paymentInfo, setPaymentInfoState] = useState<CheckoutResponse | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<string | null>(null); // ✅ تغيير إضافة طريقة الدفع المختارة

    const setBooking = (id: number, type: string) => {
        setBookingId(id);
        setBookingType(type);
    };

    const setPaymentInfo = (info: CheckoutResponse) => setPaymentInfoState(info);

    return (
        <CheckoutContext.Provider
            value={{
                bookingId,
                bookingType,
                paymentInfo,
                paymentMethod,                 // ✅ مضافة
                setBooking,
                setPaymentInfo,
                setMethod: setPaymentMethod   // ✅ مضافة
            }}
        >
            {children}
        </CheckoutContext.Provider>
    );
};

export default CheckoutProvider;


