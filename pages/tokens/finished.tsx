import * as token from '@solana/spl-token';
import * as web3 from '@solana/web3.js';

import CreateMintForm from '../../components/tokens/CreateMintForm';

const Finished = () => {

    /*
        1. To create an SPL-token, you need to create a 
        Token Mint (an account that holds data about a specific token).
    */
    
    return (
        <main className='min-h-screen text-white'>
            <section className='grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 max-w-7xl'>
                <CreateMintForm />
            </section>
        </main>
    )
};

export default Finished;