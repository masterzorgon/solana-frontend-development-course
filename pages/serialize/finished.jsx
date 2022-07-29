import * as React from 'react';
import * as web3 from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

import { StudentIntro } from '../../models/StudentIntro';
import { StudentIntroList } from '../../components/StudentIntroList';

/* 
    account data needs to be deserialized using the same 
    layout used to store it in the first place

    When submitting a transaction to a program, the client needs to 
    include all addresses for accounts that will be written to or read from. 
    This means that unlike more traditional client-server architectures, 
    the client needs to have implementation-specific knowledge about 
    the Solana program. The client needs to know which program 
    derived address (PDA) is going to be used to store data 
    so that it can include that address in the transaction.

    when reading data from a program, the client needs to 
    know which account(s) to read from
*/

const Finished = () => {

    const [name, setName] = React.useState('');
    const [thoughts, setThoughts] = React.useState('');

    const TARGET_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf';

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const createSubmission = async event => {
        event.preventDefault();
        const studentIntro = new StudentIntro(name, thoughts);
        await handleTransactionSubmit(studentIntro);
    };

    const handleTransactionSubmit = async studentIntro => {
        // check that the wallet is connected
        if (!connection || !publicKey) {
            toast.error('Please connect your wallet.');
            return;
        }
        // call `serialize` on `StudentIntro` to get buffer byte data
        const buffer = studentIntro.serialize();
        // create a new `Transaction` object
        const transaction = new web3.Transaction();
        // get all accounts that the transaction will interact with
        const [pda] = await web3.PublicKey.findProgramAddress(
            [publicKey.toBuffer()],
            new web3.PublicKey(TARGET_PROGRAM_ID)
        );
        // create a new `Instruction` object containing `keys`, `programId`, `buffer byte data`
        const instruction = new web3.TransactionInstruction({
            keys: [
                {
                    pubkey: publicKey,
                    isSigner: true,
                    isWritable: false
                },
                {
                    pubkey: pda,
                    isSigner: false,
                    isWritable: true
                },
                {
                    pubkey: web3.SystemProgram.programId,
                    isSigner: false,
                    isWritable: false
                }
            ],
            data: buffer,
            programId: new web3.PublicKey(TARGET_PROGRAM_ID),
        })
        // add the `Instruction` to the `Transaction`
        transaction.add(instruction);
        // use `sendTransaction`, passing in the `Transaction` and `connection` objects
        try {
            const response = await sendTransaction(transaction, connection);
            console.log(`Transaction submitted: https://explorer.solana.com/tx/${response}?cluster=devnet`)
            toast.success('Transaction was successful!');
        } catch (error) {
            if (error.message !== 'User rejected the request.') {
                toast.error('Transaction failed!');
            }
            console.log('Error:', error);
        } finally {
            document.getElementById('name').value = '';
            document.getElementById('thoughts').value = '';
            setName('');
            setThoughts('');
        };
    };

    return (
        <main className='min-h-screen text-white'>
            {/* CONTACT FORM */}
            <section className='grid grid-cols-1 sm:grid-cols-6 gap-4 p-4'>
                <form className='rounded-lg min-h-content p-4 bg-[#2a302f] sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                    <h2 className='font-bold text-2xl text-[#fa6ece]'>
                        Introduce yourself ✌️
                    </h2>
                    <div className='mt-6'>
                        <h3 className='italic text-sm'>
                            What do we call you?
                        </h3>
                        <input
                            id='name'
                            type="text"
                            placeholder='Your name'
                            className='py-1 w-full text-white bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                            onChange={event => setName(event.target.value)}
                        />
                    </div>
                    <div className='mt-6'>
                        <h3 className='italic text-sm'>
                            What brings you to Solana?
                        </h3>
                        <input
                            id='thoughts'
                            type="text"
                            placeholder='Your thoughts'
                            className='py-1 w-full text-white bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                            onChange={event => setThoughts(event.target.value)}
                        />
                    </div>
                    <div className='mt-6'>
                        <button
                            disabled={name === '' || thoughts === ''}
                            onClick={event => createSubmission(event)}
                            className='disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#fa6ece] bg-[#fa6ece] rounded-lg w-24 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-[#fa6ece]'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </section>

            {/* LIST OF RESPONSES */}
            <section className='mb-4 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4'>
                <div className='rounded-lg min-h-content p-4 bg-[#2a302f] sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                    <h2 className='font-bold text-2xl text-[#fa6ece] mb-6'>
                        Meet the students
                    </h2>
                    <StudentIntroList />
                </div>
            </section>
        </main>
    );
};

export default Finished;