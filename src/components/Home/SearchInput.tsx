import clsx from 'clsx';

const SearchInput = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}) => (
  <input
    type="text"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search..."
    className={clsx(
      'flex-1 p-2 border border-gray-300',
      searchQuery ? 'rounded-l-lg' : 'rounded-lg',
    )}
  />
);

export default SearchInput;
