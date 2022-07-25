import React from 'react';

import Requirements from '../components/Requirements';
import ProjectCard from '../components/ProjectCard';

const Index = () => {

    const [displayRequirements, setDisplayRequirements] = React.useState(false);

    const projects = [
        {
            id: '01',
            season: 'season-one',
            title: 'send sol',
            description: 'You will create an application that allows you to send SOL to another wallet on the Solana devnet.',
            href: {
                finished: '/sendsol/finished',
                starter: '/sendsol/starter',
            }
        },
        {
            id: '02',
            season: 'season-one',
            title: 'serialize',
            description: 'Using Borsh, you will serialize custom instruction data to interact with an existing Solana smart contract.',
            href: {
                finished: '/serialize/finished',
                starter: '/serialize/starter',
            }
        },
        {
            id: '03',
            season: 'season-one',
            title: 'accounts',
            description: 'You will practice manipulating the custom data you fetch from existing accounts on the Solana devnet.',
            href: {
                finished: '/accounts/finished',
                starter: '/accounts/starter',
            }
        }
    ];

    return (
        <main className='bg-[#161b19] text-white min-h-screen p-4'>
            <Requirements
                displayRequirements={displayRequirements}
                setDisplayRequirements={setDisplayRequirements}
            />
            <section className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl'>
                    {projects.map(project => (
                        <ProjectCard project={project} displayRequirements={displayRequirements} setDisplayRequirements={setDisplayRequirements} />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Index;