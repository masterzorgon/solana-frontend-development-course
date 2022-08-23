import * as React from 'react';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import RenderedComponent from "../../components/RenderedComponent";
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
            setTxSig(signature);
        } catch (error) {
            toast.error('Error funding wallet');
            throw error;
        }
    };

    const outputs = [
        {
            title: 'Transaction Signature...',
            dependency: txSig,
            href: `https://explorer.solana.com/tx/${txSig}?cluster=devnet`,
        }
    ];

    return (
        <main className='max-w-7xl grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 text-white'>
            <RenderedComponent
                title="Faucet 🚰"
                buttonText="Fund"
    
                outputs={outputs}
                validation={null}
                method={fundWallet}
            />
        </main>
    );
};

export default Finished;