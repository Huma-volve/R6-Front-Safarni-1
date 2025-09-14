import icon from "../../assets/img/Button Icon.jpg";
import PersonIcon from "@mui/icons-material/Person";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";
import WalletRoundedIcon from "@mui/icons-material/WalletRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { useNavigate } from "react-router-dom";
import Logout from "../../components/Logout/Logout";

const Profile = () => {
  const navigate = useNavigate();

  // قائمة العناصر
  const items = [
    { label: "Personal Information", icon: <PersonIcon color="disabled" />, path: "/personal-info" },
    { label: "My Booking", icon: <WalletRoundedIcon color="disabled" />, path: "/my-booking" },
    { label: "App Language", icon: <LanguageRoundedIcon color="disabled" />, path: "/app-language" },
    { label: "Account & Security", icon: <LockRoundedIcon color="disabled" />, path: "/account-security" },
  ];

  return (
    <div className="container w-full sm:w-[90%] lg:w-[80%] mx-auto mt-6 px-4">
      {/* Profile Header */}
      <div className="personal flex flex-col sm:flex-row items-center gap-5 sm:gap-7 p-5 rounded-lg border border-gray-500 hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 ease-in-out">
        <div className="profile flex relative justify-center sm:justify-start">
          <img
            src={icon}
            alt="Profile Pic"
            loading="lazy"
            className="w-16 h-16 rounded-full"
          />
          <img
            src={icon}
            alt=""
            className="absolute left-12 top-4 w-7 h-7 rounded-full"
          />
        </div>

        <div className="content text-center sm:text-left">
          <h2 className="text-base sm:text-lg font-medium">Lorem ipsum dolor sit amet.</h2>
          <span className="text-sm sm:text-base text-gray-600 block">
            Lorem ipsum dolor sit amet.@gmail.com
          </span>
        </div>
      </div>

      {/* Profile Options */}
      <div className="info mx-auto mt-6 rounded-lg border border-gray-600 overflow-hidden">
        {items.map((item, i) => (
          <div
            key={i}
            onClick={() => navigate(item.path)}
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 ease-in-out"
          >
            <div className="flex items-center gap-2">
              {item.icon}
              <p className="text-sm sm:text-base">{item.label}</p>
            </div>
            <ArrowCircleRightRoundedIcon />
          </div>
        ))}

        {/* Logout */}
        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-red-50 hover:scale-[1.02] transition-all duration-200 ease-in-out">
          <button className="flex items-center gap-2">
            <LogoutRoundedIcon color="error" />
            <p className="text-red-700 text-sm sm:text-base">
              <Logout />
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
