import React from 'react'
import useSWR from 'swr'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../lib/axiosInstance'
import DiscussionRow from '../../components/Discussion/DiscussionRow'
import ReplyRow from '../../components/Discussion/ReplyRow'
import useSWRImmutable from 'swr/immutable'

const DiscussionDetail = () => {
    const { discussion_id: id } = useParams()
    const { data: discussion, error: discussionError, isLoading: discussionLoading, mutate: discussionMutate } = useSWRImmutable(`/discussions/${id}`, url => axiosInstance.get(url).then(res => res.data))
    const { data: replies, error: repliesError, isLoading: repliesLoading, mutate: repliesMutate } = useSWRImmutable(`/replies?discussion=${id}`, url => axiosInstance.get(url).then(res => res.data))

    return (
        <div className="flex justify-center break-words">
            <div className="flex flex-col justify-center">
                {discussion ? <DiscussionRow data={discussion.data} mutate={discussionMutate} replyMutate={repliesMutate} /> : null}
                {replies ?
                    replies.data.map((reply, index) => (
                        <div className='rounded-3xl bg-white shadow-md py-2 px-4 mb-4'>
                            <ReplyRow discussionId={id} data={reply} level={0} mutate={repliesMutate} />
                        </div>
                    )) : null}
            </div>
        </div>
    )
}

export default DiscussionDetail