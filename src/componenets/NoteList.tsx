import { Virtuoso } from 'react-virtuoso';
import { useNotes } from '../hooks/useNotes';
import NoteItem from './NoteItem';
import { Note } from '../types/note';

const NoteList = ({searchQuery}:{searchQuery: string}) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useNotes(5); // Load 5 notes per request

  if (isLoading) return <div>Loading...</div>;

  const notes: Note[] = data?.pages.flat() || [];
  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-w-full md:min-w-[650px] lg:min-w-[1024px] border border-gray-300 rounded-lg bg-white">
        <h1 className="p-4 text-lg font-semibold border-b border-gray-300">Notes</h1>
    <Virtuoso
      data={filteredNotes}
      endReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      itemContent={(index, note: Note) => (
        <div key={note.id}>
          <NoteItem note={note} />
        </div>
      )}
      style={{ height: '80vh' }}
    />
    </div>

  );
};

export default NoteList;