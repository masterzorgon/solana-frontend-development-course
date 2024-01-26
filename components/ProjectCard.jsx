import { CodeIcon } from '@heroicons/react/outline';

const ProjectCard = ({ project, displayRequirements, setDisplayRequirements, index }) => (
    <div className='relative bg-helius-orange rounded-lg cols-span-1'>
        <div key={project.id} className='font-mono text-sm rounded-lg h-60 p-5 bg-zinc-800 flex flex-col justify-between transition-all duration-200 hover:translate-x-1 hover:translate-y-1'>
            <div className='flex justify-between text-xl'>
                <div>
                    <h2 className='text-helius-orange font-extrabold'>
                        {index < 10 ? `0${index + 1}` : index + 1}
                    </h2>
                </div>
                <span className='font-light tracking-wide'>{project.title}</span>
            </div>
            <p>{project.description}</p>
            <div className='mt-8 font-semibold flex justify-between'>
                <div>
                    <a href={project.href.finished} className='bg-zinc-300 text-black rounded-full px-4 py-1 transition-all duration-200 border-2 border-transparent hover:border-zinc-300 hover:bg-transparent hover:text-white'>
                        preview
                    </a>
                    <a href={project.href.starter} className='ml-4 bg-helius-orange rounded-full px-4 py-1 transition-all duration-200 border-2 border-transparent hover:border-helius-orange hover:bg-transparent'>
                        starter
                    </a>
                </div>
                <div className='block sm:hidden lg:block'>
                    <button
                        className='flex items-center hover:text-helius-orange transition-all duration-200 tracking-wide'
                        onClick={() => setDisplayRequirements(!displayRequirements)}
                    >
                        requirements
                        <CodeIcon width='25px' className='pl-1' />
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default ProjectCard;
