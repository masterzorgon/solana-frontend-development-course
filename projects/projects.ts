interface Href {
    finished: string;
    starter: string;
}

interface Project {
    season: string;
    title: string;
    description: string;
    href: Href
}

export const projects: Project[] = [
    {
        season: 'season-one',
        title: 'wallets',
        description: 'You will use solana/web3.js to implement the Solana wallet adapter in an application.',
        href: {
            finished: '/wallets/finished',
            starter: '/wallets/starter',
        }
    },
    {
        season: 'season-one',
        title: 'faucet',
        description: 'You will build a SOL faucet that you will use to fund your Phantom browser wallet.',
        href: {
            finished: '/faucet/finished',
            starter: '/faucet/starter',
        }
    },
    {
        season: 'season-one',
        title: 'send sol',
        description: 'You will create an application that allows you to send SOL to another wallet on the Solana devnet.',
        href: {
            finished: '/sendsol/finished',
            starter: '/sendsol/starter',
        }
    },
    {
        season: 'season-one',
        title: 'serialize',
        description: 'Using Borsh, you will serialize custom instruction data to interact with an existing Solana smart contract.',
        href: {
            finished: '/serialize/finished',
            starter: '/serialize/starter',
        }
    },
    {
        season: 'season-one',
        title: 'tokens',
        description: 'You will use the @solana/spl-token library to create Token Mints, create SPL-tokens, and burn tokens.',
        href: {
            finished: '/tokens/finished',
            starter: '/tokens/starter',
        }
    },
    {
        season: 'season-two',
        title: 'movies',
        description: 'You will write and deploy a Solana program which buffer byte data. You will then create a UI to interact with it.',
        href: {
            finished: '/movies/finished',
            starter: '/movies/starter',
        }
    }
];
