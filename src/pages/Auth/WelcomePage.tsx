import { useNavigate } from "react-router-dom";
import welcomeImage from "../../assets/welcome.png";
import Logo from "../../components/Logo";

export default function WelcomePage() {
  const navigate = useNavigate();
  return (
    <>
      <Logo className="flex flex-row md:justify-end justify-center " />
      <div className=" flex justify-center items-center">
        <div className="flex md:flex-row md:justify-between">
          <div className="hidden md:block items-center justify-center bg-[#F4F4F4] rounded-[30px]">
            <img src={welcomeImage} alt="welcome-image" />
          </div>

          <div className="flex flex-col items-center justify-center gap-[24px] md:w-[510px] md:h-[470px] w-sm h-sm md:ml-[49px]">
            <h1 className="font-poppins font-medium text-[28px] leading-[100%] tracking-normal text-center text-[#111928]">
              welcome
            </h1>
            <p className="font-poppins font-normal text-[21px] leading-[150%] tracking-normal text-center text-[#111928]">
              Safarni is your all-in-one travel guide. Discover destinations,
              compare trip prices, book flights, hotels, car rentals, and local
              tours — all through one interactive experience.
            </p>
            <button
              className="md:w-[510px] md:h-[56px] w-sm h-sm  rounded-[8px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] bg-[#1E429F] text-[#FFFFFF]
              font-poppins font-semibold text-[20px] leading-[25px] tracking-[0.02em] capitalize cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>
            <button
              className="md:w-[510px] md:h-[56px] w-sm h-sm  rounded-[8px] pt-[8px] pr-[16px] pb-[8px] pl-[16px] border-[1px] border-[#1E429F] text-[#1E429F]
              font-poppins font-semibold text-[20px] leading-[25px] tracking-[0.02em] capitalize cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
