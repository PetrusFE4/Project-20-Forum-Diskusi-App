import React, { useContext, useEffect } from 'react'
import useSWRImmutable from 'swr/immutable'
import { UserContext } from '../../contexts/UserContext'
import axiosInstance from '../../lib/axiosInstance'
import PostRow from '../../components/Post/PostRow'

const SavedPost = () => {
    const { user } = useContext(UserContext)
    useEffect(() => {
        document.title = 'ChatterNest - Saved Posts'
    })

    const { data, error, isLoading, mutate } = useSWRImmutable('/posts/saved', url => axiosInstance.get(url).then((res) => res.data))

    if (isLoading) {
        <div className="w-full h-full">
            Loading
        </div>
    }

    return (
        <>
            <div className="hidden md:flex sticky p-2 bg-white border">Saved Post</div>
            {data && !error && !isLoading ? data.data.map((post, index) => (
                <PostRow mutate={mutate} data={post} detailed={false} />
            )) : null}
        </>
    )
}

export default SavedPost