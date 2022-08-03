import { SendTransactionOptions } from "@solana/wallet-adapter-base";
import * as web3 from "@solana/web3.js";

export interface CreateMintProps {
    mintTx: string;
    mintAddr: string;

    connection: web3.Connection;
    publicKey: web3.PublicKey | null;

    setMintTx: (transaction: string) => void;
    setMintAddr: (address: string) => void;

    connectionErr: () => boolean | undefined;
    sendTransaction: (
        transaction: web3.Transaction,
        connection: web3.Connection,
        options?: SendTransactionOptions,
    ) => Promise<string>;
};

export interface CreateAccountProps {
    accTx: string;
    accAddr: string;

    connection: web3.Connection;
    publicKey: web3.PublicKey | null;

    setAccTx: (transaction: string) => void;
    setAccAddr: (address: string) => void;

    connectionErr: () => boolean | undefined;
    sendTransaction: (
        transaction: web3.Transaction,
        connection: web3.Connection,
        options?: SendTransactionOptions,
    ) => Promise<string>;
};