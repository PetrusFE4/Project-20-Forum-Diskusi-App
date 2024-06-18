import React, { useState } from 'react'
import UserProfileButton from './UserProfileButton'
import axiosInstance from '../../lib/axiosInstance'
import { Link, useParams } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { IoPencil } from 'react-icons/io5'

const UserProfile = ({ data }) => {
    const { user } = useParams(UserContext)

    const [following, setFollowing] = useState(data.followed)

    let self = user ? user._id == data._id : true

    const handleJoin = async () => {
        try {
            await axiosInstance.post(`/users/${data._id}/follow`)
        } catch (error) {

        }
        setFollowing(true)
    }

    const handleLeave = async () => {
        try {
            await axiosInstance.post(`/users/${data._id}/unfollow`)
        } catch (error) {

        }
        setFollowing(false)
    }

    const handleNotification = (value) => {

    }

    return (
        <div className="border p-2 w-full h-fit bg-white">
            {data.banner_picture ?
                <img src={`/uploads/user/${data.profile_picture}`} alt="" />
                :
                <img className='w-full aspect-[32/9] object-cover' src='https://png.pngtree.com/thumb_back/fh260/background/20220215/pngtree-banner-background-of-blue-technology-mobile-communication-conference-image_925353.jpg' alt="" />
            }
            <div className="flex flex-row -mb-12 md:-mb-18 lg:-mb-24">
                {data.profile_picture ?
                    <img src={`/uploads/user/${data.profile_picture}`} alt="" />
                    :
                    <img className='-translate-y-12 h-24 w-24 p-1 md:-translate-y-18 md:h-36 md:w-36 md:p-2 lg:-translate-y-24 lg:h-48 lg:w-48 lg:p-2 aspect-square object-cover rounded-full bg-white' src={`${import.meta.env.VITE_CDN}/uploads/user/20230403145036_IMG_0734.jpg`} alt="" />
                }
                <div className="flex flex-row w-full justify-between p-2">
                    <div className='flex flex-col'>
                        <h1 className='font-medium text-base md:text-lg lg:text-xl'>{data.username}</h1>
                        <div className="flex flex-row">
                            <span className='text-xs md:text-sm lg:text-base'>{data.follower_count} Followers</span>
                            <span className='ml-2 text-xs md:text-sm lg:text-base'>{data.post_count} Posts</span>
                        </div>
                    </div>
                    {self ? 
                    <Link to={'/settings'} className='h-8 w-8 p-2 rounded-full bg-primary-900 text-white hover:bg-gray-200'>
                        <IoPencil />
                    </Link> 
                    :
                        <UserProfileButton onJoin={handleJoin} onLeave={handleLeave} onNotification={handleNotification} className='hidden md:flex ml-2 flex-row items-start justify-end' joined={following} />
                    }
                </div>
            </div>
            {self ? null :
                <UserProfileButton onJoin={handleJoin} onLeave={handleLeave} onNotification={handleNotification} className='flex md:hidden px-4 ml-2 flex-row items-start justify-center my-1' joined={following} />
            }
            <div className="p-2">
                <p>{data.description}</p>
            </div>
        </div>
    )
}

export default UserProfile