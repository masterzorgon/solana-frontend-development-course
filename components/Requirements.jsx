import React from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { CodeIcon, LinkIcon } from '@heroicons/react/outline'

const Requirements = ({ displayRequirements, setDisplayRequirements }) => {

    const requirements = [
        {
            title: 'Phantom',
            url: 'https://phantom.app/',
            description: 'A Solana wallet browser extension'
        },
        {
            title: 'SOL',
            url: 'https://solfaucet.com/',
            description: 'Cryptocurrency native to the Solana blockchain'
        },
        {
            title: 'Node Version Manager',
            url: 'https://github.com/nvm-sh/nvm',
            description: 'A CLI tool that lets you manage multiple versions of Node.js'
        },
        {
            title: 'GitHub',
            url: 'https://github.com/',
            description: 'Software version control platform'
        },
        {
            title: 'VSCode IDE',
            url: 'https://code.visualstudio.com/',
            description: 'A free and open source code editor'
        }, {
            title: 'Yarn',
            url: 'https://classic.yarnpkg.com/lang/en/docs/install/#mac-stable',
            description: 'A package manager for JavaScript'
        },
        {
            title: 'Git',
            url: 'https://git-scm.com/',
            description: 'A version control system'
        },
        {
            title: 'Solana CLI',
            url: 'https://docs.solana.com/cli/install-solana-cli-tools',
            description: 'A command line interface for the Solana blockchain'
        },
        {
            title: 'Anchor CLI',
            url: 'https://www.anchor-lang.com/docs/installation',
            description: 'A command line interface for developing Anchor projects'
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
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity" />
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
                            <Dialog.Panel className="relative bg-zinc-200 rounded-lg px-4 text-left overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full sm:p-6">
                                <div>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#eebcb2] border-2 border-[#e44a2a]">
                                        <CodeIcon className="h-6 w-6 text-helius-orange" aria-hidden="true" />
                                    </div>
                                    <div className="text-center mt-3">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                            Scroll to view dependencies
                                        </Dialog.Title>
                                        <div className="mt-4 text-left h-40 overflow-scroll rounded-lg px-2 pb-2 border-2 border-zinc-300/100">
                                            {requirements.map(requirement => (
                                                <a
                                                    href={requirement.url}
                                                    rel='noreferrer'
                                                    target='_blank'
                                                    key={requirement.title}
                                                >
                                                    <div className='group border-2 border-[#e49f91] bg-[#eebcb2] rounded-md my-4 p-2'>
                                                        <div    
                                                            className='flex items-center'
                                                        >
                                                            <LinkIcon
                                                                width='16px'
                                                                className='mr-1 group-hover:text-helius-orange transition-all duration-200'
                                                            />
                                                            <span
                                                                className='font-bold group-hover:text-helius-orange transition-all duration-200'
                                                            >
                                                                {requirement.title}
                                                            </span>
                                                        </div>
                                                        <p className='font-base text-sm transition-all duration-200 text-zinc-600'>
                                                            {requirement.description}
                                                        </p>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border-2 border-black shadow-sm px-4 py-2 bg-black hover:bg-zinc-800 text-base font-medium text-white sm:text-sm transition-all duration-200"
                                        onClick={() => setDisplayRequirements(false)}
                                    >
                                        Close
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