import { useState } from "react";
import { useCategory } from "../../hooks/useCategory";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Image from "../../assets/img.jpg";
import { NavLink } from "react-router-dom";


export default function Categories() {
  const { data, isLoading, error } = useCategory();
  const [page, setPage] = useState(0);
  const CATEGORY_PER_SLIDE = 4;
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading items</p>;
  if (!data) return <p>No data!</p>;
  const startIndex = page * CATEGORY_PER_SLIDE;


console.log(data);

  const visibleCategories = data.slice(
    startIndex,
    startIndex + CATEGORY_PER_SLIDE
  );
  const handlePrev = () => {
    setPage((prev) => (prev > 0 ? prev - 1 : prev));
  };
  const handleNext = () => {
    setPage((prev) =>
      startIndex + CATEGORY_PER_SLIDE < data.length ? prev + 1 : prev
    );
  };
  return (
    <>
      <h1 className="ml-20 font-poppins font-medium text-[25px] leading-[100%] tracking-normal text-[#111928]">
        Categories
      </h1>
      <div className=" flex flex-col items-center justify-center">
        <div className="flex gap-6 md:justify-between w-full m-10">
          <button onClick={() => handlePrev()}>
            <ArrowBackIosOutlinedIcon />
          </button>
          {visibleCategories.map((category) => (
            <NavLink to={`/${category.title}`} key={category.id} className="flex flex-col justify-center items-center">
              <img
                className="md:w-[248px] md:h-[248px] w-[100px] h-[100px]  rounded-full"
                src={category.image || Image}
                alt="image"
              />
              <h1 className="font-poppins font-medium md:text-3xl text-2xl leading-[100%] tracking-normal text-[#1A56DB]">
                {category.title}
              </h1>
            </NavLink>
          ))}
          <button onClick={() => handleNext()}>
            <ArrowForwardIosOutlinedIcon />
          </button>
        </div>
      </div>
    </>
  );
}
