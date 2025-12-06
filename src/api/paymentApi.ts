const API_BASE = "https://round7-safarni-team-one.huma-volve.com/api/";

export async function initiateCheckout(
  bookingId: number,
  bookingType: "room" | "car" | "flight" | "tour"
) {
  try {
    const res = await fetch(
      `${API_BASE}/checkout?booking_id=${bookingId}&booking_type=${bookingType}`,
      { method: "GET" }
    );

    if (!res.ok) {
      console.log("initiateCheckout:", res.statusText);
    }

    return await res.json();
  } catch (err) {
    console.log("initiateCheckout exception:", err);
  }
}
export async function confirmCheckout(payload: {
  reference: string;
  status: string;
  method: string;
}) {
  try {
    const res = await fetch(`${API_BASE}/checkout/confirm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.log("initiateCheckout:", res.statusText);
    }

    return await res.json();
  } catch (err) {
    console.error("confirmCheckout exception:", err);
    return { ok: false, ...payload, isFallback: true };
  }
}

export async function processStripePayment(_: {
  bookingId: number;
  bookingType: string;
  amount: number;
}) {
  return {
    url: "https://checkout.stripe.com/pay/cs_test_fakeStripeSession",
    sessionId: "fake_stripe_session_123",
  };
}
