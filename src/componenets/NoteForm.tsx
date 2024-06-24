import { useForm } from 'react-hook-form';
import { Note } from '../types/note';
import { useCreateNote } from '../hooks/useCreateNote';
import { useUpdateNote } from '../hooks/useUpdateNote';

const NoteForm = ({ note }: { note?: Note }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: note || { title: '', content: '' },
  });

  const createNote = useCreateNote();
  const updateNote = useUpdateNote(note?.id ?? 0);

  const onSubmit = (data: { title: string; content: string }) => {
    if (note) {
      updateNote.mutate(data);
    } else {
      createNote.mutate(data);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        placeholder="Title"
        {...register('title')}
        className="w-full p-2 mb-2 border"
      />
      <textarea
        placeholder="Content"
        {...register('content')}
        className="w-full p-2 mb-2 border"
      />
      <button type="submit" className="p-2 bg-blue-500 text-white">
        {note ? 'Update Note' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;