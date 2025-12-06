import landing from "./../../assets/landing.png";
import headers from "./../../assets/headers.png";
import arrow from "./../../assets/Clip-path-group.png";

export default function Landing() {
  return (
    <>
      <div className="md:mx-[100px] flex flex-col-reverse md:flex-row items-center justify-between mt-30 overflow-hidden ">
        <div className="flex flex-col md:items-start justify-center p-4 md:p-0 pb-20 ">
          <div className="relative mb-5">
            <h1 className="hidden md:block font-poppins font-medium text-3xl md:text-5xl max-w-lg tracking-normal text-[#111928]">
              Visit The Most{" "}
              <span className="text-[#1E429F]">Beautiful Places</span> In World
            </h1>
            <img className=" absolute right-0 top-14" src={arrow} alt="arrow" />
          </div>
          <p className="hidden md:block font-poppins font-normal text-[20px] leading-[170%] tracking-[0] text-[#4B5563] mt-1">
            "Explore stunning destinations around the globe. Find travel
            inspiration, top attractions, and plan your next adventure—all from
            one platform."
          </p>
        </div>
        <div className="hidden md:m-10 md:block w-6xl ">
          <img src={landing} alt="landing-image" />
        </div>
        <div className="md:hidden md:m-10 px-4">
          <img
            src={headers}
            alt="landing-image"
            className=" object-cover h-[300px] rounded-2xl"
          />
        </div>
      </div>
    </>
  );
}
