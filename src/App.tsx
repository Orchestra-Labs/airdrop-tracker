import '@interchain-ui/react/styles';

import { wallets } from '@cosmos-kit/keplr';
import { ChainProvider } from '@cosmos-kit/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { assets, chains } from 'chain-registry/testnet';
import { SignerOptions } from 'cosmos-kit';
import { AminoTypes } from '@cosmjs/stargate';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Loader, ScrollToTop } from '@/components';
import { defaultChainName } from '@/constants';

import { AppRouter } from './app/Router';

// React Query config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Basic fallback signer config (removes SymphonyJS)
const signerOptions: SignerOptions = {
  signingStargate: () => ({
    aminoTypes: new AminoTypes({}), // default config
  }),
  preferredSignType: () => 'direct',
};

export default function App() {
  return (
    <ChainProvider
      chains={chains.filter(c => c.chain_name === defaultChainName)}
      assetLists={assets}
      wallets={wallets}
      signerOptions={signerOptions}
    >
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <div className="w-screen h-screen">
              <Loader />
            </div>
          }
        >
          <BrowserRouter>
            <ScrollToTop />
            <AppRouter />
          </BrowserRouter>
        </Suspense>
      </QueryClientProvider>
    </ChainProvider>
  );
}
