import React, { useState } from 'react'
import CommunityProfileButton from './CommunityProfileButton'

const CommunityProfile = ({ data }) => {

    const handleJoin = () => {

    }

    const handleLeave = () => {

    }

    return (
        <div className="border p-2 w-full h-fit bg-white">
            {data.banner_picture ?
                <img src={`/uploads/community/${data.profile_picture}`} alt="" />
                :
                <img className='w-full aspect-[32/9] object-cover' src='https://png.pngtree.com/thumb_back/fh260/background/20220215/pngtree-banner-background-of-blue-technology-mobile-communication-conference-image_925353.jpg' alt="" />
            }
            <div className="flex flex-row -mb-12 md:-mb-18 lg:-mb-24">
                {data.profile_picture ?
                    <img src={`/uploads/community/${data.profile_picture}`} alt="" />
                    :
                    <img className='-translate-y-12 h-24 w-24 p-1 md:-translate-y-18 md:h-36 md:w-36 md:p-2 lg:-translate-y-24 lg:h-48 lg:w-48 lg:p-2 aspect-square object-cover rounded-full bg-white' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMz2S2n3OHU5mGIPHR9cyWJVgXEaEpc8YPeQ&s' alt="" />
                }
                <div className="flex flex-row w-full justify-between p-2">
                    <div className='flex flex-col'>
                        <h1 className='font-medium text-base md:text-lg lg:text-xl'>{data.name}</h1>
                        <div className="flex flex-row">
                        <span className='text-xs md:text-sm lg:text-base'>{data.member_count} Members</span>
                        <span className='ml-2 text-xs md:text-sm lg:text-base'>{data.member_count} Posts</span>
                        </div>
                    </div>
                    <CommunityProfileButton className='hidden md:flex ml-2 flex-row items-start justify-end' joined={data.joined} />
                </div>
            </div>
            <CommunityProfileButton className='flex md:hidden px-4 ml-2 flex-row items-start justify-center my-1' joined={data.joined} />
            <div className="p-2">
                <p>{data.description}</p>
            </div>
        </div>
    )
}

export default CommunityProfile