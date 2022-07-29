import * as token from '@solana/spl-token';
import * as web3 from '@solana/web3.js';
import * as fs from 'fs';
import dotenv from "dotenv";
dotenv.config();

const airdropSolIfNeeded = async (signer: web3.Keypair, connection: web3.Connection) => {
    const balance = await connection.getBalance(signer.publicKey)
    console.log('Current balance is', balance)
    if (balance < web3.LAMPORTS_PER_SOL) {
        console.log('Airdropping 1 SOL...')
        await connection.requestAirdrop(signer.publicKey, web3.LAMPORTS_PER_SOL)
    };
};

export const initializeKeypair = async (connection: web3.Connection): Promise<web3.Keypair> => {
    if (!process.env.PRIVATE_KEY) {
        console.log("Creating .env file");
        const signer = web3.Keypair.generate();
        fs.writeFileSync('.env', `PRIVATE_KEY=[${signer.secretKey.toString()}]`);
        await airdropSolIfNeeded(signer, connection);

        return signer;
    }

    const secret = JSON.parse(process.env.PRIVATE_KEY ?? "") as number[];
    const secretKey = Uint8Array.from(secret);
    const keypairFromSecretKey = web3.Keypair.fromSecretKey(secretKey);
    await airdropSolIfNeeded(keypairFromSecretKey, connection);

    return keypairFromSecretKey;
};