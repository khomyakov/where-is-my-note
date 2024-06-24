import { Link } from 'react-router-dom';
import { Note } from '../types/note';
import { useDeleteNote } from '../hooks/useDeleteNote';

const NoteItem = ({ note }: { note: Note }) => {
  const deleteNote = useDeleteNote();

  const handleDelete = () => {
    deleteNote.mutate(note.id);
  };

  return (
    <div className="p-4 border-b flex justify-between items-center">
      <Link to={`/notes/${note.id}`} className="flex-1">
        <div>
          <h2 className="text-xl font-bold">{note.title}</h2>
          <p>{note.content}</p>
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