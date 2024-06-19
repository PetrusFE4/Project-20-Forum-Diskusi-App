import React, { useState } from 'react'
import CommunityProfileButton from './CommunityProfileButton'
import axiosInstance from '../../lib/axiosInstance'
import { Link } from 'react-router-dom'
import { IoPencil } from 'react-icons/io5'

const CommunityProfile = ({ data, user }) => {
    const [joined, setJoined] = useState(data.joined)
    const [member, setMember] = useState(data.member_count)
    const [ready, setReady] = useState(true)

    let creator = data.creator == user._id

    const handleJoin = async () => {
        if (!ready)
            return
        setReady(false)
        try {
            await axiosInstance.post(`/communities/${data._id}/join`)
            setJoined(true)
            setMember(prev => prev + 1)
        } catch (error) {

        }
        setReady(true)
    }

    const handleLeave = async () => {
        if (!ready)
            return
        setReady(false)
        try {
            await axiosInstance.post(`/communities/${data._id}/leave`)
            setJoined(false)
            setMember(prev => prev - 1)
        } catch (error) {

        }
        setReady(true)
    }

    return (
        <div className="border p-2 w-full h-fit bg-white">
            <img className='w-full aspect-[32/9] object-cover' src={`${import.meta.env.VITE_CDN}/uploads/community/${data.banner_picture ?? 'default_banner.png'}`} alt="" />
            <div className="flex flex-row -mb-12 md:-mb-18 lg:-mb-24">
                <img className='-translate-y-12 h-24 w-24 p-1 md:-translate-y-18 md:h-36 md:w-36 md:p-2 lg:-translate-y-24 lg:h-48 lg:w-48 lg:p-2 aspect-square object-cover rounded-full bg-white' src={`${import.meta.env.VITE_CDN}/uploads/community/${data.profile_picture ?? 'default_profile.png'}`} alt="" />
                <div className="flex flex-row w-full justify-between p-2">
                    <div className='flex flex-col'>
                        <h1 className='font-medium text-base md:text-lg lg:text-xl'>{data.name}</h1>
                        <div className="flex flex-row">
                            <span className='text-xs md:text-sm lg:text-base'>{member} Members</span>
                            <span className='ml-2 text-xs md:text-sm lg:text-base'>{data.post_count} Posts</span>
                        </div>
                    </div>
                    {!creator ?
                        <CommunityProfileButton buttonState={ready} onJoin={handleJoin} onLeave={handleLeave} className='hidden md:flex ml-2 flex-row items-start justify-end' joined={joined} />
                        :
                        <Link to={`/community/${data._id}/edit`} className='h-8 w-8 p-2 rounded-full bg-primary-900 text-white hover:bg-gray-200'>
                            <IoPencil />
                        </Link>}
                </div>
            </div>
            {!creator ?
                <CommunityProfileButton buttonState={ready} onJoin={handleJoin} onLeave={handleLeave} className='flex md:hidden ml-2 flex-row items-start justify-end' joined={joined} />
                : null}
            <div className="p-2 break-words">
                <p>{data.description}</p>
            </div>
        </div>
    )
}

export default CommunityProfile