import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { useState } from 'react';
import useDebounce from '../hooks/useDebounce';
import SearchBar from '../components/Home/SearchBar';

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
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClear={handleClear}
          onExpandCollapse={handleExpandCollapse}
        />
        <NoteFormContainer
          isExpanded={isExpanded}
          onExpandCollapse={handleExpandCollapse}
        />
      </div>

      <NoteList searchQuery={debouncedSearchQuery} />
    </>
  );
};

const NoteFormContainer = ({
  isExpanded,
  onExpandCollapse,
}: {
  isExpanded: boolean;
  onExpandCollapse: () => void;
}) =>
  isExpanded && (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <NoteForm onAddNote={onExpandCollapse} />
    </div>
  );

export default Home;
