// imports methods relevant to the react framework
import * as React from 'react';
// throws notifications for user friendly error handling
import { toast } from 'react-toastify';
// imports methods for deriving data from the wallet's data store
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
// imports icons
import { ExternalLinkIcon } from '@heroicons/react/outline';
// library we use to interact with the solana json rpc api
import * as web3 from '@solana/web3.js';

const Finished = () => {
    // allocate state to hold transaction signature
    const [txSig, setTxSig] = React.useState<string>('');

    // get user info from wallet provider
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    // function to send sol 
    const fundWallet = async (event: { preventDefault: () => void }) => {
        // prevent page from refreshing when this function runs
        event.preventDefault();

        // if user is not connected, throw an error
        if (!publicKey || !connection) {
            toast.error('Please connect your wallet');
            throw 'Please connect your wallet';
        }

        // generate a new keypair 
        const sender = web3.Keypair.generate();

        // check the balance of the keypair and send funds if needed
        const balance = await connection.getBalance(sender.publicKey);
        if (balance < web3.LAMPORTS_PER_SOL) {
            await connection.requestAirdrop(sender.publicKey, web3.LAMPORTS_PER_SOL * 1);
        }

        // create a new transaction and add the instruction to transfer tokens
        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: sender.publicKey,
                toPubkey: publicKey,
                lamports: web3.LAMPORTS_PER_SOL * 1
            }),
        );

        // send the transaction to the network
        try {
            const signature = await sendTransaction(transaction, connection, {
                signers: [sender]
            });
            setTxSig(signature); // if tx lands, set state w/ tx signature
        } catch (error) {
            toast.error('Error funding wallet'); // if tx fails, throw error notification
            throw error;
        }
    };

    // format for outputs we want to render
    const outputs = [
        {
            title: 'Transaction Signature...',
            dependency: txSig,
            href: `https://explorer.solana.com/tx/${txSig}?cluster=devnet`,
        }
    ];

    return (
        <main className='max-w-7xl grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 text-white'>
            <form onSubmit={event => fundWallet(event)} className='rounded-lg min-h-content bg-[#2a302f] p-4 sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg sm:text-2xl font-semibold'>
                    Faucet 🚰
                    </h2>
                    <button
                        type='submit'
                        className='bg-helius-orange rounded-lg py-1 sm:py-2 px-4 font-semibold transition-all duration-200 border-2 border-transparent hover:border-helius-orange disabled:opacity-50 disabled:hover:bg-[#fa6ece] hover:bg-transparent disabled:cursor-not-allowed'
                    >
                        Fund
                    </button>
                </div>
                
                <div className='text-sm font-semibold mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                    <ul className='p-2'>
                        {outputs.map(({ title, dependency, href }, index) => (
                            <li key={title} className={`flex justify-between items-center ${index !== 0 && 'mt-4'}`}>
                                <p className='tracking-wider'>{title}</p>
                                {
                                    dependency &&
                                    <a
                                        href={href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex text-[#80ebff] italic hover:text-white transition-all duration-200'
                                    >
                                        {dependency.toString().slice(0, 25)}...
                                        <ExternalLinkIcon className='w-5 ml-1' />
                                    </a>
                                }
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </main>
    );
};

export default Finished;