import CategoryFilters from "../CategoryFilters/CategoryFilters";
import SearchInput from "../SearchInput/SearchInput";

function SearchAppBar({
    onSearch,
    onFilter,
    onSetHome,
}: {
    onSearch: (coords: [number, number]) => void;
    onFilter?: (type: string) => void;
    onSetHome?: (coords: [number, number]) => void;
}) {
    return (
        <div className="absolute top-[64px] md:top-[158px] left-0 w-full z-40">
            <SearchInput onSearch={onSearch} />
            <CategoryFilters onFilter={onFilter} onSetHome={onSetHome} />
        </div>
    );
}

export default SearchAppBar;
