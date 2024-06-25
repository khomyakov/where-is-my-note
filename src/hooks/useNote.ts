import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../api/api';
import { refetchOptions } from '../utils/refetchOptions';

export const useNote = (id: number) => {
  return useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    ...refetchOptions,
  });
};
