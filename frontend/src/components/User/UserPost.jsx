import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import axiosInstance from '../../lib/axiosInstance'
import PostRow from '../Post/PostRow'
import useSWR from 'swr'

const UserPost = () => {
    const { user_id } = useParams()
    const [params, setParams] = useSearchParams()
    const { data, error, isLoading, mutate } = useSWR(`/users/${user_id}/posts?sort=${params.get('sort') ?? 'popular'}`, url => axiosInstance.get(url).then((res) => res.data))

    if (!error && !isLoading) {
        return data.data.map((post, index) => (
            <PostRow key={index} mutate={mutate} data={post} detailed={false} />
        ))
    }

    if (error) (
        <div className="Error">Error</div>
    )
}

export default UserPost