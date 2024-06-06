import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { BiDislike, BiComment } from "react-icons/bi"
import { BsHeart, BsHeartFill, BsHeartbreak, BsHeartbreakFill } from "react-icons/bs"
import TextArea from '../Form/TextArea'
import Button from '../Form/Button'
import axiosInstance from '../../lib/axiosInstance'
import { EditorState } from 'draft-js'
import moment from 'moment'
import { stateToHTML } from 'draft-js-export-html'

const ReplyRow = ({ discussionId, data, level, mutate }) => {
    const { data: replies, error: repliesError, isLoading: repliesLoading, mutate: childMutate } = useSWR(`/replies?discussion=${discussionId}&parent=${data._id}`, url => axiosInstance.get(url).then(res => res.data))

    const [showInput, setShowInput] = useState(false)
    const [comment, setComment] = useState('')
    const [processing, setProcessing] = useState(false)

    useEffect(() => {
        setComment('')
    }, [showInput])

    const handleScore = async (val) => {
        if (processing)
            return
        try {
            setProcessing(true)
            let response = await axiosInstance.post(`/replies/${data._id}/score`, {
                score: val
            })
            mutate()
        } catch (error) {

        }
        setProcessing(false)
    }

    const deleteScore = async () => {
        if (processing)
            return
        try {
            let response = await axiosInstance.delete(`/replies/${data._id}/score`)
            mutate()
        } catch (error) {

        }
        setProcessing(false)
    }

    const submitReply = async () => {
        try {
            let response = await axiosInstance.post('/replies', {
                discussion_id: discussionId,
                parent_id: data._id,
                content: comment
            })
            childMutate()
        } catch (error) {

        }
        setShowInput(false)
    }

    return (
        <div className='flex flex-col bg-white pl-[32px] border-gray-400'>
            <div className='flex flex-row w-full h-12 items-center'>
                <div className='h-6 w-6 md:w-8 md:h-8 mr-2 md:mr-4 shrink-0'>
                    <img src="/media/image/user.png" alt="" />
                </div>
                <h1 className='text-xs md:text-base shrink'>{data.user.firstname} {data.user.lastname}</h1>
                <span className='ml-2'>•</span>
                <span className='ml-2 text-xs md:text-sm min-w-20'>{data.created_at ? moment.utc(data.created_at).startOf('minute').fromNow() : ''}</span>
            </div>
            <div className="flex flex-col text-xs" >
                {/* {draftToHtml(JSON.parse(data.content))} */}
            </div>
            {/* <div className="flex flex-col text-xs" dangerouslySetInnerHTML={{ __html: stateToHTML(EditorState.createWithContent(data.content)) }}>
            </div> */}
            <div className="flex flex-col text-xs md:text-sm mb-2" dangerouslySetInnerHTML={{ __html: data.content }}>
            </div>
            <div className="flex flex-row mb-2">
                <div className="min-h-8 min-w-16 flex flex-row justify-between items-center mr-4 bg-gray-200 rounded-full">
                    {data.userScore == 1 ? (
                        <span onClick={deleteScore} className='cursor-pointer h-8 w-8 p-2 mr-1 flex items-center justify-center hover:bg-gray-300 rounded-full'>
                            <BsHeartFill size={'16'} color='#2563eb' />
                        </span>
                    ) : (
                        <span onClick={() => handleScore(1)} className='cursor-pointer h-8 w-8 p-2 mr-1 flex items-center justify-center hover:bg-gray-300 rounded-full'>
                            <BsHeart size={'16'} color='#2563eb' />
                        </span>
                    )}
                    <span className='mr-1 text-sm'>{data.score}</span>
                    {data.userScore == -1 ? (
                        <span onClick={deleteScore} className='cursor-pointer h-8 w-8 p-2 flex items-center justify-center hover:bg-gray-300 rounded-full'>
                            <BsHeartbreakFill size={'16'} color='#da2829' />
                        </span>
                    ) : (
                        <span onClick={() => handleScore(-1)} className='cursor-pointer h-8 w-8 p-2 flex items-center justify-center hover:bg-gray-300 rounded-full'>
                            <BsHeartbreak size={'16'} color='#da2829' />
                        </span>
                    )}
                </div>
                <div onClick={() => setShowInput(prev => !prev)} className="cursor-pointer h-8 min-w-16 flex flex-row justify-center items-center px-2 bg-gray-200 hover:bg-gray-300 rounded-full">
                    <BiComment className='h-8 mr-2' size={'16'} />
                    <span className=' text-sm'>Reply</span>
                </div>
            </div>
            <div className='border-b-2'></div>
            {showInput ? (
                <div className="flex flex-col mt-4">
                    <TextArea
                        className='mb-2'
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                    />
                    <div className="flex flex-row">
                        <Button
                            className='max-w-40 mr-4'
                            title='Cancel'
                            onClick={() => setShowInput(false)} />
                        <Button
                            className='max-w-40'
                            title='Post'
                            onClick={submitReply} />
                    </div>
                </div>
            ) : null}
            {level < 2 && replies && replies.data.length > 0 ? replies.data.map((reply, index) => (
                <ReplyRow discussionId={discussionId} data={reply} level={level + 1} mutate={childMutate} />
            )) : null}
        </div>
    )
}

export default ReplyRow