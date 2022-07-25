import React, { useState, useEffect } from 'react';
import * as web3 from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
 import { toast } from 'react-toastify';

const Finished = () => {

    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const handleTransaction = async () => {
        try {
            if (!connection || !publicKey) {
                return;
            }

            const transaction = new web3.Transaction();
            const instruction = web3.SystemProgram.transfer({
                fromPubkey: publicKey,
                lamports: amount * web3.LAMPORTS_PER_SOL,
                toPubkey: account,
            });

            transaction.add(instruction);
            await sendTransaction(transaction, connection);
            toast.success('Transaction sent!');
        }
        catch (error) {
            console.log(error);
            toast.error('Transaction failed!');
        } 
        finally {
            setAccount('');
            setAmount(0);
            document.getElementById('account').value = '';
            document.getElementById('amount').value = '';
        }
    };

    useEffect(() => {
        const getInfo = async () => {
            if (connection && publicKey) {
                const info = await connection.getAccountInfo(publicKey);
                setBalance(info.lamports / web3.LAMPORTS_PER_SOL);
            }
        };
        getInfo();
    }, [connection, publicKey]);

    return (
        <main className='min-h-screen text-white'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-4'>
                <div className='rounded-lg h-40 p-4 bg-[#2a302f] col-span-1'>
                    <h2 className='font-semibold mb-2'>
                        Balance:
                    </h2>
                    <p className='flex justify-center font-extralight text-4xl items-end'>
                        {balance} <span className='text-[#fa6ece] text-xl font-semibold tracking-wider'>/SOL</span>
                    </p>
                </div>
                <div className='rounded-lg h-40 p-4 bg-[#2a302f] col-span-1'>
                    <h2 className='font-semibold mb-2'>
                        Amount:
                    </h2>
                    <input 
                        id='amount'
                        type="number" 
                        placeholder='Amount to send'
                        className='py-1 w-full text-white bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div className='rounded-lg h-40 p-4 bg-[#2a302f] col-span-1'>
                    <h2 className='font-semibold mb-2'>
                        Send SOL to:
                    </h2>
                    <input 
                        id='account'
                        type="text" 
                        placeholder='Address to send to'
                        className='py-1 w-full text-white bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                        onChange={(e) => setAccount(e.target.value)}
                    />
                </div>
                <div className='col-span-1 sm:col-start-2 sm:col-end-2 flex justify-center'>
                    <button
                        className='bg-[#fa6ece] transition-all duration-200 font-semibold tracking-wide rounded-lg py-1 px-4 w-full disabled:opacity-50 disabled:cursor-not-allowed enabled:hover:bg-transparent border-2 border-transparent enabled:hover:border-[#fa6ece]'
                        onClick={handleTransaction}
                        disabled={!account || !amount}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Finished;