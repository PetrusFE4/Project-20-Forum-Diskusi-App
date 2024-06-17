import React from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { CiBellOn, CiHome, CiMail, CiSearch, CiUser } from 'react-icons/ci'
import { Link } from 'react-router-dom'

const Botbar = () => {
    return (
        <div className="w-full h-full flex flex-row px-8 justify-between items-center border-t">
            <div className="">
                <Link to=''>
                    <CiHome size='24' color='rgb(107 114 128)' />
                </Link>
            </div>
            <div className="">
                <CiSearch size='24' color='rgb(107 114 128)' />
            </div>
            <div className="h-8 w-8 p-1 rounded-full bg-primary-900">
                <BsPlusLg size='24' color='white' />
            </div>
            <div className="">
                <CiBellOn size='24' color='rgb(107 114 128)' />
            </div>
            <div className="">
                <CiUser size='24' color='rgb(107 114 128)' />
            </div>
        </div>
    )
}

export default Botbar