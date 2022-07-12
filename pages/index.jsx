import React from 'react';
import { CodeIcon } from '@heroicons/react/outline';

import Requirements from '../components/Requirements';

const Index = () => {

    const [displayRequirements, setDisplayRequirements] = React.useState(false);

    const projects = [
        {
            id: '01',
            title: 'sendsol',
            description: 'You will create an application that allows you to send SOL to another wallet on the Solana devnet.',
            href: {
                finished: '/sendsol/finished',
                starter: '/sendsol/starter',
            },
        },
    ];

    return (
        <main className='bg-[#161b19] text-white min-h-screen grid grid-cols-1 md:grid-cols-2 gap-4 p-4'>
            <Requirements
                displayRequirements={displayRequirements}
                setDisplayRequirements={setDisplayRequirements}
            />
            {projects.map(project => (
                <div key={project.id} className='rounded-lg h-60 p-5 bg-[#2a302f] col-span-1  flex flex-col justify-between'>
                    <div className='flex justify-between text-xl'>
                        <h2 className='text-[#fa6ece] font-extrabold'>
                            {project.id}
                        </h2>
                        <h2 className='font-light italic tracking-wide'>
                            {project.title}
                        </h2>
                    </div>
                    <div className='mt-8'>
                        <p>
                            {project.description}
                        </p>
                    </div>
                    <div className='mt-8 font-semibold flex justify-between'>
                        <div>
                            <a href={project.href.finished} className='bg-[#80ebff] text-black rounded-full px-4 py-2 hover:bg-white'>
                                preview
                            </a>
                            <a href={project.href.starter} className='ml-4 bg-[#eb54bc] rounded-full px-4 py-2 hover:bg-white hover:text-black'>
                                starter
                            </a>
                        </div>
                        <div>
                            <button
                                className='flex items-center hover:text-[#9e80ff]'
                                onClick={() => setDisplayRequirements(!displayRequirements)}
                            >
                                requirements
                                <CodeIcon width='25px' className='pl-1' />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </main>
    );
};

export default Index;