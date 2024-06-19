import React, { useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import UserProfile from '../../components/User/UserProfile'
import useSWRImmutable from 'swr/immutable'
import axiosInstance from '../../lib/axiosInstance'
import SortPost from '../../components/Sort/SortPost'
import UserPost from '../../components/User/UserPost'
import { UserContext } from '../../contexts/UserContext'

const UserProfilePage = () => {
    const { user_id } = useParams()
    const { user } = useContext(UserContext)
    const [params, setParams] = useSearchParams()
    const { data: userProfileData, error: userProfileError, isLoading: userProfileLoading } = useSWRImmutable(`/users/${user_id}`, url => axiosInstance.get(url).then(res => res.data))

    const onSortChange = (e) => {
        console.log(e.target.value)
        // const param = params.set('sort', e.target.value)
        setParams({ sort: e.target.value })
    }

    return (
        <>
            {userProfileLoading ?
                <div className="">Loading</div>
                :
                userProfileData && user ?
                    <UserProfile user={user} data={userProfileData.data} />
                    : null
            }
            <SortPost onSortChange={onSortChange} />
            <UserPost />
        </>
    )
}

export default UserProfilePage