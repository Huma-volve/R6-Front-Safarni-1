import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <div className="container mx-auto px-4">
        <Navbar />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
