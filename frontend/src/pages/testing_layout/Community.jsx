import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import CommunityProfile from '../../components/Community/CommunityProfile'
import useSWRImmutable from 'swr/immutable'
import axiosInstance from '../../lib/axiosInstance'
import PostRow from '../../components/Post/PostRow'
import SortPost from '../../components/Sort/SortPost'
import CommunityPost from '../../components/Community/CommunityPost'
import SideSection from '../../layouts/SideSection'

const Community = () => {
    const { community_id } = useParams()
    const [params, setParams] = useSearchParams()
    const { data: communityData, error: communityError, isLoading: communityLoading } = useSWRImmutable('communities/' + community_id, url => axiosInstance.get(url).then(res => res.data))

    const onSortChange = (e) => {
        console.log(e.target.value)
        // const param = params.set('sort', e.target.value)
        setParams({ sort: e.target.value })
    }

    return (
        <>
            {communityLoading ?
                <div className="">Loading</div>
                :
                <CommunityProfile data={communityData.data} />
            }
            <SortPost onSortChange={onSortChange} />
            <CommunityPost />
        </>
    )
}

export default Community