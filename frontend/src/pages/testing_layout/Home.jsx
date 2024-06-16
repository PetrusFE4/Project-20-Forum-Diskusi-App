import React from 'react'
import useSWRImmutable from 'swr/immutable'
import axiosInstance from '../../lib/axiosInstance'
import DiscussionRow from '../../components/Discussion/DiscussionRow'

const Home = () => {
    document.title = 'ChatterNest'
    const { data, error, isLoading } = useSWRImmutable('/posts', url => axiosInstance.get(url).then((res) => res.data))

    return (
        <div className="">
            {!error & !isLoading ? data.data.map((post, index) => (
            <DiscussionRow data={post} detailed={false} />
            )) : null}
        </div>
    )
}

export default Home