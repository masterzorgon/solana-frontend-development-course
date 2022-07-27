import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets'
import * as web3 from '@solana/web3.js';
require('@solana/wallet-adapter-react-ui/styles.css');

const WalletContextProvider = ({ children }) => {

    const endpoint = web3.clusterApiUrl('devnet');
    const wallets = [
        new walletAdapterWallets.PhantomWalletAdapter()
    ];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;