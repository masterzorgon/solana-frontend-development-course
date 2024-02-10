import * as React from 'react';
import * as web3 from '@solana/web3.js';
import * as borsh from '@project-serum/borsh';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { ExternalLinkIcon } from '@heroicons/react/outline';

const Finished = () => {
    // react state variables
    const [rating, setRating] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>("");
    const [title, setTitle] = React.useState<string>("");
    const [txSig, setTxSig] = React.useState<string>("");

    // custom on-chain program we are interacting with
    const programId = new web3.PublicKey('GWenWxNqXEEM4Cue4jRoYrGuyGb3FTAGu4fZGSwpMU5P');

    // grab user's wallet details
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    // define schema of data we're serializing and sending to the blockchain
    const movieReviewLayout = borsh.struct([
        borsh.u8('variant'),
        borsh.str('title'),
        borsh.u8('rating'),
        borsh.str('description')
    ]);

    // function to send our input to the on-chain program
    const sendMovieReview = async (event: { preventDefault: () => void; }) => {
        // prevent app refresh when this function runs
        event.preventDefault();

        // check if user's wallet is connected
        if (!publicKey || !connection) {
            toast.error('Please connect your wallet');
            throw 'Please connect your wallet';
        };

        // create a buffer to store user input | note: a solana account can store up to 10MB (10,485,760 bytes)
        let buffer = Buffer.alloc(1000);

        // create unique movie title
        const movieTitle = `${title} - (${(Math.random() * 1000000).toString().slice(0, 4)})`;

        // encodes the provided data into a binary format according to the movieInstructionLayout's schema and writes the encoded data into the buffer.
        movieReviewLayout.encode({
            variant: 0,
            title: movieTitle,
            rating: rating,
            description: description
        }, buffer);

        // adjust the buffer size in case our data has any unused space (to avoid paying hire rent / bloating blockchain space)
        buffer = buffer.slice(0, movieReviewLayout.getSpan(buffer));

        // derive the address of the account we will store this info in on-chain
        const [pda] = await web3.PublicKey.findProgramAddress(
            [publicKey!.toBuffer(), Buffer.from(movieTitle)],  
            programId
        );

        // initialize a transaction object (empty)
        const transaction = new web3.Transaction();

        // create the instruction (we will add to the transaction object)
        const instruction = new web3.TransactionInstruction({
            programId: programId,
            data: buffer,
            keys: [
                {
                    pubkey: publicKey!,
                    isSigner: true,
                    isWritable: false,
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
            ]
        });

        // add instruction to transaction object
        transaction.add(instruction);


        try { // send transaction to blockchain
            const signature = await sendTransaction(transaction, connection);
            setTxSig(signature);
            toast.success("Movie review sent to blockchain!")
            console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
        } catch (error) { // throw error messages if request fails
            console.error(error);
        } finally { // reset state variables in any case
            setDescription("");
            setRating(0);
            setTitle("");
        }
    };

    // define repetitive ui elements
    const outputs = [
        {
            title: 'Transaction Signature...',
            dependency: txSig,
            href: `https://explorer.solana.com/tx/${txSig}?cluster=devnet`
        }
    ];

    return (
        <main className='min-h-screen text-white max-w-7xl'>
            <section className='grid grid-cols-1 sm:grid-cols-6 gap-4 p-4'>
                <form className='rounded-lg min-h-content p-4 bg-[#2a302f] sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-bold text-2xl text-helius-orange'>
                            Movie Review 🎬
                        </h2>
                        <button
                            disabled={!title || !description || !rating}
                            onClick={event => sendMovieReview(event)}
                            className='disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-helius-orange bg-helius-orange rounded-lg w-24 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-helius-orange'
                        >
                            Submit
                        </button>
                    </div>

                    <div className='mt-6'>
                        <h3 className='italic text-sm'>
                            What is the name of the movie?
                        </h3>
                        <input
                            id='title'
                            type="text"
                            placeholder='Movie title'
                            className='text-[#9e80ff] py-1 w-full bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                            onChange={event => setTitle(event.target.value)}
                            value={title}
                        />
                    </div>

                    <div className='mt-6'>
                        <h3 className='italic text-sm'>
                            A brief description of the movie?
                        </h3>
                        <input
                            id='description'
                            type="text"
                            placeholder='Movie description'
                            className='text-[#9e80ff] py-1 w-full bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                            onChange={event => setDescription(event.target.value)}
                            value={description}
                        />
                    </div>
                    
                    <div className='mt-6'>
                        <h3 className='italic text-sm'>
                            What is the movie rating?
                        </h3>
                        <input
                            id='rating'
                            type="number"
                            max={5}
                            min={0}
                            placeholder='Movie rating'
                            className='text-[#9e80ff] py-1 w-full bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                            onChange={event => setRating(parseInt(event.target.value))}
                            value={rating}
                        />
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
            </section>
        </main>
    );
};

export default Finished;