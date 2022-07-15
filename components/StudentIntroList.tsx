import { FC, useEffect, useState } from 'react'
import { StudentIntro } from '../models/StudentIntro'
import * as web3 from '@solana/web3.js'
import { StudentIntroCoordinator } from '../coordinators/StudentIntroCoordinator'

export const StudentIntroList: FC = () => {
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
    const [studentIntros, setStudentIntros] = useState<StudentIntro[]>([])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState('')

    useEffect(() => {
        StudentIntroCoordinator.fetchPage(
            connection,
            page,
            5,
            search,
            search !== ''
        ).then(setStudentIntros)
    }, [page, search]);
    
    return (
        <div>
            <div className='mt-6'>
                {
                    studentIntros.map((studentIntro, index) => (
                        (studentIntro.name && studentIntro.message) &&
                        <div
                            key={`${studentIntro.name}-${index}`}
                            className='bg-[#222524] border-2 border-gray-500 my-4 p-4 rounded-lg'
                        >
                            <h4 className='text-[#80ebff] font-semibold tracking-wide italic text-lg'>
                                {studentIntro.name}
                            </h4>
                            <p className='text-sm mt-2'>
                                {studentIntro.message}
                            </p>
                        </div>
                    ))
                }
            </div>
            <div className='mt-6 flex justify-between'>
                <div className=''>
                    {
                        page > 1 &&
                        <button
                            onClick={() => setPage(page - 1)}
                            className='bg-[#fa6ece] rounded-lg w-24 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-[#fa6ece]'
                        >
                            Previous
                        </button>
                    }
                </div>
                
                <div className=''>
                    {
                        StudentIntroCoordinator.accounts.length > page * 5 &&
                        <button
                            onClick={() => setPage(page + 1)}
                            className='bg-[#fa6ece] rounded-lg w-24 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-[#fa6ece]'
                        >
                            Next
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}