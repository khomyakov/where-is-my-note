export type RefetchOptions = {
  staleTime: number;
  refetchOnWindowFocus: boolean;
  refetchOnReconnect: boolean;
  refetchInterval: number;
};

export const refetchOptions: RefetchOptions = {
  staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  refetchOnWindowFocus: false, // Do not refetch on window focus
  refetchOnReconnect: false, // Do not refetch on reconnect
  refetchInterval: 0, // Do not refetch at intervals
};
