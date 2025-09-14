import { useState } from "react";
import { NavLink } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { Search, SlidersHorizontal } from "lucide-react";
import Logo from "../../assets/images/Logo.jpg";
import DefaultAvatar from "../../assets/images/person1.jpg";
// import type { NavbarProps,NavItem } from "../../types/sylvia/types";
import NavbarMobile from "../NavbarMobile/NavbarMobile";

const defaultLinks = [
  { label: "Home", to: "/" },
  { label: "Favorite", to: "/favorite" },
  { label: "Compare", to: "/compare" },
  { label: "Maps", to: "/maps" },
];

export default function Navbar({
  links = defaultLinks,
  user = null,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div
        className="fixed top-8 left-0 right-0 h-[80px] mx-[100px] z-50 
        hidden md:flex items-center justify-between px-6 py-2 
        rounded-xl bg-white shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="w-[74px] h-[78px] flex flex-col items-center">
            <div className="w-[45px] h-[42px]">
              <img src={Logo} alt="Logo" className="w-full h-full" />
            </div>
            <div className="text-blue-900 font-semibold text-lg text-center">
              Safarni
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-6 text-2xl text-gray-900 font-medium">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to}>
              {link.label}
            </NavLink>
          ))}
        </nav>

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
            <Avatar
              alt={"User"}
              src={DefaultAvatar}
            />
          </NavLink>
        </div>
      </div>

      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <NavbarMobile
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
      </div>
    </>
  );
}
