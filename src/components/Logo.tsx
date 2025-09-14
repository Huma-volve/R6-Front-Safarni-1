import logo from "../assets/logo.png";
type LogoStyle={
  className?:string;
}
export default function Logo({ className }:LogoStyle) {
  return (
    <div className={className}>
      <div className=" flex md:w-[145px] md:h-[104px] flex-col items-center sm:justify-center md:gap-2 ">
        <img
          className="md:w-[55px] md:h-[52px] w-[200px] h-[202px]"
          src={logo}
          alt="logo-image"
        />
        <h4 className="text-[#1E429F] font-poppins font-semibold text-[25px] leading-[100%] text-center mb-10">
          Safarni
        </h4>
      </div>
    </div>
  );
}
// 
