import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";
import BackButton from "../../components/BackButton";
import loginImage from "../../assets/phone-log-img.png";
import VerifyCodeForm from "../../components/Auth/VerifyCodeForm";
export default function VerifyCodePage() {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto">
      <Logo className="hidden md:flex flex-row md:justify-end justify-center " />
      <div className=" flex justify-center items-center">
        <div className="hidden md:flex flex-col md:justify-start md:items-start w-[510px] h-[470px]  rounded-[30px] gap-[10px]">
          <BackButton
            className="z-1 w-[45px] h-[55px] rounded-full p-[10px]  bg-[#F3F4F6] flex items-center justify-center"
            onClick={() => navigate(-1)}
          />
          <div className="flex items-center justify-center bg-[#F4F4F4] w-[510px] h-[470px]  rounded-[30px]">
            <img src={loginImage} alt="login-image" />
          </div>
        </div>

        <VerifyCodeForm />
      </div>
    </div>
  );
}
