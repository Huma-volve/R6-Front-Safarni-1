import { Outlet } from "react-router-dom";

export default function CheckoutLayout() {
    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50">
            <header className="w-full p-4 shadow bg-white">
                <h1 className="text-lg font-bold text-center">Checkout</h1>
            </header>

            <main className="flex-1 w-full max-w-3xl p-6">
                <Outlet /> {/* All child routes will render here */}
            </main>
        </div>
    );
}