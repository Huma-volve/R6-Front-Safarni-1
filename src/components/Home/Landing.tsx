import landing from "./../../assets/landing.png";
import arrow from "./../../assets/Clip-path-group.png";
export default function Landing() {
  return (
    <div className=" flex items-center justify-between">
      <div
        className="flex flex-col md:items-start justify-center md:w-[513px] md:h-[349px]
     p-10 m-10"
      >
        <h1 className="relative font-poppins font-medium text-[51px] leading-[150%] tracking-normal text-[#111928]">
          Visit The Most{" "}
          <span className="text-[#1E429F]">Beautiful Places</span> In World
          <img className=" absolute left-95 top-33" src={arrow} alt="arrow" />
        </h1>
        {/* <span className="w-full flex items-end justify-end bg-amber-400"> */}

        {/* </span> */}
        <p className="font-poppins font-normal text-[20px] leading-[170%] tracking-[0] text-[#4B5563] mt-1">
          "Explore stunning destinations around the globe. Find travel
          inspiration, top attractions, and plan your next adventure—all from
          one platform."
        </p>
      </div>
      <div className="hidden md:m-10 md:block">
        <img src={landing} alt="landing-image" />
      </div>
    </div>
  );
}
