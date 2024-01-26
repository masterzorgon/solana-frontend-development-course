import React from "react";
import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { toast } from "react-toastify";
import { ExternalLinkIcon } from '@heroicons/react/outline';

const Starter = () => {
    // react state variables
    const [mintTx, setMintTx] = React.useState<string>("");
    const [mintAddr, setMintAddr] = React.useState<web3.PublicKey | undefined>(undefined);
    const [accTx, setAccTx] = React.useState<string>("");
    const [accAddr, setAccAddr] = React.useState<web3.PublicKey | undefined>(undefined);

    // wallet variables 
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    // check if users's wallet is connected to app
    const checkIfWalletNotConnected = () => {
        if (!publicKey || !connection) {
            toast.error("Please connect your wallet");
            return true;
        } else { return false; }
    };

    // create token mint
    const createMint = async (event: { preventDefault: () => void; }) => {
        // prevent app from reloading
        event.preventDefault();

        // check if wallet is connected
        if (checkIfWalletNotConnected()) { throw "Please connect your wallet!"; }

        const tokenMint = web3.Keypair.generate();

        const lamports = await token.getMinimumBalanceForRentExemptMint(connection);

        const transaction = new web3.Transaction().add(
            web3.SystemProgram.createAccount({
                fromPubkey: publicKey!,
                newAccountPubkey: tokenMint.publicKey,
                space: token.MINT_SIZE,
                lamports,
                programId: token.TOKEN_PROGRAM_ID
            }),
            token.createInitializeMintInstruction(
                tokenMint.publicKey,
                0,
                publicKey!,
                token.TOKEN_PROGRAM_ID,
            )
        );

        // the code we want to perform
        try {
            const signature = await sendTransaction(transaction, connection, { signers: [tokenMint] })
            setMintTx(signature);
            setMintAddr(tokenMint.publicKey);
        } catch (error) {
            toast.error("Transaction failed!");
            console.log("error", error);
        }
    };

    // create tokens on the blockchain
    const createAccount = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (checkIfWalletNotConnected()) { throw "Please connect wallet!"; }

        const tokenAccount = web3.Keypair.generate();
        const space = token.ACCOUNT_SIZE;
        const lamports = await connection.getMinimumBalanceForRentExemption(space);
        const programId = token.TOKEN_PROGRAM_ID;

        const transaction = new web3.Transaction().add(
            web3.SystemProgram.createAccount({
                fromPubkey: publicKey!,
                newAccountPubkey: tokenAccount.publicKey,
                space,
                lamports,
                programId,
            }),
            token.createInitializeAccountInstruction(
                tokenAccount.publicKey,
                mintAddr!,
                publicKey!,
                token.TOKEN_PROGRAM_ID,
            ),
        );

        try {
            const signature = await sendTransaction(transaction, connection, { signers: [tokenAccount ] });
            setAccTx(signature);
            setAccAddr(tokenAccount.publicKey);
        } catch (error) {
            toast.error("Transaction failed!");
            console.log("Error", error);
        }
    };

    const createMintOutputs = [
        {
            title: "TokenMint Address...",
            dependency: mintAddr!,
            href: `https://explorer.solana.com/address/${mintAddr}?cluster=devnet`,
        },
        {
            title: "Transaction Signature...",
            dependency: mintTx,
            href: `https://explorer.solana.com/tx/${mintTx}?cluster=devnet`,
        }
    ];

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

    return (
        <main className="max-w-7xl grid grid-cols-1 sm:grid-cols-6 gap-6 p-4 text-white">
            {/* TGOKEN MINT */}
            <form
                className="rounded-lg min-h-content bg-[#2a302f] p-4 sm:col-span-6 lg:col-start-2 lg:col-end-6"
                onSubmit={event => createMint(event)}
            >
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg sm:text-2xl font-semibold">
                        Create Mint Account
                    </h2>
                    <button 
                        type="submit"
                        className='bg-helius-orange rounded-lg py-1 sm:py-2 px-4 font-semibold transition-all duration-200 border-2 border-transparent hover:border-helius-orange disabled:opacity-50 disabled:hover:bg-helius-orange hover:bg-transparent disabled:cursor-not-allowed'
                    >
                        Submit
                    </button>
                </div>

                {/* VALUES TO DISPLAY */}
                <div className="text-sm font-semibold mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2">
                    <ul className="p-2">
                        {createMintOutputs.map(({ title, dependency, href }, index) => (
                            <li
                                key={title}
                                className={`flex justify-between items-center ${index !== 0 && "mt-4"}`}
                            >
                                <p className="tracking-wider">{title}</p>
                                {
                                   dependency &&
                                   <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex text-[#80ebff] italic hover:text-white transition-all duration-200"
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

            {/* TOKEN ACCOUNT */}
            <form
                className="rounded-lg min-h-content bg-[#2a302f] p-4 sm:col-span-6 lg:col-start-2 lg:col-end-6"
                onSubmit={event => createAccount(event)}
            >
                {/* HEADER */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg sm:text-2xl font-semibold">Create Account</h2>
                    <button 
                        type="submit"
                        className='bg-helius-orange rounded-lg py-1 sm:py-2 px-4 font-semibold transition-all duration-200 border-2 border-transparent hover:border-helius-orange disabled:opacity-50 disabled:hover:bg-helius-orange hover:bg-transparent disabled:cursor-not-allowed'
                    >
                        Submit
                    </button>
                </div>

                {/* VALUES TO DISPLAY */}
                <div className="text-sm font-semibold mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2">
                    <ul className="p-2">
                        {createAccountOutputs.map(({ title, dependency, href }, index) => (
                            <li
                                key={title}
                                className={`flex justify-between items-center ${index !== 0 && 'mt-4'}`}
                            >
                                <p className="tracking-wider">{title}</p>
                                {
                                    dependency &&
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex text-[#80ebff] italic hover:text-white transition-all duration-200"
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
}

export default Starter;