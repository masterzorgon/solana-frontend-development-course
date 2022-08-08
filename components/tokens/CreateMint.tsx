import * as React from 'react';
import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { toast } from 'react-toastify';
import { CreateMintProps } from '../../interfaces/tokens';
import RenderedComponent from '../RenderedComponent';

const CreateMint = (props: CreateMintProps) => {

    const createMint = async (event: { preventDefault: () => void; }) => {
        // prevents page from refreshing
        event.preventDefault();

        // checks if wallet is connected
        if (props.connectionErr()) { return; }

        try {
            // Token Mints are accounts which hold data ABOUT a specific token.
            // Token Mints DO NOT hold tokens themselves.
            const tokenMint = web3.Keypair.generate();
            // amount of SOL required for the account to not be deallocated
            const lamports = await token.getMinimumBalanceForRentExemptMint(props.connection);
            // `token.createMint` function creates a transaction with the following two instruction: `createAccount` and `createInitializeMintInstruction`.
            const transaction = new web3.Transaction().add(
                // creates a new account
                web3.SystemProgram.createAccount({
                    fromPubkey: props.publicKey!,
                    newAccountPubkey: tokenMint.publicKey,
                    space: token.MINT_SIZE,
                    lamports,
                    programId: token.TOKEN_PROGRAM_ID
                }),
                // initializes the new account as a Token Mint account
                token.createInitializeMintInstruction(
                    tokenMint.publicKey,
                    0,
                    props.publicKey!,
                    token.TOKEN_PROGRAM_ID
                )
            );

            // prompts the user to sign the transaction and submit it to the network
            const signature = await props.sendTransaction(transaction, props.connection, { signers: [tokenMint] });
            props.setMintTx(signature);
            props.setMintAddr(tokenMint.publicKey);
        } catch (err) {
            toast.error('Error creating Token Mint');
            console.log('error', err);
        }
    };

    const outputs = [
        {
            title: 'Token Mint Address...',
            dependency: props.mintAddr!,
            href: `https://explorer.solana.com/address/${props.mintAddr}?cluster=devnet`,
        },
        {
            title: 'Transaction Signature...',
            dependency: props.mintTx,
            href: `https://explorer.solana.com/tx/${props.mintTx}?cluster=devnet`,
        }
    ];

    return (
        <RenderedComponent
            title="Create Token Mint 🦄"
            buttonText="Create Mint"
            
            method={createMint}
            validation={null}
            outputs={outputs}
        />
    );
};

export default CreateMint;