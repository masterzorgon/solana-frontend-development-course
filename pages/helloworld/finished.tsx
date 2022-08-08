import React from 'react';
import * as web3 from '@solana/web3.js';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import RenderedComponent from '../../components/RenderedComponent';

const Finished = () => {

    // id of the rust program you deployed to the devnet
    const programId = new web3.PublicKey("82Xbj9BUXPkbCsRZnQoJbRtsrqKVYDiRHe2tW2pZ5Xmv");

    // user information provided by their browser wallet
    const { publicKey, sendTransaction } = useWallet();
    const { connection } = useConnection();

    // state to hold tx signature
    const [txSig, setTxSig] = React.useState<string>("");

    // function to create and send a transaction to the network
    const executeTx = (event: { preventDefault: () => void }) => {
        event.preventDefault();

        // if wallet is not connected, return
        if (!publicKey || !connection) {
            toast.error("Please connect your wallet");
            throw 'Please connect your wallet';
        }

        // create a new transaction
        const transaction = new web3.Transaction();
        // create the instruction for the rust program to process
        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    pubkey: publicKey!,
                    isSigner: true,
                    isWritable: true
                },
            ],
            programId,
        });

        // add the instruction to the transaction
        transaction.add(instruction);

        // send the transaction to the network
        sendTransaction(transaction, connection)
            .then(sig => setTxSig(sig))
            .catch(err => {
                toast.error("Transaction failed");
                console.log(err);
                throw 'Transaction failed';
            });
    };

    const outputs = [
        {
            title: "Transaction Signature...",
            dependency: txSig,
            href: `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
        }
    ];

    return (
        <main className="max-w-7xl grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 text-white">
            <RenderedComponent
                title="Hello, Solana 👋"
                buttonText="Execute"
    
                validation={null}
                method={executeTx}
                outputs={outputs}
            />
        </main>
    )
};

export default Finished;
