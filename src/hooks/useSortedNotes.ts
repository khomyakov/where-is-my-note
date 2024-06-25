import { useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import { Note } from '../types/note';
import { uniqBy } from 'lodash';

const useSortedNotes = (filteredNotes: Note[], criteria: string): Note[] => {
  return useMemo(() => {
    let sortedNotes = filteredNotes;

    switch (criteria) {
      case 'dateAsc':
        sortedNotes = sortBy(filteredNotes, (note: Note) =>
          new Date(note.timestamp).getTime(),
        );
        break;
      case 'dateDesc':
        sortedNotes = sortBy(
          filteredNotes,
          (note: Note) => -new Date(note.timestamp).getTime(),
        );
        break;
      case 'title':
        sortedNotes = sortBy(filteredNotes, 'title');
        break;
      case 'id':
      default:
        sortedNotes = sortBy(filteredNotes, 'id');
        break;
    }

    return uniqBy(sortedNotes, 'id');
  }, [filteredNotes, criteria]);
};

export default useSortedNotes;
