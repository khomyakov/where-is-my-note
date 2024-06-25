import { Link } from 'react-router-dom';
import { Note } from '../types/note';
import { useDeleteNote } from '../hooks/useDeleteNote';
import { LuArrowRight, LuArrowUp, LuArrowDown, LuTrash } from 'react-icons/lu';
import { useState } from 'react';
import NoteForm from './NoteForm';

const NoteItem = ({ note }: { note: Note }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const deleteNote = useDeleteNote();

  const handleDelete = () => {
    deleteNote.mutate(note.id);
  };

  const handleExpandCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="p-4 border-b border-gray-200 bg-gray-50 hover:bg-gray-100 transition duration-200 relative">
      <div className="flex justify-between items-center">
        {isExpanded ? (
          <NoteForm note={note} />
        ) : (
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-gray-900">
              {note.title}
            </h2>
            <p className="text-sm text-gray-500">{note.content}</p>
          </div>
        )}

        <div className="flex space-x-2 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition duration-200 ml-4">
          <Link to={`/notes/${note.id}`} className="text-green-500">
            <LuArrowRight size={20} />
          </Link>
          <button onClick={handleExpandCollapse} className="text-green-500">
            {isExpanded ? <LuArrowUp size={20} /> : <LuArrowDown size={20} />}
          </button>
          <button onClick={handleDelete} className="text-red-500">
            <LuTrash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
