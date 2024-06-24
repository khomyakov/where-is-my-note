import { Link } from 'react-router-dom';
import { Note } from '../types/note';
import { useDeleteNote } from '../hooks/useDeleteNote';
import { FaArrowRight, FaArrowUp, FaArrowDown, FaTrash } from 'react-icons/fa';
import { useState } from 'react';

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
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900">{note.title}</h2>
          <p className="text-sm text-gray-500">{note.content}</p>
        </div>
        <div className="flex space-x-2 opacity-10 grayscale hover:opacity-100 hover:grayscale-0 transition duration-200">
          <Link to={`/notes/${note.id}`} className="text-green-500">
            <FaArrowRight size={20} />
          </Link>
          <button onClick={handleExpandCollapse} className="text-green-500">
            {isExpanded ? <FaArrowUp size={20} /> : <FaArrowDown size={20} />}
          </button>
          <button onClick={handleDelete} className="text-red-500">
            <FaTrash size={20} />
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="mt-4">
          <p className="text-gray-700">Expanded area placeholder content for {note.title}.</p>
        </div>
      )}
    </div>
  );
};

export default NoteItem;