import React, { useState } from 'react'
import { IoNotificationsOffOutline } from 'react-icons/io5'

const UserProfileButton = ({ className, joined, onLeave, onJoin, onNotification, buttonState }) => {

    return (
        <div className={`${className}`}>
            {joined ?
                <>
                    {/* <button onClick={onNotification} className={`flex p-2 rounded-full ${buttonState ? 'bg-primary-900' : 'bg-gray-500 pointer-events-none'} text-white mr-2 items-center justify-center h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10`} disabled={buttonState == true}><IoNotificationsOffOutline size={'24'} className='text-sm md:text-base lg:text-lg'/></button> */}
                    <button onClick={onLeave} className={`block p-2 rounded-full ${buttonState ? 'bg-primary-900' : 'bg-gray-500 pointer-events-none'} text-white text-xs md:text-sm lg:text-base`} disabled={!buttonState}>Unfollow</button>
                </>
                :
                <button onClick={onJoin} className={`block p-2 min-w-24 rounded-full ${buttonState ? 'bg-primary-900' : 'bg-gray-500 pointer-events-none'} text-white text-xs md:text-sm lg:text-base`} disabled={!buttonState}>Follow</button>
            }
        </div>
    )
}

export default UserProfileButton