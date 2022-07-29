import * as React from 'react';
import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { toast } from 'react-toastify';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const CreateMintFrom: React.FC = () => {

    const [txSig, setTxSig] = React.useState<string>('');
    const [mint, setMint] = React.useState<string>('');

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const createMint = async (event: { preventDefault: () => void; }) => {
        // prevents page from refreshing
        event.preventDefault();

        // checks if wallet is connected
        if (!publicKey || !connection) {
            toast.error('Please connect your wallet.');
            return;
        }

        // Token Mints are accounts which hold data ABOUT a specific token.
        // Token Mints DO NOT hold tokens themselves.
        const tokenMint = web3.Keypair.generate();
        // amount of SOL required for the account to not be deallocated
        const lamports = await token.getMinimumBalanceForRentExemptMint(connection);
        // `token.createMint` function creates a transaction with the following two instruction: `createAccount` and `createInitializeMintInstruction`.
        const transaction = new web3.Transaction().add(
            // creates a new account
            web3.SystemProgram.createAccount({
                fromPubkey: publicKey,
                newAccountPubkey: tokenMint.publicKey,
                space: token.MINT_SIZE,
                lamports,
                programId: token.TOKEN_PROGRAM_ID
            }),
            // initializes the new account is a Token Mint account
            token.createInitializeMintInstruction(
                tokenMint.publicKey,
                0,
                publicKey,
                publicKey,
                token.TOKEN_PROGRAM_ID
            )
        );

        // prompts the user to sign the transaction and submit it to the network
        sendTransaction(transaction, connection, { signers: [tokenMint] })
            .then(sig => {
                setTxSig(sig);
                setMint(tokenMint.publicKey.toString());
            })
            .catch(err => {
                toast.error(err.message);
                console.log('error', err);
            });
    };

    const parameters = [
        {
            title: 'Token Mint Address...',
            dependency: mint,
            href: `https://explorer.solana.com/address/${mint}?cluster=devnet`,
        },
        {
            title: 'Transaction Signature...',
            dependency: txSig,
            href: `https://explorer.solana.com/tx/${txSig}?cluster=devnet`,
        }
    ];

    return (
        <form onSubmit={event => createMint(event)} className='rounded-lg min-h-content p-4 bg-[#2a302f] sm:col-span-6 lg:col-start-2 lg:col-end-6'>
            <div className='flex justify-between items-center'>
                <h2 className='text-lg sm:text-2xl font-semibold'>
                    Create a Token Mint Account 🦄
                </h2>
                <button
                    type='submit'
                    className='bg-[#fa6ece] rounded-lg py-1 sm:py-2 px-4 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-[#fa6ece]'
                >
                    Create Mint
                </button>
            </div>
            <div className='text-sm font-semibold mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                <ul className='p-2'>
                    {parameters.map(({ title, dependency, href }, index) => (
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
                                    {dependency.slice(0, 25)}...
                                    <ExternalLinkIcon className='w-5 ml-1' />
                                </a>
                            }
                        </li>
                    ))}
                </ul>
            </div>
        </form>
    );
};

export default CreateMintFrom;