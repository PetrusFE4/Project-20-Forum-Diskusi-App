import React, { useContext } from 'react'
import { BsPlusLg } from 'react-icons/bs'
import { CiBellOn, CiHashtag, CiHome, CiLogout, CiMail, CiSearch, CiUser } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'

const Botbar = () => {
    const logout = () => {
        sessionStorage.clear()
        location.reload()
    }
    const { user } = useContext(UserContext)
    return (
        <div className="w-full h-full flex flex-row justify-between px-4 items-center border-t">
            <div className="">
                <Link to='/'>
                    <CiHome size='24' color='rgb(107 114 128)' />
                </Link>
            </div>
            <div className="">
                <Link to='/community'>
                    <CiHashtag size='24' color='rgb(107 114 128)' />
                </Link>
            </div>
            <div className="">
                <Link to='/search'>
                    <CiSearch size='24' color='rgb(107 114 128)' />
                </Link>
            </div>
            <div className="h-8 w-8 p-1 rounded-full bg-primary-900">
                <Link to='/create-post'>
                    <BsPlusLg size='24' color='white' />
                </Link>
            </div>
            <div className="">
                <Link to='/notification'>
                    <CiBellOn size='24' color='rgb(107 114 128)' />
                </Link>
            </div>
            <div className="">
                <Link to={user ? '/profile/' + user._id : null}>
                    <CiUser size='24' color='rgb(107 114 128)' />
                </Link>
            </div>
            <div className="" onClick={logout}>
                <CiLogout size='24' className='text-red-600' />
            </div>
        </div>
    )
}

export default Botbar