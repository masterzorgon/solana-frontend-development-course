import * as React from "react";
import * as web3 from "@solana/web3.js";
import * as token from '@solana/spl-token';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { toast } from "react-toastify";
import { ExternalLinkIcon } from '@heroicons/react/outline';

const Finished = () => {
    // Token Mint
    const [mintTx, setMintTx] = React.useState<string>("");
    const [mintAddr, setMintAddr] = React.useState<web3.PublicKey | undefined>(undefined);

    // Token Account
    const [accTx, setAccTx] = React.useState<string>("");
    const [accAddr, setAccAddr] = React.useState<web3.PublicKey | undefined>(undefined);

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    // error handling; is wallet connected?
    const connectionErr = () => {
        if (!publicKey || !connection) {
            toast.error("Please connect your wallet");
            return true;
        } else { return false; }
    };

    // create transaction to create a token mint on the blockchain
    const createMint = async (event: { preventDefault: () => void; }) => {
        // prevents page from refreshing
        event.preventDefault();

        // checks if wallet is connected
        if (connectionErr()) { return; }

        try {
            // Token Mints are accounts which hold data ABOUT a specific token.
            // Token Mints DO NOT hold tokens themselves.
            const tokenMint = web3.Keypair.generate();
            // amount of SOL required for the account to not be deallocated
            const lamports = await token.getMinimumBalanceForRentExemptMint(connection);
            // `token.createMint` function creates a transaction with the following two instruction: `createAccount` and `createInitializeMintInstruction`.
            const transaction = new web3.Transaction().add(
                // creates a new account
                web3.SystemProgram.createAccount({
                    fromPubkey: publicKey!,
                    newAccountPubkey: tokenMint.publicKey,
                    space: token.MINT_SIZE,
                    lamports,
                    programId: token.TOKEN_PROGRAM_ID
                }),
                // initializes the new account as a Token Mint account
                token.createInitializeMintInstruction(
                    tokenMint.publicKey,
                    0,
                    publicKey!,
                    token.TOKEN_PROGRAM_ID
                )
            );

            // prompts the user to sign the transaction and submit it to the network
            const signature = await sendTransaction(transaction, connection, { signers: [tokenMint] });
            setMintTx(signature);
            setMintAddr(tokenMint.publicKey);
        } catch (err) {
            toast.error('Error creating Token Mint');
            console.log('error', err);
        }
    };

    // create transaction to create a token account fo the mint we created on the blockchain
    const createAccount = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (connectionErr()) { return; }

        try {
            // Token Accounts are accounts which hold tokens of a given mint.
            const tokenAccount = web3.Keypair.generate();
            const space = token.ACCOUNT_SIZE;
            // amount of SOL required for the account to not be deallocated
            const lamports = await connection.getMinimumBalanceForRentExemption(space);
            const programId = token.TOKEN_PROGRAM_ID;

            const transaction = new web3.Transaction().add(
                // creates a new account
                web3.SystemProgram.createAccount({
                    fromPubkey: publicKey!,
                    newAccountPubkey: tokenAccount.publicKey,
                    space,
                    lamports,
                    programId
                }),
                // initializes the new account as a Token Account account
                token.createInitializeAccountInstruction(
                    tokenAccount.publicKey, // account to initialize
                    mintAddr!, // token mint address
                    publicKey!, // owner of new account
                    token.TOKEN_PROGRAM_ID // spl token program account
                )   
            );

            // prompts the user to sign the transaction and submit it to the network
            const signature = await sendTransaction(transaction, connection, { signers: [tokenAccount] });
            setAccTx(signature);
            setAccAddr(tokenAccount.publicKey);
        } catch (err) {
            toast.error("Error creating Token Account");
            console.log('error', err);
        }
    };

    const createAccountOutputs = [
        {
            title: "Token Account Address...",
            dependency: accAddr!,
            href: `https://explorer.solana.com/address/${accAddr}?cluster=devnet`,
        },
        {
            title: "Transaction Signature...",
            dependency: accTx,
            href: `https://explorer.solana.com/tx/${accTx}?cluster=devnet`,
        }
    ];

    const createMintOutputs = [
        {
            title: 'Token Mint Address...',
            dependency: mintAddr!,
            href: `https://explorer.solana.com/address/${mintAddr}?cluster=devnet`,
        },
        {
            title: 'Transaction Signature...',
            dependency: mintTx,
            href: `https://explorer.solana.com/tx/${mintTx}?cluster=devnet`,
        }
    ];

    return (
        <main className="max-w-7xl grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 text-white">
            <form onSubmit={event => createMint(event)} className='rounded-lg min-h-content bg-[#2a302f] p-4 sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg sm:text-2xl font-semibold'>
                        Create Mint 🦄
                    </h2>
                    <button
                        type='submit'
                        className='bg-helius-orange rounded-lg py-1 sm:py-2 px-4 font-semibold transition-all duration-200 border-2 border-transparent hover:border-helius-orange disabled:opacity-50 disabled:hover:bg-helius-orange hover:bg-transparent disabled:cursor-not-allowed'
                    >
                        Submit
                    </button>
                </div>
                <div className='text-sm font-semibold mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                    <ul className='p-2'>
                        {createMintOutputs.map(({ title, dependency, href }, index) => (
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

            <form onSubmit={event => createAccount(event)} className='rounded-lg min-h-content bg-[#2a302f] p-4 sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg sm:text-2xl font-semibold'>
                        Create Account ✨
                    </h2>
                    <button
                        type='submit'
                        className='bg-helius-orange rounded-lg py-1 sm:py-2 px-4 font-semibold transition-all duration-200 border-2 border-transparent hover:border-helius-orange disabled:opacity-50 disabled:hover:bg-helius-orange hover:bg-transparent disabled:cursor-not-allowed'
                    >
                        Submit
                    </button>
                </div>
                <div className='text-sm font-semibold mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                    <ul className='p-2'>
                        {createAccountOutputs.map(({ title, dependency, href }, index) => (
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
