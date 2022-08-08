import * as web3 from '@solana/web3.js';

export const initializeKeypair = async (connection: web3.Connection): Promise<web3.Keypair> => {
    const signer = web3.Keypair.generate();
    await airdropSolIfNeeded(signer, connection);

    return signer;
};

const airdropSolIfNeeded = async (signer: web3.Keypair, connection: web3.Connection) => {
    const balance = await connection.getBalance(signer.publicKey);

    if (balance < web3.LAMPORTS_PER_SOL * 1) {
        console.log('Airdropping 1 SOL...')
        await connection.requestAirdrop(signer.publicKey, web3.LAMPORTS_PER_SOL * 1)
    };
};
