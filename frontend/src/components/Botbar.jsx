import React from 'react'
import { CiBellOn, CiHome, CiMail, CiSearch, CiUser } from 'react-icons/ci'

const Botbar = () => {
    return (
        <div className="w-full h-full flex flex-row px-8 justify-between items-center border-t">
            <CiUser size='24' color='rgb(107 114 128)' />
            <CiHome size='24' color='rgb(107 114 128)' />
            <CiSearch size='24' color='rgb(107 114 128)' />
            <CiBellOn size='24' color='rgb(107 114 128)' />
            {/* <h1>Home</h1> */}
            <CiMail size='24' color='rgb(107 114 128)' />
            {/* <h1>Home</h1> */}
        </div>
    )
}

export default Botbar