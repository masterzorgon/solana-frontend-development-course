import { ExternalLinkIcon } from '@heroicons/react/outline';
import { RenderedComponentProps } from '../interfaces/tokens';

const RenderedComponent = (props: RenderedComponentProps) => {
    return (
        <form onSubmit={event => props.method(event)} className='rounded-lg min-h-content bg-[#2a302f] p-4 sm:col-span-6 lg:col-start-2 lg:col-end-6'>
            <div className='flex justify-between items-center'>
                <h2 className='text-lg sm:text-2xl font-semibold'>
                    {props.title}
                </h2>
                <button
                    type='submit'
                    disabled={props.validation === undefined}
                    className='bg-helius-orange rounded-lg py-1 sm:py-2 px-4 font-semibold transition-all duration-200 border-2 border-transparent hover:border-helius-orange disabled:opacity-50 disabled:hover:bg-helius-orange hover:bg-transparent disabled:cursor-not-allowed'
                >
                    {props.buttonText}
                </button>
            </div>
            <div className='text-sm font-semibold mt-8 bg-[#222524] border-2 border-gray-500 rounded-lg p-2'>
                <ul className='p-2'>
                    {props.outputs.map(({ title, dependency, href }, index) => (
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
        </form>
    );
};

export default RenderedComponent;