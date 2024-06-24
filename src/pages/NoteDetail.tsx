import { Link, useParams } from 'react-router-dom';
import { useNote } from '../hooks/useNote';
import NoteForm from '../componenets/NoteForm';

const NoteDetail = () => {
  const { id } = useParams();
  const { data: note, isLoading } = useNote(Number(id));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="min-w-full md:min-w-[650px] lg:min-w-[1024px] space-y-5">
          <Link to={"/"} className="bg-green-600 hover:bg-green-700 p-2 pl-10 pr-10 text-white rounded-full">
        Go Back
    </Link>
      <NoteForm note={note} />
    </div>
  );
};

export default NoteDetail;
