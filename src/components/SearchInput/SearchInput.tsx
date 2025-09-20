import { useState } from "react";
import { useDebouncedSearch } from "../../hooks/useDebouncedSearch";

const SearchInput = ({
  onSearch,
}: {
  onSearch: (coords: [number, number]) => void;
}) => {
  const [query, setQuery] = useState("");
  const coords = useDebouncedSearch(query);

  if (coords) {
    onSearch(coords);
  }

  return (
    <div className="pb-4">
      <div className="relative mx-4 md:mx-[100px]">
        <input
          type="search"
          placeholder="Search for places, restaurants, hotels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-2xl border-[0.5px] border-transparent bg-white backdrop-blur-sm px-12 md:px-14 py-4 md:py-5 text-sm font-medium text-gray-500 shadow-md shadow-blue-400/20 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 transition-all duration-300 ease-in-out"
        />
        <svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-4 md:left-5 top-1/2 -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-blue-500 transition-colors duration-300 cursor-pointer"
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
    </div>
  );
};

export default SearchInput;
