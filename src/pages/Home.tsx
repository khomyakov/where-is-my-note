import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import React, { useState } from 'react';
import { LuStickyNote, LuXCircle } from 'react-icons/lu';
import clsx from 'clsx';
import useDebounce from '../hooks/useDebounce';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleExpandCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <h1 className="text-2xl font-bold">Where is my note?</h1>
      <div className="border-gray-300 rounded-lg min-w-full md:min-w-[650px] lg:min-w-[1024px]">
        <div className="flex items-center">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <ClearButton searchQuery={searchQuery} handleClear={handleClear} />
          <ExpandCollapseButton handleExpandCollapse={handleExpandCollapse} />
        </div>
        <NoteFormContainer isExpanded={isExpanded} />
      </div>

      <NoteList searchQuery={debouncedSearchQuery} />
    </>
  );
};

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

const ClearButton = ({
  searchQuery,
  handleClear,
}: {
  searchQuery: string;
  handleClear: () => void;
}) =>
  searchQuery && (
    <button
      onClick={handleClear}
      className="p-2 bg-white hover:bg-gray-300 border border-l-0 rounded-r-lg border-gray-300"
    >
      <LuXCircle size={24} />
    </button>
  );

const ExpandCollapseButton = ({
  handleExpandCollapse,
}: {
  handleExpandCollapse: () => void;
}) => (
  <button
    onClick={handleExpandCollapse}
    className="ml-2 bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600"
  >
    <LuStickyNote color="white" size={24} />
  </button>
);

const NoteFormContainer = ({ isExpanded }: { isExpanded: boolean }) =>
  isExpanded && (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <NoteForm />
    </div>
  );

export default Home;
