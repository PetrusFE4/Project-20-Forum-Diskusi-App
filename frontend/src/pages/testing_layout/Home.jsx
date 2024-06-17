import React from 'react'
import useSWRImmutable from 'swr/immutable'
import axiosInstance from '../../lib/axiosInstance'
import PostRow from '../../components/Post/PostRow'

const Home = () => {
    document.title = 'ChatterNest'
    const { data, error, isLoading } = useSWRImmutable('/posts', url => axiosInstance.get(url).then((res) => res.data))

    return (
        <div className="lg:max-w-[70%] break-words">
            {!error & !isLoading ? data.data.map((post, index) => (
            <PostRow data={post} detailed={false} />
            )) : null}
        </div>
    )
}

export default Home