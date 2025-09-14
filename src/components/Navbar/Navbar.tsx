import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Search, SlidersHorizontal } from "lucide-react";

export const Navbar = () => {
  return (
    <>
      {/* Desktop Navigation Bar */}
      <div
        className="fixed top-8 left-0 right-0 h-[94px] mx-[100px] z-50 items-center justify-between px-6 py-2 
                hidden md:flex rounded-xl bg-white"
      >
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="w-[74px] h-[78px] gap-2 flex flex-col items-center">
            <div className="w-[45px] h-[42px]">
              <img
                src="/src/assets/images/logo.png"
                alt="Logo"
                className="w-full h-full"
              />
            </div>
            <div className="text-blue-900 font-semibold text-lg text-center">
              Safarni
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* NavLinks */}
          <nav className="hidden md:flex items-center gap-6 text-2xl text-gray-900 font-medium">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/favorite"}>Favorite</NavLink>
            <NavLink to={"/compare"}>Compare</NavLink>
            <NavLink to={"/maps"}>maps</NavLink>
          </nav>
        </div>
        {/* Icon Right */}
        <div className="flex items-center gap-4">
          <NavLink
            to={"/search"}
            className="p-2 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <Search className="text-gray-600" />
          </NavLink>
          <NavLink
            to={"/filter"}
            className="p-2 rounded-full hover:bg-slate-100 cursor-pointer"
          >
            <SlidersHorizontal className="text-gray-600" />
          </NavLink>
          <NavLink to={"/profile"}>
            <Avatar alt="Cindy Baker" src="/src/assets/images/avatar.png" />
          </NavLink>
        </div>
      </div>
    </>
  );
};
