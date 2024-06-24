import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useNotes } from '../hooks/useNotes';
import NoteItem from './NoteItem';
import { Note } from '../types/note';

const NoteList = () => {
  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useNotes(5); // Load 5 notes per request

  if (isLoading) return <div>Loading...</div>;

  const notes: Note[] = data?.pages.flat() || [];

  console.log(notes)

  return (
    <Virtuoso
      data={notes}
      endReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      itemContent={(index, note) => {
        console.log("Here!");
        console.log(note)
            return (
            <div key={note.id}>
            <NoteItem note={note} />
            </div>
        )}
        }
        style={{ height: '80vh' }}
    />
  );
};

export default NoteList;