import { BrowserRouter, Route, Routes } from "react-router-dom";
import CarBooking from "./pages/CarBooking/CarBooking";
import CarDetails from "./pages/CarBooking/CarDetails";
import HotelBooking from "./pages/HotelBooking/HotelBooking";
import HotelReview from "./pages/HotelBooking/HotelReview";
import CarMap from "./pages/CarBooking/CarMaping";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/carBooking" element={<CarBooking />} />
        <Route path="/carDetails/:id" element={<CarDetails />} />
        <Route path="/hotelBooking" element={<HotelBooking />} />
        <Route path="/hotelReview/:id" element={<HotelReview />} />
        <Route path="/carMap" element={<CarMap />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
