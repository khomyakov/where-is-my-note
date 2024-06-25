import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { refetchOptions } from './utils/refetchOptions';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      ...refetchOptions,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <div className="flex flex-col items-center bg-gray-200 min-h-screen p-4 space-y-4">
        <AppRouter />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
