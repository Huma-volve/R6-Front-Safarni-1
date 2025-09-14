import { Heart, House, Map } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const NavbarMobile = () => {
    const location = useLocation();
  
    return <>
    {/* Mobile Bottom Navigation for Map Page */}
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
        <div className="flex items-center justify-around py-2">
          <NavLink
            to="/"
            className={`flex flex-col items-center py-2 px-3 ${
              location.pathname === "/" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <div
              className={
                "w-6 h-6 mb-1 flex items-center justify-center rounded-full"
              }
            >
              <House
                className={`h-6 w-6  z-10  ${
                  location.pathname === "/" ? "bg-blue-500 text-white mb-5" : ""
                }`}
              />
              {location.pathname === "/" && (
                <span className="bg-blue-500 h-9 w-9 absolute top-0 rounded-full"></span>
              )}
            </div>
            <span className="text-xs font-medium">Home</span>
          </NavLink>

          <NavLink
            to="/favorite"
            className={`flex flex-col items-center py-2 px-3 ${
              location.pathname === "/favorite"
                ? "text-blue-600"
                : "text-gray-600"
            }`}
          >
            <div
              className={
                "w-6 h-6 mb-1 flex items-center justify-center rounded-full"
              }
            >
              <Heart
                className={`h-6 w-6  z-10  ${
                  location.pathname === "/favorite"
                    ? "bg-blue-500 text-white mb-5"
                    : ""
                }`}
              />
              {location.pathname === "/favorite" && (
                <span className="bg-blue-500 h-9 w-9 absolute top-0 rounded-full"></span>
              )}
            </div>
            <span className="text-xs font-medium">Favorite</span>
          </NavLink>
          <NavLink
            to="/compare"
            className={`flex flex-col items-center py-2 px-3 ${
              location.pathname === "/compare"
                ? "text-blue-600"
                : "text-gray-600"
            }`}
          >
            <div
              className={
                "w-6 h-6 mb-1 flex items-center justify-center rounded-full"
              }
            >
              <svg
                width={25}
                height={24}
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6  z-10  ${
                  location.pathname === "/compare"
                    ? "bg-blue-500 text-white mb-5"
                    : ""
                }`}
              >
                <path
                  d="M23.552 14.885c-.01-.049-.011-.1-.03-.145l-4.227-9.965c-.005-.01-.014-.017-.019-.027-.018-.039-.044-.07-.069-.104-.02-.028-.035-.06-.06-.086l-.033-.027c-.03-.026-.064-.043-.098-.064-.017-.01-.033-.025-.052-.034-.013-.007-.022-.019-.036-.025h-.003c-.012-.006-.025-.007-.038-.011-.035-.013-.072-.015-.11-.022-.051-.009-.101-.019-.154-.016-.01 0-.02-.004-.031-.003l-4.433.424a1.84 1.84 0 0 0-1.66-1.051c-.855 0-1.57.588-1.778 1.38l-4.445.424c-.033.003-.06.02-.09.028-.037.008-.074.01-.108.024q-.006 0-.01.002c-.01.004-.016.013-.025.017-.038.019-.069.044-.102.069-.03.02-.061.037-.087.062l-.027.031c-.028.032-.046.07-.068.107-.016.026-.04.046-.052.075L1.48 15.71l-.001.002c-.015.036-.015.078-.024.116-.013.051-.032.103-.032.154v.002a4.927 4.927 0 0 0 4.919 4.923 4.927 4.927 0 0 0 4.92-4.923v-.002c0-.051-.02-.103-.032-.154-.01-.039-.01-.08-.024-.116l-.001-.002-3.849-8.89 3.546-.338a1.84 1.84 0 0 0 1.598.938c.81 0 1.493-.53 1.74-1.257l3.326-.318-3.773 8.894c-.019.044-.02.096-.03.145-.008.042-.025.083-.025.125a4.926 4.926 0 0 0 4.92 4.922 4.926 4.926 0 0 0 4.919-4.922c0-.042-.018-.083-.026-.125m-1.713-.567h-6.363l3.181-7.5zM6.342 7.966l3.173 7.327H3.169zm0 11.558a3.54 3.54 0 0 1-3.465-2.846h6.93a3.54 3.54 0 0 1-3.465 2.846M12.5 6.036a.462.462 0 1 1 0-.924.462.462 0 0 1 0 .924m6.157 12.511a3.54 3.54 0 0 1-3.464-2.845h6.93a3.54 3.54 0 0 1-3.466 2.845"
                  fill="currentColor"
                />
              </svg>
              {location.pathname === "/compare" && (
                <span className="bg-blue-500 h-9 w-9 text-black absolute top-0 rounded-full"></span>
              )}
            </div>
            <span className="text-xs font-medium">compare</span>
          </NavLink>

          <NavLink
            to="/maps"
            className={`flex flex-col items-center py-2 px-3 ${
              location.pathname === "/maps" ? "text-blue-600" : "text-gray-600"
            }`}
          >
            <div
              className={
                "w-6 h-6 mb-1 flex items-center justify-center rounded-full"
              }
            >
              <Map
                className={`h-6 w-6  z-10  ${
                  location.pathname === "/maps"
                    ? "bg-blue-500 text-white mb-5"
                    : ""
                }`}
              />
              {location.pathname === "/maps" && (
                <span className="bg-blue-500 h-9 w-9 absolute top-0 rounded-full"></span>
              )}
            </div>
            <span className="text-xs font-medium">Maps</span>
          </NavLink>
        </div>
      </div>
    </>
}
export default NavbarMobile;