import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ArrowBack = () => {
    const navigate = useNavigate();
    return (
        <>
            <button
                onClick={() => navigate(-1)}
                className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer"
            >
                <ChevronLeft
                    size={40}
                    className="rounded-full px-2 py-2 text-gray-800"
                />
            </button>
        </>
    );
};
