import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNotes } from '../api/api';
import { refetchOptions } from '../utils/refetchOptions';

export const useNotes = (limit: number) => {
  return useInfiniteQuery({
    queryKey: ['notes'],
    queryFn: ({ pageParam = 1 }) => fetchNotes(pageParam, limit),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === limit ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    ...refetchOptions,
  });
};
