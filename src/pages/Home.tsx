import NoteForm from '../componenets/NoteForm';
import NoteList from '../componenets/NoteList';
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
          {searchQuery && (
            <button
              onClick={handleClear}
              className="p-2 hover:bg-gray-300 border border-l-0 rounded-r-lg border-gray-300"
            >
              <LuXCircle size={24} />
            </button>
          )}
          <button
            onClick={handleExpandCollapse}
            className="ml-2 p-2 bg-blue-800 hover:bg-blue-950 border border-gray-300 rounded-lg"
          >
            <LuStickyNote color="white" size={24} />
          </button>
        </div>
        {isExpanded && (
          <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
            <NoteForm />
          </div>
        )}
      </div>

      <NoteList searchQuery={debouncedSearchQuery} />
    </>
  );
};

export default Home;
