import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-50">
      {/* Navbar */}
      <Navbar user={{ name: "Sarah", avatar: "https://i.pravatar.cc/40" }} />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 mt-[120px]">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
