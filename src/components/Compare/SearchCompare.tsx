import { useState, useEffect } from "react";
import { ArrowBack } from "../ArrowBack/ArrowBack";

const SearchCompare = ({
  formInput,
  onSearch,
}: {
  formInput: string;
  onSearch: (query: string) => void;
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch(search.trim());
    }, 500);

    return () => clearTimeout(delay);
  }, [search, onSearch]);

  return (
    <div className="px-4 md:px-12 lg:px-28 absolute top-[64px] md:top-[158px] left-0 w-full z-40">
      <div className="flex flex-col md:items-center md:flex-row gap-4 w-full px-4">
        <ArrowBack />
        {formInput === "true" ? (
          <div className="flex items-center w-full relative">
            <input
              type="search"
              placeholder="Search tours..."
              className="w-full rounded-2xl border-[0.5px] border-gray-200 bg-white backdrop-blur-sm px-12 md:px-14 py-4 md:py-5 text-sm font-medium text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 ease-in-out"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-blue-500 transition-colors duration-300"
            >
              <path
                d="M9.584 19.501a7.917 7.917 0 1 0 0-15.833 7.917 7.917 0 0 0 0 15.833m8.75.834-1.667-1.667"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SearchCompare;
