import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ToggleOffTwoToneIcon from "@mui/icons-material/ToggleOffTwoTone";
import { useNavigate } from "react-router-dom";

export default function AccountSecurity() {

  const navigate = useNavigate();

  function click () {
    navigate("/profile");
  }



  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6 overflow-hidden">
      <div className="w-full max-w-2xl lg:max-w-3xl xl:max-w-4xl">
        <div className="flex items-center mb-6">
          <button onClick={click} className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition">
            <ArrowBackIcon className="text-gray-700" fontSize="medium" />
          </button>
        </div>

        <div className="rounded-2xl border border-gray-300 shadow-sm bg-white p-6 lg:p-8">
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-center mb-6">
            Account & Security
          </h2>
          <div className="flex justify-between items-center py-4 border-b cursor-pointer hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 ease-in-out">
            <span className="text-gray-800 font-medium text-base lg:text-lg">
              Biometric ID
            </span>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full transition">
              <ToggleOffTwoToneIcon fontSize="large" color="disabled" />
            </button>
          </div>

          <div className="flex justify-between items-center py-4 border-b cursor-pointer hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 ease-in-out">
            <span className="text-gray-800 font-medium text-base lg:text-lg">
              Face ID
            </span>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full transition">
              <ToggleOffTwoToneIcon fontSize="large" color="disabled" />
            </button>
          </div>

          <div className="flex justify-between items-center py-4 border-b cursor-pointer hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 ease-in-out">
            <div>
              <p className="font-medium text-gray-800 text-base lg:text-lg">
                Device Management
              </p>
              <p className="text-sm lg:text-base text-gray-500">
                Manage your account on the various devices you own.
              </p>
            </div>
            <ChevronRightIcon className="text-gray-400" fontSize="medium" />
          </div>

          <div className="flex justify-between items-center py-4 border-b cursor-pointer hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 ease-in-out">
            <div>
              <p className="font-medium text-gray-800 text-base lg:text-lg">
                Deactivate Account
              </p>
              <p className="text-sm lg:text-base text-gray-500">
                Temporarily deactivate your account. Easily reactivate when
                you’re ready.
              </p>
            </div>
            <ChevronRightIcon className="text-gray-400" fontSize="medium" />
          </div>

          <div className="flex justify-between items-center py-4 cursor-pointer hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 ease-in-out">
            <div>
              <p className="font-medium text-red-500 text-base lg:text-lg">
                Delete Account
              </p>
              <p className="text-sm lg:text-base text-gray-500">
                Permanently remove your account and data. Proceed with caution.
              </p>
            </div>
            <ChevronRightIcon className="text-gray-400" fontSize="medium" />
          </div>
        </div>
      </div>
    </div>
  );
}
