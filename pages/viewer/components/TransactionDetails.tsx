import * as React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CubeTransparentIcon } from '@heroicons/react/outline';

type TransactionDetailsProps = {
    transactionDetails: any;
    displayDetails: boolean;
    setDisplayDetails: (displayDetails: boolean) => void;
};


const TransactionDetails: React.FC<TransactionDetailsProps> = ({
    transactionDetails,
    displayDetails,
    setDisplayDetails
}) => {
    return (
        <Transition.Root show={displayDetails} as={React.Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setDisplayDetails}>
                <Transition.Child 
                    as={React.Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacoty-100"
                >
                    {/* UI BACKDROP */}
                    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-6">
                        <Transition.Child
                            as={React.Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel>
                                <div>
                                    {/* HEADER */}
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-[#eebcb2] border-2 border-[#e44a2a]">
                                        <CubeTransparentIcon className="h-6 w-6 text-helius-orange" aira-hidden="true" />
                                    </div>
                                    <div className="text-center mt-3">
                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium px-2 pb-2 border-2 border-zinc-300/100">
                                            Scroll to View transaction History
                                        </Dialog.Title>
                                        <div>
                                            {Object.entries(transactionDetails).map(([key, value], index) => (
                                                (
                                                    value !== null &&
                                                    typeof value !== "object" ||
                                                    !Array.isArray(value)
                                                ) && (
                                                    <p key={index}>
                                                        <div className="group border-2 border-[#e49f91] bg-[#eebcb2] rounded-md my-4 p-2">
                                                            <div className="flex justify-between items-center">
                                                                <p className="font-bold">{key}:</p>
                                                                <div className="flex items-center">
                                                                    <span className="font-bold">
                                                                        {(
                                                                            value !== null
                                                                                ?(typeof value === "string" || typeof value === "number")
                                                                                    ? (
                                                                                        value.toString().length > 10
                                                                                            ? `${value.toString().slice(0, 10)}...`
                                                                                            : value
                                                                                    )
                                                                                    : "Not Available"
                                                                                : "Not Available"
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </p>
                                                )
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 sm:my-6">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center w-full rounded-md border-2 border-black shadow-sm px-4 py-2 bg-black hover:bg-zinc-800 text-base font-medium text-white sm:text-sm transition-all duration-200"
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
};

export default TransactionDetails;