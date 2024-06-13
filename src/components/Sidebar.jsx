import React from 'react'
import { CiBellOn, CiHome, CiMail, CiSearch, CiUser } from 'react-icons/ci'

const Sidebar = () => {
    return (
        <>
            <div className="flex items-center mb-6">
                <img src="https://i.pravatar.cc/100" alt="Profile Picture" className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                    <h2 className="text-lg font-bold">Helena</h2>
                </div>
            </div>
            <ul className="space-y-4">
                <li className="flex items-center">
                    <CiUser size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Account</span>
                </li>
                <li className="flex items-center">
                    <CiHome size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Home</span>
                </li>
                <li className="flex items-center">
                    <CiSearch size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Search</span>
                </li>
                <li className="flex items-center">
                    <CiBellOn size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Notifications</span>
                </li>
                <li className="flex items-center">

                    <span className="ml-2 text-gray-700">Saved posts</span>
                </li>
                <li className="flex items-center">
                    <CiMail size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Messages</span>
                </li>
            </ul>
        </>
    )
}

export default Sidebar