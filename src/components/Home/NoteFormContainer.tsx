import NoteForm from '../NoteForm';

const NoteFormContainer = ({
  isExpanded,
  onExpandCollapse,
}: {
  isExpanded: boolean;
  onExpandCollapse: () => void;
}) =>
  isExpanded && (
    <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
      <NoteForm onAddNote={onExpandCollapse} />
    </div>
  );

export default NoteFormContainer;
