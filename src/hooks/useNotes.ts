import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchNotes } from '../api/api';

export const useNotes = (limit: number) => {
    return useInfiniteQuery({
      queryKey: ['notes', limit],
      queryFn: ({ pageParam = 1 }) => fetchNotes(pageParam, limit),
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length === limit ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
      staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
      refetchOnWindowFocus: false, // Do not refetch on window focus
      refetchOnReconnect: false, // Do not refetch on reconnect
      refetchInterval: false, // Do not refetch at intervals
    });
  };