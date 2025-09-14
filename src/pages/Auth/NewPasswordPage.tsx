import BackButton from "../../components/BackButton";
import lockImage from "../../assets/lock-img.png";
import Logo from "../../components/Logo";
import { useNavigate } from "react-router-dom";
import NewPasswordForm from "../../components/Auth/NewPasswordForm";
export default function NewPasswordPage() {
  const navigate = useNavigate();
  return (
    <>
      <Logo className="hidden md:flex flex-row md:justify-end justify-center " />
      <div className=" flex flex-row justify-center items-center">
        <div className="flex flex-col justify-start items-start w-[510px] h-[470px]  rounded-[30px] gap-[10px]">
          <BackButton
            className="w-[45px] h-[50px] rounded-full p-[10px]  bg-[#F3F4F6] hidden md:flex items-center justify-center"
            onClick={() => navigate(-1)}
          />
          <div className="hidden md:flex items-center justify-center w-[510px] h-[470px]  rounded-[30px]">
            <img src={lockImage} alt="lock-image" />
          </div>
        </div>
        <NewPasswordForm />
      </div>
    </>
  );
}
