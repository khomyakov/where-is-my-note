import { useQuery} from '@tanstack/react-query';
import { fetchNoteById } from '../api/api';

export const useNote = (id: string) => {
    return useQuery({
      queryKey: ['note', id],
      queryFn: () => fetchNoteById(id),
    });
  };
  