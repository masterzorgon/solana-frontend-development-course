import '../styles/globals.css'
import type { AppProps } from 'next/app'
import WalletContextProvider from '../contexts/WalletContextProvider';
 import { ToastContainer } from 'react-toastify';
import Navbar from '../components/Navbar';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <WalletContextProvider>
        <Navbar />
        <ToastContainer />
        <Component {...pageProps} />
      </WalletContextProvider>
    </>
  );
}

export default MyApp
