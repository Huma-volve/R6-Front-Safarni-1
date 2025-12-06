import { Navbar } from "../../components/Navbar/Navbar";
import SearchCompare from "../../components/Compare/SearchCompare";
import Card from "../../components/Compare/Card";
import CompareCard from "../../components/Compare/CompareCard";
import { useState } from "react";
import NavbarMobile from "../../components/NavbarMobile/NavbarMobile";

const Compare = () => {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <>
      <Navbar />
      <SearchCompare onSearch={setSearchQuery} formInput={"true"} />
      <div className="pt-20 md:pt-40 px-8 md:px-[130px] pb-8 overflow-hidden">
        <Card searchQuery={searchQuery} />

        <CompareCard tour={null} />
      </div>
      <NavbarMobile />
    </>
  );
};

export default Compare;
