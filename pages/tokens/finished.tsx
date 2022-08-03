import * as React from "react";
import { toast } from "react-toastify";
import * as web3 from "@solana/web3.js";
import * as token from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { initializeKeypair } from "../../scripts/tokens/InitializeKeypair";

import CreateMint from "../../components/tokens/CreateMint";
import CreateAccount from "../../components/tokens/CreateAccount";

const Finished = () => {

    // Token Mint
    const [mintTx, setMintTx] = React.useState<string>("");
    const [mintAddr, setMintAddr] = React.useState<string>("");

    // Token Account
    const [accTx, setAccTx] = React.useState<string>("");
    const [accAddr, setAccAddr] = React.useState<string>("");

    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const connectionErr = () => {
        if (!publicKey || !connection) {
            toast.error("Please connect your wallet");
            return;
        }
    };

    return (
        <main className="max-w-7xl grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 text-white">
            <CreateMint
                mintTx={mintTx}
                mintAddr={mintAddr}

                connection={connection}
                publicKey={publicKey}

                setMintTx={setMintTx}
                setMintAddr={setMintAddr}

                sendTransaction={sendTransaction}
                connectionErr={connectionErr}
            />
            <CreateAccount
                accTx={accTx}
                accAddr={accAddr}

                connection={connection}
                publicKey={publicKey}

                setAccTx={setAccTx}
                setAccAddr={setAccAddr}
                
                sendTransaction={sendTransaction}
                connectionErr={connectionErr}
            />
        </main>
    );
};

export default Finished;