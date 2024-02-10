import React from 'react';
import Requirements from '../components/Requirements';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../projects/projects';

const Index = () => {

    const [displayRequirements, setDisplayRequirements] = React.useState(false);

    return (
        <main className='bg-black text-white min-h-screen p-4'>
            <Requirements
                displayRequirements={displayRequirements}
                setDisplayRequirements={setDisplayRequirements}
            />
            <section className='flex flex-col gap-y-4 justify-center'>
            <div className='col-span-2 font-mono text-sm rounded-lg p-5 bg-zinc-800 w-full flex flex-col text-center items-center justify-center'>
                        <h1 className='text-xl sm:text-2xl md:text-3xl font-bold'>Helius Frontend Development Bootcamp</h1>
                        <a href="https://twitter.com/_zebedee_" rel="noreferrer" target="_blank" className='my-4 text-zinc-400 hover:text-helius-orange transition-colors duration-200'>by @_zebedee_</a>
                        <p className='leading-6'>This is a collection of projects that will help you learn the basics of frontend development for solana applications. The projects are ordered by difficulty, with the easiest projects at the top and the hardest projects at the bottom. The projects are also ordered by the order in which you should complete them. You should start with the first project and work your way down the list.</p>
                    </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-7xl'>
                    {projects.map((project, index) => (
                        <ProjectCard
                            key={index}
                            index={index}
                            project={project}
                            displayRequirements={displayRequirements}
                            setDisplayRequirements={setDisplayRequirements}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Index;
