import React from 'react';
import { CodeIcon, BeakerIcon } from '@heroicons/react/outline';

import Requirements from '../components/Requirements';

const Index = () => {

    const [displayRequirements, setDisplayRequirements] = React.useState(false);

    const projects = [
        {
            id: '01',
            season: 'season-one',
            title: 'sendsol',
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
            description: '',
            href: {
                finished: '/serialize/finished',
                starter: '/serialize/starter',
            }
        },
    ];

    return (
        <main className='bg-[#161b19] text-white min-h-screen p-4'>
            <Requirements
                displayRequirements={displayRequirements}
                setDisplayRequirements={setDisplayRequirements}
            />
            <section className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className="bg-[#2a302f] w-full flex flex-col items-center text-center p-4 col-span-1 md:col-span-2 rounded-lg">
                    <div>
                        <h2 className="text-3xl font-extralight">
                            The Blockchain Collaborative
                        </h2>
                        <h3 className="text-xl">
                            at Baylor University
                        </h3>
                    </div>
                    <div className="mt-4">
                        <p className="text-lg">
                            We are a student organization at Baylor University, dedicated to advancing and
                            enriching the blockchain community through research, education, and engineering.
                            If you have any questions about this project, please contact <a href='mailto:nathan_galindo1@baylor.edu' target='_blank' rel='noreferrer' className="text-[#eb54bc] hover:text-[#80ebff]">Nathan Galindo</a>, or <a href="https://github.com/nathanzebedee/solana-development" target='_blank' rel='noreferrer' className="text-[#eb54bc] hover:text-[#80ebff]">visit the repository</a>.
                        </p>
                    </div>
                </div>
                {projects.map(project => (
                    <div key={project.id} className='rounded-lg h-60 p-5 bg-[#2a302f] col-span-1  flex flex-col justify-between'>
                        <div className='flex justify-between text-xl'>
                            <div>
                                <BeakerIcon />
                                <h2 className='text-[#fa6ece] font-extrabold'>{project.id}</h2>
                            </div>
                            <div>
                                <h2 className='font-light italic tracking-wide'>{project.title}</h2>
                                <p className='text-xs text-[#80ebff]'>{project.season}</p>
                            </div>
                        </div>
                        <div >
                            <p>{project.description}</p>
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
            </section>
        </main>
    );
};

export default Index;