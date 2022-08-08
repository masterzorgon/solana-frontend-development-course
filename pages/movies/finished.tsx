import * as React from 'react';
import * as web3 from '@solana/web3.js';
import * as borsh from '@project-serum/borsh';
import { toast } from 'react-toastify';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import RenderedComponent from '../../components/RenderedComponent';

const Finished = () => {

    const [rating, setRating] = React.useState<number | null>(null);
    const [description, setDescription] = React.useState<string | null>(null);
    const [title, setTitle] = React.useState<string | null>(null);
    const [txSig, setTxSig] = React.useState<string>('');

    const programId = new web3.PublicKey('GWenWxNqXEEM4Cue4jRoYrGuyGb3FTAGu4fZGSwpMU5P');

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const movieInstructionLayout = borsh.struct([
        borsh.u8('variant'),
        borsh.str('title'),
        borsh.u8('rating'),
        borsh.str('description')
    ]);

    const sendMovieReview = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!publicKey || !connection) {
            toast.error('Please connect your wallet');
            throw 'Please connect your wallet';
        };

        let buffer = Buffer.alloc(1000);

        const movieTitle = `${title} - (${(Math.random() * 1000000).toString().slice(0, 4)})`;

        movieInstructionLayout.encode({
            variant: 0,
            title: movieTitle,
            rating: rating,
            description: description
        }, buffer);

        buffer = buffer.slice(0, movieInstructionLayout.getSpan(buffer));

        const [pda] = await web3.PublicKey.findProgramAddress(
            [publicKey!.toBuffer(), Buffer.from(movieTitle)],  
            programId
        );

        const transaction = new web3.Transaction();
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

        try {
            transaction.add(instruction);
            const signature = await sendTransaction(transaction, connection);
            setTxSig(signature);
            console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);

            setDescription(null);
            setRating(null);
            setTitle(null);

            (document.getElementById('title') as HTMLInputElement).value = '';
            (document.getElementById('description') as HTMLInputElement).value = '';
            (document.getElementById('rating') as HTMLInputElement).value = '';
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className='min-h-screen text-white max-w-7xl'>
            <section className='grid grid-cols-1 sm:grid-cols-6 gap-4 p-4'>
                <form className='rounded-lg min-h-content p-4 bg-[#2a302f] sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                    <h2 className='font-bold text-2xl text-[#fa6ece]'>
                        Movie Review ✨
                    </h2>
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
                        />
                    </div>
                    <div className='mt-6'>
                        <button
                            disabled={!title || !description || !rating}
                            onClick={event => sendMovieReview(event)}
                            className='disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#fa6ece] bg-[#fa6ece] rounded-lg w-24 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-[#fa6ece]'
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
};

export default Finished;