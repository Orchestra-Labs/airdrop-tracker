import { useEffect } from 'react';
import { useChain } from '@cosmos-kit/react';
import { Provider } from 'jotai';

import { defaultChainName } from '@/constants';
import { AirdropInfoContainer } from '@/components/AirdropInfoContainer';

export const Home = () => {
  const { isWalletConnected } = useChain(defaultChainName);

  useEffect(() => {
    if (isWalletConnected) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 0);
    }
  }, [isWalletConnected]);

  return (
    <Provider>
      <div className="min-h-screen flex items-center justify-center px-4">
        <AirdropInfoContainer />
      </div>
    </Provider>
  );
};
