import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Layout from "./components/layout/Layout";

// Profile pages
import Profile from "./pages/Profile/Profile";
import PersonalInfo from "./pages/Profile/PersonalInfo/PersonalInfo";
import AccountSecurity from "./pages/Profile/AccountAndSec/AccountAndSec";
import MyBooking from "./pages/Profile/MyBooking/MyBooking";
import AppLanguage from "./pages/Profile/AppLanguage/AppLanguage";

// Other feature pages
import Favorites from "./pages/Favorite/Favorite";
import Compare from "./pages/Compare/Compare";
import CarBooking from "./pages/CarBooking/CarBooking";
import CarDetails from "./pages/CarBooking/CarDetails";
import CarMap from "./pages/CarBooking/CarMaping";
import HotelBooking from "./pages/HotelBooking/HotelBooking";
import HotelReview from "./pages/HotelBooking/HotelReview";
import Destination from "./pages/Destination/Destination";
import Map from "./pages/Map/Map";
import Tour from "./pages/Tours/Tours";

// Checkout
import Checkout from "./pages/Checkout/Checkout";
import Success from "./pages/Checkout/Success";
// import { PaymentProvider } from "./context/CheckoutContext"

// Auth pages
import WelcomePage from "./pages/Auth/WelcomePage";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import ForgetPasswordPage from "./pages/Auth/ForgetPasswordPage";
import VerifyCodePage from "./pages/Auth/VerifyCodePage";
import NewPasswordPage from "./pages/Auth/NewPasswordPage";
import PasswordResetPage from "./pages/Auth/PasswordResetPage";

// Search & Tours pages
import HomePage from "./pages/SearchTours/HomePage";
import SearchPage from "./pages/SearchTours/SearchPage";
import FilterPage from "./pages/SearchTours/FilterPage";
import ToursPage from "./pages/SearchTours/ToursPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>

            <Route path="/" element={<WelcomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<Layout />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/account-security" element={<AccountSecurity />} />
            <Route path="/my-booking" element={<MyBooking />} />
            <Route path="/app-language" element={<AppLanguage />} />
            <Route path="/favorite" element={<Favorites />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/car-booking" element={<CarBooking />} />
            <Route path="/car-details/:id" element={<CarDetails />} />
            <Route path="/car-map" element={<CarMap />} />
            <Route path="/destination/:id" element={<Destination />} />
            <Route path="/hotel-booking" element={<HotelBooking />} />
            <Route path="/hotel-review/:id" element={<HotelReview />} />
            <Route path="/maps" element={<Map />} />
            <Route path="/internalTours" element={<Tour />} />
            <Route path="/checkout" element={
              <Checkout />
            } />
            <Route path="/checkout/success" element={<Success />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
            <Route path="/verify-code" element={<VerifyCodePage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/filter" element={<FilterPage />} />
            <Route path="/tours" element={<ToursPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
