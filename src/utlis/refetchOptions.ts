export const refetchOptions = {
  staleTime: 5 * 60 * 1000, // Data is fresh for 5 minutes
  refetchOnWindowFocus: false, // Do not refetch on window focus
  refetchOnReconnect: false, // Do not refetch on reconnect
  refetchInterval: false, // Do not refetch at intervals
};
