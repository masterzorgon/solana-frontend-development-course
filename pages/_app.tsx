import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../components/Navbar';

import WalletContextProvider from '../contexts/WalletContextProvider';
import TransitionContextProvider from '../contexts/TransitionContextProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WalletContextProvider>
        <Navbar />
        <ToastContainer />
        <TransitionContextProvider>
          <Component {...pageProps} />
        </TransitionContextProvider>
      </WalletContextProvider>
    </>
  );
}

export default MyApp
