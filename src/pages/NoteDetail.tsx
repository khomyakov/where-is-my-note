import React from 'react';
import { useParams } from 'react-router-dom';
import { useNote } from '../hooks/useNote';
import NoteForm from '../componenets/NoteForm';

const NoteDetail = () => {
  const { id } = useParams();
  const { data: note, isLoading } = useNote(id);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold">{note.title}</h1>
      <p>{note.content}</p>
      <NoteForm note={note} />
    </div>
  );
};

export default NoteDetail;