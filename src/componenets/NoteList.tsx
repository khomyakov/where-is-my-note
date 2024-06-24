import { Virtuoso } from 'react-virtuoso';
import { useNotes } from '../hooks/useNotes';
import NoteItem from './NoteItem';
import { Note } from '../types/note';
import { sortBy } from 'lodash';
import { useState } from 'react';
import {
  LiaSortSolid,
  LiaSortNumericDownSolid,
  LiaSortAlphaDownSolid,
  LiaSortNumericUpSolid,
} from 'react-icons/lia';
import { ErrorBoundary } from 'react-error-boundary';

const NoteList = ({ searchQuery }: { searchQuery: string }) => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useNotes(5); // Load 5 notes per request

  const [criteria, setCriteria] = useState<
    'id' | 'dateAsc' | 'dateDesc' | 'title'
  >('id');

  const handleSort = (criteria: 'id' | 'dateAsc' | 'dateDesc' | 'title') => {
    setCriteria(criteria);
  };

  if (isLoading) return <div>Loading...</div>;

  const notes: Note[] = data?.pages.flat() || [];
  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  let sortedNotes = filteredNotes;

  switch (criteria) {
    case 'dateAsc':
      sortedNotes = sortBy(filteredNotes, (note: Note) =>
        new Date(note.timestamp).getTime(),
      );
      break;
    case 'dateDesc':
      sortedNotes = sortBy(
        filteredNotes,
        (note: Note) => -new Date(note.timestamp).getTime(),
      );
      break;
    case 'title':
      sortedNotes = sortBy(filteredNotes, 'title');
      break;
    case 'id':
    default:
      sortedNotes = sortBy(filteredNotes, 'id');
      break;
  }

  return (
    <div className="min-w-full md:min-w-[650px] lg:min-w-[1024px] border border-gray-300 rounded-lg bg-white">
      <div className="flex justify-between border-b border-gray-300">
        <h1 className="p-4 text-lg font-semibold">Notes</h1>
        <SortingButtons handleSort={handleSort} />
      </div>
      <Virtuoso
        data={sortedNotes}
        endReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        itemContent={(index, note: Note) => (
          <div key={note.id}>
            <ErrorBoundary fallback={<div>Error rendering {index} item</div>}>
              <NoteItem note={note} />
            </ErrorBoundary>
          </div>
        )}
        style={{ height: '80vh' }}
      />
    </div>
  );
};

const SortingButtons = ({
  handleSort,
}: {
  handleSort: (criteria: 'id' | 'dateAsc' | 'dateDesc' | 'title') => void;
}) => (
  <div className="flex justify-end mb-4 mt-4 mr-4 ">
    <button
      onClick={() => handleSort('id')}
      className="p-2 hover:bg-gray-300 border border-gray-300 rounded-l-lg"
    >
      <LiaSortSolid />
    </button>
    <button
      onClick={() => handleSort('dateAsc')}
      className="p-2 hover:bg-gray-300 border border-gray-300"
    >
      <LiaSortNumericUpSolid />
    </button>
    <button
      onClick={() => handleSort('dateDesc')}
      className="p-2 hover:bg-gray-300 border border-gray-300"
    >
      <LiaSortNumericDownSolid />
    </button>
    <button
      onClick={() => handleSort('title')}
      className="p-2 hover:bg-gray-300 border border-gray-300 rounded-r-lg"
    >
      <LiaSortAlphaDownSolid />
    </button>
  </div>
);

export default NoteList;
