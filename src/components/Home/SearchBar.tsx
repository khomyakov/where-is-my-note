interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onClear: () => void;
  onExpandCollapse: () => void;
}

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onClear,
  onExpandCollapse,
}: SearchBarProps) => {
  return (
    <div className="flex items-center">
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ClearButton searchQuery={searchQuery} onClear={onClear} />
      <ExpandCollapseButton onExpandCollapse={onExpandCollapse} />
    </div>
  );
};

export default SearchBar;
