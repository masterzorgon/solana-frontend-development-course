import React from 'react';

import Requirements from '../components/Requirements';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../projects/projects';

const Index = () => {

    const [displayRequirements, setDisplayRequirements] = React.useState(false);

    return (
        <main className='bg-[#161b19] text-white min-h-screen p-4'>
            <Requirements
                displayRequirements={displayRequirements}
                setDisplayRequirements={setDisplayRequirements}
            />
            <section className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4 max-w-7xl'>
                    {projects.map(project => (
                        <ProjectCard
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
