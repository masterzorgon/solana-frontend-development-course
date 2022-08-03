import * as React from 'react';
import * as web3 from '@solana/web3.js';
import * as token from '@solana/spl-token';
import { toast } from 'react-toastify';
import { CreateAccountProps } from '../../interfaces/tokens';
import RenderedComponent from '../../components/tokens/RenderedComponent';

const CreateAccount = (props: CreateAccountProps) => {

    const createAccount = async (event: { preventDefault: () => void }) => {
        event.preventDefault();

        if (props.connectionErr()) { return; }

        try {
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
                    tokenAccount.publicKey, // account to initialize
                    props.mintAddr!, // token mint address
                    props.publicKey!, // owner of new account
                    token.TOKEN_PROGRAM_ID // spl token program account
                )   
            );

            const signature = await props.sendTransaction(transaction, props.connection, { signers: [tokenAccount] });
            props.setAccTx(signature);
            props.setAccAddr(tokenAccount.publicKey);
        } catch (err) {
            toast.error("Error creating Token Account");
            console.log('error', err);
        }
    };

    const outputs = [
        {
            title: "Token Account Address...",
            dependency: props.accAddr!,
            href: `https://explorer.solana.com/address/${props.accAddr}?cluster=devnet`,
        },
        {
            title: "Transaction Signature...",
            dependency: props.accTx,
            href: `https://explorer.solana.com/tx/${props.accTx}?cluster=devnet`,
        }
    ];

    return (
        <RenderedComponent
            title="Create Token Account 💫"
            buttonText="Create Account"
            
            method={createAccount}
            validation={props.mintAddr}
            outputs={outputs}
        />
    );
};

export default CreateAccount;