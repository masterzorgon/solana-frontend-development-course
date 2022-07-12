import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { CodeIcon, LinkIcon } from '@heroicons/react/outline'

const Requirements = ({ displayRequirements, setDisplayRequirements }) => {

    const requirements = [
        {
            title: 'Phantom',
            url: 'https://phantom.app/',
            description: 'A Solana wallet browser extension...'
        },
        {
            title: 'Node Version Manager',
            url: 'https://github.com/nvm-sh/nvm',
            description: 'A CLI tool that lets you manage multiple versions of Node.js...'
        },
        {
            title: 'GitHub',
            url: 'https://github.com/',
            description: 'Software version control platform...'
        },
        {
            title: 'VSCode IDE',
            url: 'https://code.visualstudio.com/',
            description: 'A free and open source code editor...'
        }, {
            title: 'Yarn',
            url: 'https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable',
            description: 'A package manager for JavaScript...'
        }
    ];

    return (
        <Transition.Root show={displayRequirements} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setDisplayRequirements}>
                <Transition.Child
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative bg-zinc-100 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 border-2 border-green-600">
                                        <CodeIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Scroll to view requirements
                                        </Dialog.Title>
                                        <div className="py-2 mt-2 text-left h-40 overflow-scroll">
                                            {requirements.map(requirement => (
                                                <div className='pt-5'>
                                                    <div className='flex items-center'>
                                                        <LinkIcon width='16px' className='mr-1' />
                                                        <a
                                                            href={requirement.url}
                                                            rel='noreferrer'
                                                            target='_blank'
                                                            key={requirement.title}
                                                            className='font-bold hover:text-[#fa6ece]'
                                                        >
                                                            {requirement.title}
                                                        </a>
                                                    </div>
                                                    <p className='font-light italic text-sm'>
                                                        {requirement.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                                        onClick={() => setDisplayRequirements(false)}
                                    >
                                        Go back to dashboard
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}

export default Requirements;