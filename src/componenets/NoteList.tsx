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

  return (
    <Virtuoso
      data={notes}
      endReached={() => {
        if (hasNextPage) {
          fetchNextPage();
        }
      }}
      itemContent={(index, note) => (
        <div key={note.id}>
          <NoteItem note={note} />
        </div>
      )}
    />
  );
};

export default NoteList;