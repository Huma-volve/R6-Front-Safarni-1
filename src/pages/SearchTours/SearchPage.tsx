import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Input from "@mui/material/Input";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
export default function SearchPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  return (
    <div className="flex flex-row items-center justify-center mt-5">
      <div className=" flex gap-5">
        <BackButton
          className="w-[43px] h-[43px] rounded-full p-[10px]  bg-[#F3F4F6] flex items-center justify-center"
          onClick={() => navigate(-1)}
        />
        <form onSubmit={() => {}} className="relative ">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#3F83F8]" />
          <Input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className=" w-230 h-10 pl-10 pr-4 py-2 border border-[#3F83F8] rounded-xl 
                   focus:outline-none focus:ring-2 focus:ring-[#ffffff] shadow-[0_4px_10px_0_#3F52B433]"
          />
        </form>
      </div>
    </div>
  );
}
