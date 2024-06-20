import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import InputText from '../../components/Form/InputText'
import CommunityRow from '../../components/DataRow/CommunityRow'
import PostRow from '../../components/Post/PostRow'
import { Link, useSearchParams } from 'react-router-dom'
import useSWR from 'swr'
import { UserContext } from '../../contexts/UserContext'

const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [activeTab, setActiveTab] = useState(0)
    const [search, setSearch] = useState('')
    const getActiveTab = () => {
        switch (activeTab) {
            case 0:
                return 'users'
            case 1:
                return 'communities'
            case 2:
                return 'posts'
        }
    }

    const { data: response, error, isLoading } = useSWR(`/${getActiveTab()}?q=${searchParams.get('q')}`, url => axiosInstance.get(url).then(res => res.data))

    // const [data, setData] = useState([])

    const handleSearch = async (e) => {
        e.preventDefault()
        const n = searchParams.set('q', search)
        setSearchParams({ q: search })
    }

    useEffect(() => {

    }, [activeTab])

    const renderItem = (params) => {
        if (error || isLoading || !response)
            return

        switch (params) {
            case 0:
                return response.data.map((item, index) => (
                    <Link to={`/profile/${item._id}`}>
                        <div key={index} className="p-2 border bg-white flex flex-row items-center">
                            <img className='w-12 h-12 rounded-full mr-4' src={item.profile_picture != null ? import.meta.env.VITE_CDN + '/uploads/user/' + item.profile_picture : import.meta.env.VITE_CDN + '/uploads/user/default_profile.png'} alt="" />
                            <div className="flex flex-col">
                                <h1>{item.username}</h1>
                                <div className="flex flex-row">
                                    <span className='text-sm mr-4'>{item.follower_count} Followers</span>
                                    <span className='text-sm'>{item.post_count ?? 0} Posts</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            case 1:
                return response.data.map((community, index) => (
                    <div
                        key={index}
                        className="bg-white border shadow-md p-4"
                    >
                        <Link to={`/community/${community._id}`}>
                            <div className="flex items-center mb-2">
                                <div className="">
                                    <img
                                        src={`${import.meta.env.VITE_CDN}/uploads/community/${community.profile_picture ?? 'default_profile.png'}`}
                                        className="h-12 w-12 shrink-0 rounded-full"
                                    />
                                </div>
                                <div className="flex-col items-center ml-2">
                                    <span className=" text-gray-500">{community.name}</span>
                                    <p className="text-gray-700">{community.description.length < 50 ? community.description : community.description.slice(0, 50) + ' ...'}</p>
                                    <div className="flex flex-row">
                                        <p className="text-gray-500 mr-4">{community.member_count} Members</p>
                                        <p className="text-gray-500">{community.post_count} Posts</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))
            case 2:
                return response.data.map((post, index) => (
                    <PostRow key={index} data={post} />
                ))
        }
    }

    return (
        <div className="relative">
            <div className="p-2 bg-white border-x border-t">
                <form onSubmit={handleSearch}>
                    <InputText value={search} onChange={e => setSearch(e.target.value)} />
                </form>
            </div>
            <div className="bg-white border-x border-b flex flex-row justify-between">
                <div onClick={() => setActiveTab(0)} className={`cursor-pointer p-3 flex w-full justify-center border-b-2 hover:border-primary-900 hover:border-b-2 ${activeTab == 0 ? 'border-gray-900' : 'border-transparent'}`}>User</div>
                <div onClick={() => setActiveTab(1)} className={`cursor-pointer p-3 flex w-full justify-center border-b-2 hover:border-primary-900 hover:border-b-2 ${activeTab == 1 ? 'border-gray-900' : 'border-transparent'}`}>Community</div>
                <div onClick={() => setActiveTab(2)} className={`cursor-pointer p-3 flex w-full justify-center border-b-2 hover:border-primary-900 hover:border-b-2 ${activeTab == 2 ? 'border-gray-900' : 'border-transparent'}`}>Post</div>
            </div>
            {renderItem(activeTab)}
        </div>
    )
}

export default Search