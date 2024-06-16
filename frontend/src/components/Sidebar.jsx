import React from 'react'
import { CiBellOn, CiBookmark, CiHome, CiMail, CiSearch, CiUser } from 'react-icons/ci'

const Sidebar = () => {
    return (
        <>
            <div className="flex flex-row items-center p-2 my-4">
                <img src="https://i.pravatar.cc/100" alt="Profile Picture" className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                    <h2 className="text-lg font-bold">Helena</h2>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center px-2">
                <div className="p-2 my-1 flex items-center w-full transition-colors cursor-pointer hover:bg-gray-200 rounded-full">
                    <CiHome size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Home</span>
                </div>
                <div className="p-2 my-1 flex items-center w-full transition-colors cursor-pointer hover:bg-gray-200 rounded-full">
                    <CiSearch size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Search</span>
                </div>
                <div className="p-2 my-1 flex items-center w-full transition-colors cursor-pointer hover:bg-gray-200 rounded-full">
                    <CiBellOn size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Notifications</span>
                </div>
                <div className="p-2 my-1 flex items-center w-full transition-colors cursor-pointer hover:bg-gray-200 rounded-full">
                    <CiBookmark size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Saved posts</span>
                </div>
                {/* <div className="p-2 my-1 flex items-center w-full transition-colors cursor-pointer hover:bg-gray-200 rounded-full">
                    <CiMail size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Messages</span>
                </div> */}
                <div className="p-2 my-1 flex items-center w-full transition-colors cursor-pointer hover:bg-gray-200 rounded-full">
                    <CiUser size='24' color='rgb(107 114 128)' />
                    <span className="ml-2 text-gray-700">Account</span>
                </div>
                <div className="p-2 my-1 flex justify-center items-center w-full transition-colors cursor-pointer bg-primary-900 hover:bg-primary-700 rounded-full">
                    <span className="text-white">Create Post</span>
                </div>
            </div>
        </>
    )
}

export default Sidebar