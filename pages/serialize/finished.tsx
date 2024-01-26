import React, { FC } from 'react';
import * as web3 from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

import { StudentIntroReference } from '../../models/serialize/StudentIntroReference';
import { StudentIntroCoordinatorReference } from '../../scripts/serialize/StudentIntroCoordinatorReference'

/* 
    account data needs to be deserialized using the same 
    layout used to store it in the first place

    when submitting a transaction to a program, the client needs to 
    include all addresses for accounts that will be written to or read from. 
    This means that unlike more traditional client-server architectures, 
    the client needs to have implementation-specific knowledge about 
    the Solana program. The client needs to know which program 
    derived address (PDA) is going to be used to store data 
    so that it can include that address in the transaction.

    when reading data from a program, the client needs to 
    know which account(s) to read from
*/

const Finished: FC = () => {

    // REACT VARIABLES
    const [name, setName] = React.useState('');
    const [thoughts, setThoughts] = React.useState('');

    // INTRO LIST STATE VARIABLES
    const [studentIntros, setStudentIntros] = React.useState<StudentIntroReference[]>([]);
    const [page, setPage] = React.useState(1)
    const [search, setSearch] = React.useState('')

    // SOLANA PROGRAM WE ARE INTERACTING WITH
    const TARGET_PROGRAM_ID = 'HdE95RSVsdb315jfJtaykXhXY478h53X6okDupVfY9yf';

    // WALLET VARIABLES
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    // SUBMIT A NEW INTRO
    const createSubmission = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        const studentIntro = new StudentIntroReference(name, thoughts);
        await handleTransactionSubmit(studentIntro);
    };

    // CREATE AND SUBMIT A NEW TRANSACTION
    const handleTransactionSubmit = async (studentIntro: StudentIntroReference) => {
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
        const [ pda ] = web3.PublicKey.findProgramAddressSync(
            [ publicKey.toBuffer() ],
            new web3.PublicKey(TARGET_PROGRAM_ID)
        );

        // create a new `Instruction` object containing `keys`, `programId`, `buffer byte data`
            // `keys` is an array of accounts that the transaction will interact with
            // `data` is the buffer byte data
            // `programId` is the smart contract that the transaction will interact with
        const instruction = new web3.TransactionInstruction({
            // `keys` is an array of objects containing `pubkey`, `isSigner`, and `isWritable` properties
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
            // data is stored as BPF encoded byte data on the Solana blockchain
            data: buffer,
            programId: new web3.PublicKey(TARGET_PROGRAM_ID),
        });

        // add the `Instruction` to the `Transaction`
        transaction.add(instruction);

        // use `sendTransaction`, passing in the `Transaction` and `connection` objects
        try {
            const response = await sendTransaction(transaction, connection);
            console.log(`Transaction submitted: https://explorer.solana.com/tx/${response}?cluster=devnet`)
            toast.success('Transaction was successful!');
        } catch (error: any) {
            toast.error('Transaction failed!');
            console.log('Error:', error);
        } finally {
            // reset react state variables
            setName('');
            setThoughts('');
        };
    };

    React.useEffect(() => {
        StudentIntroCoordinatorReference.fetchPage(
            connection,
            page,
            5,
            search,
            search !== ''
        ).then(setStudentIntros)
    }, [page, search]);

    return (
        <main className='min-h-screen text-white'>
            {/* FORM */}
            <section className='grid grid-cols-1 sm:grid-cols-6 gap-4 p-4'>
                <form className='rounded-lg min-h-content p-4 bg-[#2a302f] sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold text-2xl text-helius-orange'>
                            Introduce yourself ✌️
                        </h2>
                        <button
                            disabled={name === '' || thoughts === ''}
                            onClick={event => createSubmission(event)}
                            className='disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-helius-orange bg-helius-orange rounded-lg w-24 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-helius-orange'
                        >
                            Submit
                        </button>
                    </div>
                    <div className='pb-2'>
                        <div className='mt-4'>
                            <h3 className='italic text-sm'>
                                What do we call you?
                            </h3>
                            <input
                                id='name'
                                type="text"
                                placeholder='Your name'
                                className='py-1 w-full bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                                onChange={event => setName(event.target.value)}
                                value={name}
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
                                className='py-1 w-full bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                                onChange={event => setThoughts(event.target.value)}
                                value={thoughts}
                            />
                        </div>
                    </div>
                </form>
            </section>

            {/* LIST OF RESPONSES */}
            <section className='mb-4 grid grid-cols-1 sm:grid-cols-6 gap-4 px-4'>
                <div className='rounded-lg min-h-content p-4 bg-[#2a302f] sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                    <h2 className='font-bold text-2xl text-helius-orange mb-6'>
                        Meet the students
                    </h2>
                    <div>
                        <div className='mt-6'>
                            {
                                studentIntros.map((studentIntro: StudentIntroReference, index: number) => (
                                    (studentIntro.name && studentIntro.message) &&
                                    <div
                                        key={`${studentIntro.name}-${index}`}
                                        className='bg-[#222524] border-2 border-gray-500 my-4 p-4 rounded-lg'
                                    >
                                        <h4 className='text-[#80ebff] font-semibold tracking-wide italic text-lg'>
                                            {studentIntro.name}
                                        </h4>
                                        <p className='text-sm mt-2'>
                                            {studentIntro.message}
                                        </p>
                                    </div>
                                ))
                            }
                        </div>
                        <div className='mt-6 flex justify-between'>
                            <div>
                                {
                                    page > 1 &&
                                    <button
                                        onClick={() => setPage(page - 1)}
                                        className='bg-helius-orange rounded-lg w-24 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-helius-orange'
                                    >
                                        Previous
                                    </button>
                                }
                            </div>
                            <div>
                                {
                                    StudentIntroCoordinatorReference.accounts.length > page * 5 &&
                                    <button
                                        onClick={() => setPage(page + 1)}
                                        className='bg-helius-orange rounded-lg w-24 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-helius-orange'
                                        disabled={studentIntros.length === 0}
                                    >
                                        Next
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Finished;
