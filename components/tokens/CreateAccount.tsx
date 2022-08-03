import * as React from 'react';
import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { toast } from 'react-toastify';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { CreateAccountProps } from '../../interfaces/tokens';

const CreateAccount = (props: CreateAccountProps) => {

    const createAccount = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (props.connectionErr()) { return; }

        try {
            const mintState = await token.getMint(props.connection, props.mintAddr);
            const tokenAccount = web3.Keypair.generate();
            const space = token.ACCOUNT_SIZE;
            const lamports = await props.connection.getMinimumBalanceForRentExemption(space);
            const programId = token.TOKEN_PROGRAM_ID;

            const transaction = new web3.Transaction().add(
                web3.SystemProgram.createAccount({
                    fromPubkey: props.publicKey!,
                    newAccountPubkey: tokenAccount.publicKey,
                    space,
                    lamports,
                    programId
                }),
                token.createInitializeAccountInstruction(
                    tokenAccount.publicKey,
                    props.mintAddr,
                    props.publicKey!,
                    token.TOKEN_PROGRAM_ID
                )   
            );
        } catch (err) {
            toast.error("Error creating Token Account");
            console.log('error', err);
        }
    };

    return (
        null
    );
};

export default CreateAccount;