import { Provider } from 'jotai';
import { SwapSection } from '@/sections';

export const Home = () => {
  return (
    <Provider>
      <SwapSection />
    </Provider>
  );
};
