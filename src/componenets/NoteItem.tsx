import React from 'react';
import { Link } from 'react-router-dom';
import { Note } from '../types/note';

const NoteItem = ({ note }: { note: Note }) => {
  return (
    <Link to={`/notes/${note.id}`}>
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">{note.title}</h2>
        <p>{note.content}</p>
      </div>
    </Link>
  );
};

export default NoteItem;