import { LuStickyNote } from 'react-icons/lu';

const ExpandCollapseButton = ({
  onExpandCollapse,
}: {
  onExpandCollapse: () => void;
}) => (
  <button
    onClick={onExpandCollapse}
    className="ml-2 bg-blue-500 p-2 text-white rounded-full hover:bg-blue-600"
  >
    <LuStickyNote color="white" size={24} />
  </button>
);

export default ExpandCollapseButton;
