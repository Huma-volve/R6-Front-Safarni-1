import BackButton from "../components/BackButton";
import lockImage from "../assets/lock-img.png";
import Logo from "../components/Logo";
import ForgetPasswordForm from "../components/Auth/ForgetPasswordForm";
import { useNavigate } from "react-router-dom";
export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto">
      <Logo className="hidden md:flex flex-row md:justify-end justify-center " />
      <div className=" flex justify-center items-center">
        <div className="flex flex-col justify-start items-start w-[510px] h-[470px]  rounded-[30px] gap-[10px]">
          <BackButton
            className="w-[45px] h-[50px] rounded-full p-[10px]  bg-[#F3F4F6] hidden md:flex items-center justify-center"
            onClick={() => navigate(-1)}
          />
          <div className="hidden md:flex items-center justify-center w-[510px] h-[470px]">
            <img src={lockImage} alt="lock-image" />
          </div>
        </div>
        <ForgetPasswordForm />
      </div>
    </div>
  );
}
