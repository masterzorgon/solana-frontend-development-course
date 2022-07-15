import React from 'react';
import { CodeIcon, BeakerIcon } from '@heroicons/react/outline';

import Requirements from '../components/Requirements';

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
            description: 'You will serialize custom instruction data to interact with an existing Solana smart contract.',
            href: {
                finished: '/serialize/finished',
                starter: '/serialize/starter',
            }
        },
        {
            id: '03',
            season: 'season-one',
            title: 'deserialize',
            description: '',
            href: {
                finished: '/deserialize/finished',
                starter: '/deserialize/starter',
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
                        <div key={project.id} className='rounded-lg h-60 p-5 bg-[#2a302f] col-span-1  flex flex-col justify-between'>
                            <div className='flex justify-between text-xl'>
                                <div>
                                    <BeakerIcon />
                                    <h2 className='text-[#fa6ece] font-extrabold'>{project.id}</h2>
                                </div>
                                <div>
                                    <h2 className='font-light italic tracking-wide'>{project.title}</h2>
                                    <p className='text-sm text-[#80ebff]'>{project.season}</p>
                                </div>
                            </div>
                            <div>
                                <p>{project.description}</p>
                            </div>
                            <div className='mt-8 font-semibold flex justify-between'>
                                <div>
                                    <a href={project.href.finished} className='bg-[#80ebff] text-black rounded-full px-4 py-1 transition-all duration-200 border-2 border-transparent hover:border-[#80ebff] hover:bg-transparent hover:text-white'>
                                        preview
                                    </a>
                                    <a href={project.href.starter} className='ml-4 bg-[#eb54bc] rounded-full px-4 py-1 transition-all duration-200 border-2 border-transparent hover:border-[#eb54bc] hover:bg-transparent'>
                                        starter
                                    </a>
                                </div>
                                <div>
                                    <button
                                        className='flex items-center hover:text-[#9e80ff] transition-all duration-200'
                                        onClick={() => setDisplayRequirements(!displayRequirements)}
                                    >
                                        requirements
                                        <CodeIcon width='25px' className='pl-1' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Index;