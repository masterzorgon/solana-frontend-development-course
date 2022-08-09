import * as React from 'react';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import RenderedComponent from "../../components/RenderedComponent";
import * as web3 from '@solana/web3.js';

const Finished = () => {

    const [txSig, setTxSig] = React.useState<string>('');

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const fundWallet = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (!publicKey || !connection) {
            toast.error('Please connect your wallet');
            throw 'Please connect your wallet';
        }

        const sender = web3.Keypair.generate();

        const balance = await connection.getBalance(sender.publicKey);
        if (balance < web3.LAMPORTS_PER_SOL) {
            await connection.requestAirdrop(sender.publicKey, web3.LAMPORTS_PER_SOL * 1);
        }

        const transaction = new web3.Transaction().add(
            web3.SystemProgram.transfer({
                fromPubkey: sender.publicKey,
                toPubkey: publicKey,
                lamports: web3.LAMPORTS_PER_SOL * 1
            }),
        );

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
                title="Faucet 🪄"
                buttonText="Fund"
    
                outputs={outputs}
                validation={null}
                method={fundWallet}
            />
        </main>
    );
};

export default Finished;