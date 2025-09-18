import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout/Layout.tsx";
import Profile from "./pages/Profile/Profile";
import PersonalInfo from "./pages/Profile/PersonalInfo/PersonalInfo";
import AccountSecurity from "./pages/Profile/AccountAndSec/AccountAndSec";
import MyBooking from "./pages/Profile/MyBooking/MyBooking";
import AppLanguage from "./pages/Profile/AppLanguage/AppLanguage";
import Favorites from "./pages/Favorite/Favorite";
import Compare from "./pages/Compare/Compare";
import CarBooking from "./pages/CarBooking/CarBooking";
import CarDetails from "./pages/CarBooking/CarDetails";
import CarMap from "./pages/CarBooking/CarBooking.tsx";
import HotelBooking from "./pages/HotelBooking/HotelBooking";
import HotelReview from "./pages/HotelBooking/HotelReview";
<<<<<<< HEAD
=======
import Destination from "./pages/Destination/Destination";
// import Map from "./pages/Map/Map";
// import Tour from "./pages/Tours/Tours";
// import Checkout from "./pages/Checkout/Checkout";
// import Payment from "./pages/Checkout/Payment";
// import Success from "./pages/Checkout/Success";
>>>>>>> 8c43958d4c37f3992be2e55326e9b8b3ac6ae069
import WelcomePage from "./pages/Auth/WelcomePage";
import SignupPage from "./pages/Auth/SignupPage";
import LoginPage from "./pages/Auth/LoginPage";
import ForgetPasswordPage from "./pages/Auth/ForgetPasswordPage";
import VerifyCodePage from "./pages/Auth/VerifyCodePage";
import NewPasswordPage from "./pages/Auth/NewPasswordPage";
import PasswordResetPage from "./pages/Auth/PasswordResetPage";
import HomePage from "./pages/SearchTours/HomePage";
import SearchPage from "./pages/SearchTours/SearchPage";
import FilterPage from "./pages/SearchTours/FilterPage";
import ToursPage from "./pages/SearchTours/ToursPage";
<<<<<<< HEAD
import Tours from "./pages/Tours/Tours";
import Map from "./pages/Map/Map";
import DestinationPage from "./pages/DestinationPage/DestinationPage";
import NotFound from "./pages/NotFound/NotFound";
import ScrollToTop from "./components/ScrollTop/ScrollTop";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext.tsx";
=======
>>>>>>> 8c43958d4c37f3992be2e55326e9b8b3ac6ae069

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
<<<<<<< HEAD
      <AuthProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<Layout />}>
              {/* Auth */}
              <Route index element={<WelcomePage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/forget-password" element={<ForgetPasswordPage />} />
              <Route path="/verify-code" element={<VerifyCodePage />} />
              <Route path="/new-password" element={<NewPasswordPage />} />
              <Route path="/password-reset" element={<PasswordResetPage />} />
              {/* End Auth */}

              {/* Profile Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/personal-info"
                element={
                  <ProtectedRoute>
                    <PersonalInfo />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account-security"
                element={
                  <ProtectedRoute>
                    <AccountSecurity />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-booking"
                element={
                  <ProtectedRoute>
                    <MyBooking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/app-language"
                element={
                  <ProtectedRoute>
                    <AppLanguage />
                  </ProtectedRoute>
                }
              />
              {/* Profile Routes */}

              <Route
                path="/favorite"
                element={
                  <ProtectedRoute>
                    <Favorites />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compare"
                element={
                  <ProtectedRoute>
                    <Compare />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cars"
                element={
                  <ProtectedRoute>
                    <CarBooking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/carDetails/:id"
                element={
                  <ProtectedRoute>
                    <CarDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/carMap"
                element={
                  <ProtectedRoute>
                    <CarMap />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hotel"
                element={
                  <ProtectedRoute>
                    <HotelBooking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hotelReview/:id"
                element={
                  <ProtectedRoute>
                    <HotelReview />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/maps"
                element={
                  <ProtectedRoute>
                    <Map />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/internalTours"
                element={
                  <ProtectedRoute>
                    <Tours />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/destination/:id"
                element={
                  <ProtectedRoute>
                    <DestinationPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search"
                element={
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/filter"
                element={
                  <ProtectedRoute>
                    <FilterPage />
                  </ProtectedRoute>
                }
              ></Route>
              <Route
                path="/tours"
                element={
                  <ProtectedRoute>
                    <ToursPage />
                  </ProtectedRoute>
                }
              ></Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
=======
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<Layout />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/personal-info" element={<PersonalInfo />} />
            <Route path="/account-security" element={<AccountSecurity />} />
            <Route path="/my-booking" element={<MyBooking />} />
            <Route path="/app-language" element={<AppLanguage />} />
            <Route path="/favorite" element={<Favorites />} />
            {/* <Route path="/compare" element={<Compare />} /> */}
            <Route path="/car-booking" element={<CarBooking />} />
            <Route path="/car-details/:id" element={<CarDetails />} />
            <Route path="/car-map" element={<CarMap />} />
            <Route path="/destination/:id" element={<Destination />} />
            <Route path="/hotel-booking" element={<HotelBooking />} />
            <Route path="/hotel-review/:id" element={<HotelReview />} />
            {/* <Route path="/maps" element={<Map />} />
            <Route path="/tours" element={<Tour />} />
            <Route path="/checkout" element={<Checkout />}>
              <Route index element={<Payment />} />
              <Route path="success" element={<Success />} /> */}
            <Route path="/forget-password" element={<ForgetPasswordPage />} />
            <Route path="/verify-code" element={<VerifyCodePage />} />
            <Route path="/new-password" element={<NewPasswordPage />} />
            <Route path="/password-reset" element={<PasswordResetPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/filter" element={<FilterPage />}></Route>
            <Route path="/tours" element={<ToursPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
>>>>>>> 8c43958d4c37f3992be2e55326e9b8b3ac6ae069
    </QueryClientProvider>
  );
}

export default App;
