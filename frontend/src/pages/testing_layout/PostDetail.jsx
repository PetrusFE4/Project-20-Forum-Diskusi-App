import React from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../lib/axiosInstance'
import DiscussionRow from '../../components/Discussion/DiscussionRow'
import ReplyRow from '../../components/Discussion/ReplyRow'
import useSWRImmutable from 'swr/immutable'

const PostDetail = () => {
    document.title = 'ChatterNest - Post'
    const { post_id: id } = useParams()
    const { data: discussion, error: discussionError, isLoading: discussionLoading, mutate: discussionMutate } = useSWRImmutable(`/posts/${id}`, url => axiosInstance.get(url).then(res => res.data))
    const { data: replies, error: repliesError, isLoading: repliesLoading, mutate: repliesMutate } = useSWRImmutable(`/replies?post=${id}`, url => axiosInstance.get(url).then(res => res.data))

    return (
        <div className="flex justify-center break-words">
            <div className="flex flex-col justify-center w-full">
                {discussion ? <DiscussionRow data={discussion.data} detailed={true} mutate={discussionMutate} replyMutate={repliesMutate} /> : null}
                {replies ?
                    replies.data.map((reply, index) => (
                        <div className='border bg-white shadow-md py-2 px-4'>
                            <ReplyRow discussionId={id} data={reply} level={0} mutate={repliesMutate} />
                        </div>
                    )) : null}
            </div>
        </div>
    )
}

export default PostDetail