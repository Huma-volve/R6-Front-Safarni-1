import successImage from "../../assets/success-img.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router-dom";

export default function PasswordResetPage() {
  const navigate = useNavigate();
  return (
    <>
      <Logo className="hidden md:flex flex-row md:justify-end justify-center " />
      <div className=" flex flex-row justify-center items-center">
        <div className="flex flex-col justify-start items-start w-[510px] h-[470px]  rounded-[30px] gap-[10px]">
          <div className="hidden md:flex items-center justify-center w-[510px] h-[470px]  rounded-[30px]">
            <img src={successImage} alt="success-image" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center md:w-[510px] md:h-[470px] md:ml-[49px] gap-[10px] w-sm h-sm mr-3.5 ">
          <CheckCircleIcon fontSize="large" className="text-[#31C48D]" />
          <h1
            className="font-poppins font-medium text-[28px] leading-[100%] 
        tracking-normal text-center text-[#111928]"
          >
            password reset
          </h1>
          <p
            className="font-poppins font-normal text-[21px] leading-[150%] 
        tracking-normal text-center text-[#6B7280] mb-[20px]"
          >
            your password has been successfully reset click below to log in
            magically.
          </p>
          <button
            className="md:w-[510px] md:h-[56px] w-sm h-[56px] rounded-[8px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] bg-[#1E429F] text-[#FFFFFF]
              font-poppins font-semibold text-[20px] leading-[25px] tracking-[0.02em] capitalize"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
        </div>
      </div>
    </>
  );
}
