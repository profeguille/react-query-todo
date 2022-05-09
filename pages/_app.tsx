import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import '../styles/globals.css';

const reactQueryClient = new QueryClient();
const MyApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={reactQueryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
