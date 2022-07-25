import React from 'react';
import borsh from '@project-serum/borsh';
import * as web3 from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';
import bs58 from 'bs58';

/*
    bc borsh places a u32 integer at the start of strings, 
    we must create a data slice w a 4 byte offset
*/

const Finished = () => {

    

    return (
        <main className='min-h-screen text-white'>
            <h1>finished</h1>
        </main>
    )
};

export default Finished;