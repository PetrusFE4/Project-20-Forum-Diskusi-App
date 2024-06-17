import React from 'react'
import { useParams } from 'react-router-dom'
import CommunityProfile from '../../components/Community/CommunityProfile'
import useSWRImmutable from 'swr/immutable'
import axiosInstance from '../../lib/axiosInstance'
import PostRow from '../../components/Post/PostRow'

const Community = () => {
    const { community_id } = useParams()
    const { data: communityData, error: communityError, isLoading: communityLoading } = useSWRImmutable('communities/665ae7128f25db6d11f77ea1', url => axiosInstance.get(url).then(res => res.data))
    const { data, error, isLoading } = useSWRImmutable('/posts', url => axiosInstance.get(url).then((res) => res.data))

    return (
        <>
            <div className="flex flex-row">
                <div className="w-full lg:w-[70%]">
                    {communityLoading ?
                        <div className="">Loading</div>
                        :
                        <CommunityProfile data={communityData.data} />
                    }
                    {!error & !isLoading ? data.data.map((post, index) => (
                        <PostRow data={post} detailed={false} />
                    )) : null}
                </div>
                <div className="hidden lg:block sticky lg:w-[30%] top-0 right-0 h-dvh p-4 bg-white border">
                    Something
                </div>
            </div>
        </>
    )
}

export default Community