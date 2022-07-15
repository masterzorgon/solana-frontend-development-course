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
    }, [page, search])
    
    return (
        <div>
            <div>
                <input
                    id='search'
                    onChange={event => setSearch(event.currentTarget.value)}
                    placeholder='Search'
                    className='py-1 w-full text-white bg-transparent outline-none resize-none border-2 border-transparent border-b-white'
                />
            </div>
            <div className='mt-6'>
                {
                    studentIntros.map((studentIntro, index) => (
                        studentIntro.name && 
                        <div
                            key={`${studentIntro.name}-${index}`}
                            className='bg-[#222524] border-2 border-gray-500 my-2 p-4 rounded-lg'
                        >
                            <h4 className='text-[#80ebff] font-bold italic text-lg'>
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
                {page > 1 &&
                    <button
                        onClick={() => setPage(page - 1)}
                        className='bg-[#fa6ece] rounded-lg px-4 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-[#fa6ece]'
                    >
                        Previous
                    </button>}

                {StudentIntroCoordinator.accounts.length > page * 5 &&
                    <button
                        onClick={() => setPage(page + 1)}
                        className='bg-[#fa6ece] rounded-lg px-4 py-1 font-semibold transition-all duration-200 hover:bg-transparent border-2 border-transparent hover:border-[#fa6ece]'
                    >
                        Next
                    </button>}
            </div>
        </div>
    )
}