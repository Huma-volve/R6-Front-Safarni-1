import { Outlet } from "react-router-dom";
import { Navbar } from "../Navbar/Navbar";

const Layout = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col w-full">
        <Navbar />

        <div className="container mx-auto">
          <Outlet />
        </div>

      </div>
    </>
  )
};

export default Layout;
