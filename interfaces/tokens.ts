import { SendTransactionOptions } from "@solana/wallet-adapter-base";
import * as web3 from "@solana/web3.js";

export interface CreateMintProps {
    mintTx: string;
    mintAddr: web3.PublicKey | undefined;

    connection: web3.Connection;
    publicKey: web3.PublicKey | null;

    setMintTx: (transaction: string) => void;
    setMintAddr: (address: web3.PublicKey) => void;

    connectionErr: () => boolean | undefined;
    sendTransaction: (
        transaction: web3.Transaction,
        connection: web3.Connection,
        options?: SendTransactionOptions,
    ) => Promise<string>;
};

export interface CreateAccountProps {
    accTx: string;
    accAddr: web3.PublicKey | undefined;
    mintAddr: web3.PublicKey | undefined;

    connection: web3.Connection;
    publicKey: web3.PublicKey | null;

    setAccTx: (transaction: string) => void;
    setAccAddr: (address: web3.PublicKey) => void;

    connectionErr: () => boolean | undefined;
    sendTransaction: (
        transaction: web3.Transaction,
        connection: web3.Connection,
        options?: SendTransactionOptions,
    ) => Promise<string>;
};