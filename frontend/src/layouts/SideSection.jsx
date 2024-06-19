import React from 'react'
import CommunityRow from '../components/DataRow/CommunityRow'
import axiosInstance from '../lib/axiosInstance'
import useSWR from 'swr'
import UserRow from '../components/DataRow/UserRow'

const SideSection = () => {

    const { data, error, isLoading } = useSWR('/communities/popular', url => axiosInstance.get(url).then(res => res.data))
    const { data: user, error: userError, isLoading: userLoading } = useSWR('/users/popular', url => axiosInstance.get(url).then(res => res.data))
    return (
        <div className="rounded-md w-full h-full">
            <div className="p-2 mb-2">
                <h1>Popular Community</h1>
                {data && !error && !isLoading ? data.data.map((community, index) => (
                    <CommunityRow data={community} key={index} />
                )) : null}
            </div>
            <div className="p-2">
                <h1>Popular User</h1>
                {user && !userError && !userLoading ? user.data.map((user, index) => (
                    <UserRow data={user} key={index} />
                )) : null}
            </div>
        </div>
    )
}

export default SideSection