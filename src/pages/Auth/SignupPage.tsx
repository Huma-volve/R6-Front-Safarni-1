import SignupForm from "../../components/Auth/SignupForm";
import Logo from "../../components/Logo";
import signupImage from "../../assets/phone-sign-img.png";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";
export default function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto">
      <Logo className="hidden md:flex flex-row md:justify-end justify-center " />
      <div className=" flex justify-center items-center">
        <div className="flex flex-col justify-start items-start w-[510px] h-[470px] rounded-[30px] gap-[10px]">
          <BackButton
            className="z-1 w-[45px] h-[55px] rounded-full p-[10px]  bg-[#F3F4F6] hidden md:flex items-center justify-center"
            onClick={() => navigate(-1)}
          />
          <div className="hidden md:flex items-center justify-center bg-[#F4F4F4] w-[510px] h-[470px] rounded-[30px]">
            <img src={signupImage} alt="login-image" />
          </div>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
