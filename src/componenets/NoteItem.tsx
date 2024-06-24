import { Link } from 'react-router-dom';
import { Note } from '../types/note';
import { useDeleteNote } from '../hooks/useDeleteNote';

const NoteItem = ({ note }: { note: Note }) => {
  const deleteNote = useDeleteNote();

  const handleDelete = () => {
    deleteNote.mutate(note.id);
  };

  return (
    <div className="p-4 border-b flex justify-between items-center hover:bg-gray-100 transition duration-200">
      <Link to={`/notes/${note.id}`} className="flex-1 no-underline">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{note.title}</h2>
          <p className="text-sm text-gray-500">{note.content}</p>
        </div>
      </Link>
      <button
        onClick={handleDelete}
        className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default NoteItem;