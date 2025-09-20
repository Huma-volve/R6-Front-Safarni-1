import { Email, Person, LocationOn, Phone } from "@mui/icons-material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate } from "react-router-dom";
import { getPersonalInfo } from "../../../api/PersonalInfo/PersonalInfo";
import { useQuery } from "@tanstack/react-query";

const PersonalInfo = () => {
  const navigate = useNavigate();
  function click () {
    navigate("/profile");
  }

  const {data} = useQuery({
    queryKey : ["personalInfo"],
    queryFn : getPersonalInfo
  })

  let info = data?.data.user


  return <>
    <div className="flex flex-col items-center px-4">
      <div className="w-full lg:w-4/5 max-w-2xl mb-4 flex ">
        <button onClick={click}>
          <ArrowBackRoundedIcon fontSize="large" className="cursor-pointer text-gray-700 bg-gray-200 rounded-full" />
        </button>
      </div>

      <form className="w-full lg:w-4/5 max-w-2xl bg-white p-6 rounded-xl shadow-md border border-gray-700">
        <div className="flex items-center justify-center mb-6">
          <h2 className="text-2xl font-bold text-black">
            Personal Information
          </h2>
        </div>

        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-black"
          >
            Name
          </label>
          <div className="flex items-center border border-gray-700 rounded-lg p-2">
            <Person className="text-gray-400 mr-2" fontSize="small" />
            <input
              type="text"
              id="name"
              placeholder={info?.name}
              required
              className="bg-transparent w-full text-sm text-black focus:outline-none placeholder:text-black"
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-black"
          >
            Email
          </label>
          <div className="flex items-center border border-gray-700 rounded-lg p-2">
            <Email className="text-gray-400 mr-2" fontSize="small" />
            <input
              type="email"
              id="email"
              placeholder={data?.data.user.email}
              required
              className="bg-transparent w-full text-sm text-black focus:outline-none placeholder:text-black"
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="location"
            className="block mb-2 text-sm font-medium text-black"
          >
            Location
          </label>
          <div className="flex items-center border border-gray-700 rounded-lg p-2">
            <LocationOn className="text-gray-400 mr-2" fontSize="small" />
            <input
              type="text"
              id="location"
              placeholder={info?.email}
              required
              className="bg-transparent w-full text-sm text-black focus:outline-none placeholder:text-black"
            />
          </div>
        </div>

        <div className="mb-5">
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-black"
          >
            Phone Number
          </label>
          <div className="flex items-center border border-gray-700 rounded-lg p-2">
            <Phone className="text-gray-400 mr-2" fontSize="small" />
            <input
              type="tel"
              id="phone"
              placeholder={info?.email_verified_at}
              required
              className="bg-transparent w-full text-sm text-black focus:outline-none placeholder:text-black"
            />
          </div>
        </div>
      </form>
    </div>
</>
};

export default PersonalInfo;
