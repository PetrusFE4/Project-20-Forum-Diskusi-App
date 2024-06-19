import React, { useContext, useState } from 'react'
import UserProfileButton from './UserProfileButton'
import axiosInstance from '../../lib/axiosInstance'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { IoPencil } from 'react-icons/io5'
import { useAlert } from 'react-alert'

const UserProfile = ({ data, user }) => {
    const alert = useAlert()

    const [active, setActive] = useState(true)
    const [follower, setFollower] = useState(data.follower_count)
    const [following, setFollowing] = useState(data.following)

    let self = user._id == data._id
    console.log(self)

    const handleJoin = async () => {
        if (!active)
            return
        setActive(false)
        try {
            await axiosInstance.post(`/users/${data._id}/follow`)
            alert.success('User followed!')
            setFollower(prev => prev + 1)
        } catch (error) {

        }
        setFollowing(true)
        setActive(true)
    }

    const handleLeave = async () => {
        if (!active)
            return
        setActive(false)
        try {
            await axiosInstance.post(`/users/${data._id}/unfollow`)
            alert.success('User unfollowed!')
            setFollower(prev => prev - 1)
        } catch (error) {

        }
        setFollowing(false)
        setActive(true)
    }

    const handleNotification = (value) => {

    }

    return (
        <div className="border p-2 w-full h-fit bg-white">
            <img className='w-full aspect-[32/9] object-cover' src={`${import.meta.env.VITE_CDN}/uploads/user/${data.profile_picture ?? 'default_banner.png'}`} alt="" />
            <div className="flex flex-row -mb-12 md:-mb-18 lg:-mb-24">
                <img className='-translate-y-12 h-24 w-24 p-1 md:-translate-y-18 md:h-36 md:w-36 md:p-2 lg:-translate-y-24 lg:h-48 lg:w-48 lg:p-2 aspect-square object-cover rounded-full bg-white' src={`${import.meta.env.VITE_CDN}/uploads/user/${data.profile_picture ?? 'default_profile.png'}`} alt="" />
                <div className="flex flex-row w-full justify-between p-2">
                    <div className='flex flex-col'>
                        <h1 className='font-medium text-base md:text-lg lg:text-xl'>{data.username}</h1>
                        <div className="flex flex-row">
                            <span className='text-xs md:text-sm lg:text-base'>{follower} Followers</span>
                            <span className='ml-2 text-xs md:text-sm lg:text-base'>{data.post_count ?? 0} Posts</span>
                        </div>
                    </div>
                    {self ?
                        <Link to={'/settings'} className='h-8 w-8 p-2 rounded-full bg-primary-900 text-white hover:bg-gray-200'>
                            <IoPencil />
                        </Link>
                        :
                        <UserProfileButton buttonState={active} onJoin={handleJoin} onLeave={handleLeave} onNotification={handleNotification} className='hidden md:flex ml-2 flex-row items-start justify-end' joined={following} />
                    }
                </div>
            </div>
            {self ? null :
                <UserProfileButton buttonState={active} onJoin={handleJoin} onLeave={handleLeave} onNotification={handleNotification} className='flex md:hidden px-4 ml-2 flex-row items-start justify-center my-1' joined={following} />
            }
            <div className="p-2 break-words">
                <p>{data.bio}</p>
            </div>
        </div>
    )
}

export default UserProfile