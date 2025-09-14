import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-green-500 text-5xl mb-4">✔</div>
      <h1 className="text-xl font-bold">Payment Successful!</h1>
      <p className="mb-4">Thank you for your trust</p>
      <Link to="/" className="px-4 py-2 bg-blue-600 rounded text-white">
        Back to Home
      </Link>
    </div>
  );
}