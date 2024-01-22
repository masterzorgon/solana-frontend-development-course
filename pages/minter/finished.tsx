// imports methods relevant to the react framework
import * as React from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react'

const nftImageUrl = "https://nathan-galindo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage-2.614ae0c9.jpg&w=640&q=75";
const nftExternalUrl = "https://nathan-galindo.vercel.app/";
        
const Finished = () => {
    const [apiUrl, setApiUrl] = React.useState<string>("");
    const [recentNFT, setRecentNFT] = React.useState<string>("");
    const [nftImageSrc, setNftImageSrc] = React.useState<string>("");

    // get user info from wallet provider
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    React.useEffect(() => {
        setApiUrl(
            connection.rpcEndpoint.includes("devnet")
                ? "https://devnet.helius-rpc.com/?api-key=23aabe59-1cbe-4b31-91da-0ae23a590bdc"
                : "https://mainnet.helius-rpc.com/?api-key=23aabe59-1cbe-4b31-91da-0ae23a590bdc"
        );
    }, [connection]);

    const mintCompressedNft = async () => {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'helius-fe-course',
                method: 'mintCompressedNft',
                params: {
                    name: "Nathan's Second cNFT",
                    symbol: 'NNFT',
                    owner: publicKey,
                    description:
                        "Nathan's Super cool NFT",
                    attributes: [
                        {
                            trait_type: 'Cool Factor',
                            value: 'Super',
                        },
                    ],
                    imageUrl: nftImageUrl,
                    externalUrl: nftExternalUrl,
                    sellerFeeBasisPoints: 6900,
                },
            })
        });

        const { result } = await response.json();

        setRecentNFT(result.assetId);

        return {
            result: result,
            message: `Minted asset: ${result.assetId}`
        };
    };

    const fetchNFT = async () => {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'applicaiton/json',
            },
            body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'my-id',
                method: 'getAsset',
                params: {
                    id: recentNFT
                }
            })
        });

        const { result } = await response.json();

        setNftImageSrc(result.content.links.image);

        return { result };
    };

    return (
        <>
            <button
                className='border text-white'
                onClick={mintCompressedNft}
            >
                mint nft
            </button>

            <button
                className='border text-white'
                onClick={fetchNFT}
            >
                get nft
            </button>

            <img
                width={200}
                height={200}
                src={nftImageSrc}
             /> 
        </>
    )
};

export default Finished;