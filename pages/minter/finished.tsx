// imports methods relevant to the react framework
import * as React from 'react';
// throws notifications for user friendly error handling
import { toast } from 'react-toastify';
// imports methods for deriving data from the wallet's data store
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
// imports icons
import { ExternalLinkIcon } from '@heroicons/react/outline';

const nftImageUrl = "https://nathan-galindo.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fimage-2.614ae0c9.jpg&w=640&q=75";
const nftExternalUrl = "https://nathan-galindo.vercel.app/";

const Finished = () => {
    const [apiUrl, setApiUrl] = React.useState<string>("");
    const [nft, setNft] = React.useState<string>("");
    const [nftImage, setNftImage] = React.useState<string>("");

    // get user info from wallet provider
    const { connection } = useConnection();
    const { publicKey } = useWallet();

    // create compressed nft
    const mintCompressedNft = async (event: { preventDefault: () => void }) => {
        // prevent react app from resetting
        event.preventDefault();

        // make api call to create cNFT
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
        console.log("RESULT", result);

        if (!result) {
            toast.error("Request failed")
            throw "Request failed"
        }

        setNft(result.assetId);

        fetchNFT(result.assetId, event);
    };

    // fetch nft after it's minted
    const fetchNFT = async (assetId: string, event: { preventDefault: () => void }) => {
        // prevent app from reloading
        event.preventDefault();

        // api call to fetch nft
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
                    id: assetId
                }
            })
        });

        // extrapolate api response
        const { result } = await response.json();

        // set nft image in state variable
        setNftImage(result.content.links.image);

        // return api result
        return { result };
    };

    // display function outputs to ui
    const outputs = [
        {
            title: 'Asset ID...',
            dependency: nft,
            href: `https://xray.helius.xyz/token/${nft}?network=devnet`,
        }
    ];

    // set api url onload
    React.useEffect(() => {
        setApiUrl(
            connection.rpcEndpoint.includes("devnet")
                ? "https://devnet.helius-rpc.com/?api-key=23aabe59-1cbe-4b31-91da-0ae23a590bdc"
                : "https://mainnet.helius-rpc.com/?api-key=23aabe59-1cbe-4b31-91da-0ae23a590bdc"
        );
    }, [connection]);

    return (
        <main className='max-w-7xl grid grid-cols-1 sm:grid-cols-6 gap-4 p-4 text-white'>
            <form onSubmit={event => mintCompressedNft(event)} className='rounded-lg min-h-content bg-[#2a302f] p-4 sm:col-span-6 lg:col-start-2 lg:col-end-6'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-lg sm:text-2xl font-semibold'>
                        cNFT Minter 🖼️
                    </h2>
                    <button
                        type='submit'
                        className='bg-helius-orange rounded-lg py-1 sm:py-2 px-4 font-semibold transition-all duration-200 border-2 border-transparent hover:border-helius-orange disabled:opacity-50 disabled:hover:bg-helius-orange hover:border-transparent disabled:cursor-not-allowed'
                        disabled={!publicKey || !connection}
                    >
                        Mint
                    </button>
                </div>
                
                <div className='text-sm font-semibold mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                    <ul className='p-2'>
                        {outputs.map(({ title, dependency, href }, index) => (
                            <li key={title} className={`flex justify-between items-center ${index !== 0 && 'mt-4'}`}>
                                <p className='tracking-wider'>{title}</p>
                                {
                                    dependency &&
                                    <a
                                        href={href}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                        className='flex text-[#80ebff] italic hover:text-white transition-all duration-200'
                                    >
                                        {dependency.toString().slice(0, 25)}...
                                        <ExternalLinkIcon className='w-5 ml-1' />
                                    </a>
                                }
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-4 h-[400px] flex justify-center items-center'>
                        {
                        nftImage // if nftImage exists, render image, otherwise render text
                            ?
                            <img 
                                width={300}
                                height={300}
                                src={nftImage}
                                className='rounded-lg border-2 border-gray-500'
                            />
                            :
                            <p className='border-2 border-gray-500 text-gray-500 p-2 rounded-lg'>NFT Image Goes Here</p>
                        }
                </div>
            </form>
        </main>
    );
};

export default Finished;