import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../lib/axiosInstance'
import PostRow from '../../components/Post/PostRow'
import ReplyRow from '../../components/Post/ReplyRow'
import useSWRImmutable from 'swr/immutable'

const PostDetail = () => {
    document.title = 'ChatterNest - Post'
    const { post_id: id, reply_id } = useParams()
    const { data: discussion, error: discussionError, isLoading: discussionLoading, mutate: discussionMutate } = useSWRImmutable(`/posts/${id}`, url => axiosInstance.get(url).then(res => res.data))
    const { data: replies, error: repliesError, isLoading: repliesLoading, mutate: repliesMutate } = useSWRImmutable(`/replies${reply_id ? `/${reply_id}` : ``}?post=${reply_id ?? id}`, url => axiosInstance.get(url).then(res => res.data)) // ${reply_id ? `&parent=${reply_id}` : ``}

    return (
        <div className="flex flex-col justify-center w-full">
            {discussion ? <PostRow archived={discussion.data.deleted_at != null} data={discussion.data} detailed={true} mutate={discussionMutate} replyMutate={repliesMutate} /> : null}
            {reply_id ?
                <div className="border bg-white shadow-md py-2 px-4 text-gray-600 text-center">
                    Viewing in Single Reply Mode. <Link to={`/post/${id}`}>Go Back</Link>
                </div> : null}
            {replies && discussion ?
                replies.data.map((reply, index) => (
                    <div className='border bg-white shadow-md py-2 px-4'>
                        <ReplyRow archived={discussion.data.deleted_at != null} key={index} discussionId={id} data={reply} level={0} mutate={repliesMutate} />
                    </div>
                )) : null}
        </div>
    )
}

export default PostDetail