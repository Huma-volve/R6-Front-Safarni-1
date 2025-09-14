import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import NewPasswordPage from "./pages/NewPasswordPage";
import PasswordResetPage from "./pages/PasswordResetPage";
import HomePage from "./pages/HomePage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./pages/SearchPage";
import FilterPage from "./pages/FilterPage";
import ToursPage from "./pages/ToursPage";
function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/forget-password"
            element={<ForgetPasswordPage />}
          ></Route>
          <Route path="/verify-code" element={<VerifyCodePage />}></Route>
          <Route path="/new-password" element={<NewPasswordPage />}></Route>
          <Route path="/password-reset" element={<PasswordResetPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/filter" element={<FilterPage />}></Route>
          <Route path="/tours" element={<ToursPage />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
