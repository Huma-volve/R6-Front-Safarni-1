import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

const Layout = () => {
  const location = useLocation();
  const hideNavBar =
    location.pathname === "/" ||
    location.pathname === "/signup" ||
    location.pathname === "/login" ||
    location.pathname === "/forget-password" ||
    location.pathname === "/verify-code" ||
    location.pathname === "/new-password" ||
    location.pathname === "/password-reset";
  return (
    <>
      <div className="min-h-screen flex flex-col w-full">
        {!hideNavBar && <Navbar />}

        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
