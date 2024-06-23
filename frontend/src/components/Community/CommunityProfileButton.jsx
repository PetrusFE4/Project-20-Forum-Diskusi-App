import React, { useState } from 'react'
import { IoNotificationsOffOutline } from 'react-icons/io5'

const CommunityProfileButton = ({ className, joined, onLeave, onJoin, onPost, onNotification, buttonState }) => {

    return (
        <div className={`${className}`}>
            {joined ?
                <>
                    {/* <button onClick={onPost} className={`block p-2 rounded-full ${buttonState ? 'bg-primary-900' : 'bg-gray-500 pointer-events-none'} text-white mr-2 text-xs md:text-sm lg:text-base`} disabled={!buttonState}>+ Post</button>
                    <button onClick={onNotification} className={`flex p-2 rounded-full ${buttonState ? 'bg-primary-900' : 'bg-gray-500 pointer-events-none'} text-white mr-2 items-center justify-center h-8 w-8 md:h-9 md:w-9 lg:h-10 lg:w-10`} disabled={buttonState == true}><IoNotificationsOffOutline size={'24'} className='text-sm md:text-base lg:text-lg'/></button> */}
                    <button onClick={onLeave} className={`block p-2 rounded-full ${buttonState ? 'bg-primary-900' : 'bg-gray-500 pointer-events-none'} text-white text-xs md:text-sm lg:text-base`} disabled={!buttonState}>Joined</button>
                </>
                :
                <button onClick={onJoin} className={`block p-2 min-w-24 rounded-full ${buttonState ? 'bg-primary-900' : 'bg-gray-500 pointer-events-none'} text-white`} disabled={!buttonState}>Join</button>
            }
        </div>
    )
}

export default CommunityProfileButton