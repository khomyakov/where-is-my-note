import { LuXCircle } from "react-icons/lu";

const ClearButton = ({
    searchQuery,
    onClear,
  }: {
    searchQuery: string;
    onClear: () => void;
  }) =>
    searchQuery && (
      <button
        onClick={onClear}
        className="p-2 bg-white hover:bg-gray-300 border border-l-0 rounded-r-lg border-gray-300"
      >
        <LuXCircle size={24} />
      </button>
    );
  
export default ClearButton;