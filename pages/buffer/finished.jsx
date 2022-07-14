import * as React from 'react';
import * as web3 from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
 import { toast } from 'react-toastify';

const Finished = () => {

    const [responses, setResponses] = React.useState([]);
    const [form, setForm] = React.useState({
        name: '',
        thoughts: ''
    });

    return (
        <main className='min-h-screen text-white'>
            <section className='grid grid-cols-1 sm:grid-cols-6 gap-4 p-4'>
                <form className='rounded-lg min-h-content p-4 bg-[#2a302f] col-start-2 col-end-6'>
                    <h2 className='font-bold text-2xl text-[#fa6ece]'>
                        Introduce yourself! ✌️
                    </h2>
                    <div className='mt-6'>
                        <h3 className='italic text-sm'>
                            What do we call you?
                        </h3>
                        <input
                            type="text"
                            placeholder='your name'
                            className='py-1 w-full text-white bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                            onChange={event => setForm({ ...form, name: event.target.value })}
                        />
                    </div>
                    <div className='mt-6'>
                        <h3 className='italic text-sm'>
                            What are your thoughts about The Blockchain Collaborative?
                        </h3>
                        <input
                            type="text"
                            placeholder='your thoughts'
                            className='py-1 w-full text-white bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                            onChange={event => setForm({ ...form, thoughts: event.target.value})}
                        />
                    </div>
                    <div className='mt-6'>
                        <button className='bg-[#fa6ece] rounded-lg px-4 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-[#fa6ece]'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>

            <section>
                
            </section>
        </main>
    );
};

export default Finished;