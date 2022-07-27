import * as web3 from '@solana/web3.js';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
require('@solana/wallet-adapter-react-ui/styles.css');

const Finished = () => {

    const endpoint = web3.clusterApiUrl('devnet');
    const wallets = [
        new walletAdapterWallets.PhantomWalletAdapter()
    ];

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
                <WalletModalProvider>
                    <main className='min-h-screen text-white'>
                        <div className='flex flex-col items-center py-20'>
                            <h1 className='mb-10 text-3xl font-semibold italic text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-blue-300 to-purple-300'>
                                Solana Wallet Adapter
                            </h1>
                            <WalletMultiButton
                                className='!bg-[#9e80ff] !rounded-xl hover:!bg-[#2a302f] transition-all duration-200'
                            />
                        </div>
                    </main>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    )
};

export default Finished;