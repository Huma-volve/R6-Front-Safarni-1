import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout/Layout";
import Profile from "./pages/Profile/Profile";
import PersonalInfo from "./pages/Profile/PersonalInfo/PersonalInfo";
import AccountSecurity from "./pages/Profile/AccountAndSec/AccountAndSec";
import MyBooking from "./pages/Profile/MyBooking/MyBooking";
import AppLanguage from "./pages/Profile/AppLanguage/AppLanguage";
import Favorites from "./pages/Favorite/Favorite";
import Compare from "./pages/Compare/Compare";
import CarBooking from "./pages/CarBooking/CarBooking";
import CarDetails from "./pages/CarBooking/CarDetails";
import CarMap from "./pages/CarBooking/CarMaping";
import HotelBooking from "./pages/HotelBooking/HotelBooking";
import HotelReview from "./pages/HotelBooking/HotelReview";
import Home from "./pages/Home/Home";
import Map from "./pages/Map/Map";
import Tour from "./pages/Tours/Tours";
import Checkout from "./pages/Checkout/Checkout";
import Payment from "./pages/Checkout/Payment";
import Success from "./pages/Checkout/Success";
import WelcomePage from "./pages/Auth/WelcomePage";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import ForgetPasswordPage from "./pages/Auth/ForgetPasswordPage";
import VerifyCodePage from "./pages/Auth/VerifyCodePage";
import NewPasswordPage from "./pages/Auth/NewPasswordPage";
import PasswordResetPage from "./pages/Auth/PasswordResetPage";
import HomePage from "./pages/Auth/HomePage";
import SearchPage from "./pages/Auth/SearchPage";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignupPage />} />
          <Route element={<Layout />}>
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
            <Route path="/hotel-booking" element={<HotelBooking />} />
            <Route path="/hotel-review/:id" element={<HotelReview />} />
            <Route path="/home" element={<Home />} />
            <Route path="/maps" element={<Map />} />
            <Route path="/tours" element={<Tour />} />
            <Route path="/checkout" element={<Checkout />}>
              <Route index element={<Payment />} />
              <Route path="success" element={<Success />} />
            </Route>
            <Route path="/welcome" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
            <Route path="/verify-code" element={<VerifyCodePage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
            <Route path="/auth-home" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
