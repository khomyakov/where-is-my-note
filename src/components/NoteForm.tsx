import { useForm } from 'react-hook-form';
import { Note } from '../types/note';
import { useCreateNote } from '../hooks/useCreateNote';
import { useUpdateNote } from '../hooks/useUpdateNote';
import dayjs from 'dayjs';

type NoteFormInputs = {
  title: string;
  content: string;
};

interface NoteFormProps {
  note?: Note;
  onAddNote?: () => void;
}

const NoteForm = ({ note, onAddNote }: NoteFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NoteFormInputs>({
    defaultValues: note || { title: '', content: '' },
  });

  const { mutate: createNote } = useCreateNote(onAddNote);
  const { mutate: updateNote } = useUpdateNote(note?.id ?? 0);

  const onSubmit = (data: NoteFormInputs) => {
    if (note) {
      updateNote(data);
    } else {
      createNote(data);
    }
  };

  const lastEdited = note?.timestamp
    ? dayjs(note?.timestamp).format('DD/MM/YYYY HH:mm')
    : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full bg-white/10">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Title"
          {...register('title', { required: 'Title is required' })}
          className="w-full font-bold p-2 border-b border-gray-300 rounded-t-lg rounded-b-lg placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </div>
      <div className="mb-4">
        <textarea
          placeholder="Content"
          {...register('content', { required: 'Content is required' })}
          className="w-full p-2 border-b border-gray-300 rounded-t-lg rounded-b-lg placeholder-gray-500 focus:outline-none focus:border-blue-500"
          rows={4}
        />
        {errors.content && (
          <span className="text-red-500">{errors.content.message}</span>
        )}
      </div>
      <div className="flex justify-between">
        {note ? (
          <span className="p-2 font-thin text-gray text-sm">
            Edited at: {lastEdited}
          </span>
        ) : (
          <span></span>
        )}
        <button
          type="submit"
          className="bg-blue-500 p-2 pl-10 pr-10 text-white rounded-full hover:bg-blue-600 transition duration-200"
        >
          {note ? 'Update Note' : 'Add Note'}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;
