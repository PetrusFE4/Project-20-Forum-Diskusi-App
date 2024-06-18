import React from 'react'
import useSWRImmutable from 'swr/immutable'
import axiosInstance from '../../lib/axiosInstance'
import PostRow from '../../components/Post/PostRow'
import SideSection from '../../layouts/SideSection'

const Home = () => {
    document.title = 'ChatterNest'
    const { data, error, isLoading, mutate } = useSWRImmutable('/posts?sort=popular?q=Rumah', url => axiosInstance.get(url).then((res) => res.data))

    return (
            <div className='break-words'>
                {!error & !isLoading ? data.data.map((post, index) => (
                    <PostRow mutate={mutate} data={post} detailed={false} />
                )) : null}
            </div>
    )
}

export default Home