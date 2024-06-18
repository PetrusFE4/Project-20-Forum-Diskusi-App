import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useSWR from 'swr'
import { BsHeart, BsHeartFill, BsHeartbreak, BsHeartbreakFill, BsPlusCircle } from 'react-icons/bs'
import axiosInstance from '../../lib/axiosInstance'
import moment from 'moment'
import DraftEditorEmbed from '../Editor/DraftEditorEmbed'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { CiBookmark, CiCirclePlus, CiShare1 } from 'react-icons/ci'

const ReplyRow = ({ discussionId, data, level, mutate, className }) => {
    const { data: replies, error: repliesError, isLoading: repliesLoading, mutate: childMutate } = useSWR(`/replies?post=${discussionId}&parent=${data._id}`, url => axiosInstance.get(url).then(res => res.data))

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

    const submitReply = async (editorState) => {
        try {
            let response = await axiosInstance.post('/replies', {
                post_id: discussionId,
                parent_id: data._id,
                content: editorState
            })
            childMutate()
            mutate()
        } catch (error) {

        }
        setShowInput(false)
    }

    return (
        <div className={`relative flex flex-col bg-white border-gray-400 break-words`}>
            <div className="relative">
                {replies && replies.data.length > 0 ?
                    <svg className='absolute h-full pointer-events-none top-0 left-0 '>
                        {(replies && replies.data.length > 0) ? // level < 3
                            <line x1="16" y1="36" x2="16" y2="100%" stroke="black" strokeLinecap='round' strokeWidth='1' />
                            : null}
                    </svg>
                    : null}
                <div className='flex flex-row w-full h-full items-center z-0'>
                    <div className='w-8 h-8 mr-2'>
                        <img src="/media/images/user.png" alt="" />
                    </div>
                    <div className='flex-col'>
                        <h1 className='text-xs'><span className='font-bold'>{data.user.username}</span></h1>
                        <span className='text-xs'>{data.created_at ? moment.utc(data.created_at).startOf('minute').fromNow() : ''}</span>
                    </div>
                </div>
                <div className="flex flex-col text-sm md:text-base mb-2 ml-10 text-balance" dangerouslySetInnerHTML={{ __html: data.content }} />
                <div className="flex flex-row mb-2 ml-10">
                    <div className={`min-h-8 min-w-16 flex flex-row justify-between items-center border-r pr-2`}>
                        {data.user_score == 1 ? (
                            <div onClick={deleteScore} className="cursor-pointer h-8 w-8 flex justify-center rounded-full items-center hover:bg-opacity-90 hover:bg-primary-900 hover:text-white transition-colors">
                                <BsHeartFill size={'14'} />
                            </div>
                            // <span onClick={deleteScore} className='cursor-pointer h-8 w-8 p-2 flex items-center justify-center hover:bg-gray-300 rounded-full'>
                            //     <BsHeartFill size={'14'} color='#000' />
                            // </span>
                        ) : (
                            <div onClick={() => handleScore(1)} className="cursor-pointer h-8 w-8 flex justify-center rounded-full items-center hover:bg-opacity-90 hover:bg-primary-900 hover:text-white transition-colors">
                                <BsHeart size={'14'} />
                            </div>
                            // <span onClick={() => handleScore(1)} className='cursor-pointer h-8 w-8 p-2 flex items-center justify-center hover:bg-gray-300 rounded-full'>
                            //     <BsHeart size={'14'} color='#000' />
                            // </span>
                        )}
                        <span className='mx-1 cursor-default text-sm'>{data.score}</span>
                        {data.user_score == -1 ? (
                            <div onClick={deleteScore} className="cursor-pointer h-8 w-8 flex justify-center rounded-full items-center hover:bg-opacity-90 hover:bg-primary-900 hover:text-white transition-colors">
                                <BsHeartbreakFill size={'14'} />
                            </div>
                            // <span onClick={deleteScore} className='cursor-pointer h-8 w-8 p-2 flex items-center justify-center hover:bg-primary-800 rounded-full'>
                            //     <BsHeartbreakFill size={'14'} color='#fff' />
                            // </span>
                        ) : (
                            <div onClick={() => handleScore(-1)} className="cursor-pointer h-8 w-8 flex justify-center rounded-full items-center hover:bg-opacity-90 hover:bg-primary-900 hover:text-white transition-colors">
                                <BsHeartbreak size={'14'} />
                            </div>
                            // <span onClick={() => handleScore(-1)} className='cursor-pointer h-8 w-8 p-2 flex items-center justify-center hover:bg-gray-300 rounded-full'>
                            //     <BsHeartbreak size={'15'} color={data.user_score ? '#fff' : '#000'} />
                            // </span>
                        )}
                    </div>
                    <div onClick={() => setShowInput(prev => !prev)} className="group cursor-pointer h-8 pl-2 pr-4 flex flex-row justify-center items-center border-r">
                        <div className="h-8 w-8 flex justify-center rounded-full items-center group-hover:bg-opacity-90 group-hover:bg-primary-900 group-hover:text-white transition-colors">
                            <HiOutlineChatBubbleOvalLeft size='16' />
                        </div>
                        <span className='group-hover:text-primary-900 transition-colors text-sm'>{data.reply_count}</span>
                    </div>
                    <div className="h-8 flex flex-row pl-2">
                        <div className="cursor-pointer mr-2 h-8 w-8 flex justify-center rounded-full items-center hover:bg-opacity-90 hover:bg-primary-900 hover:text-white transition-colors">
                            <CiBookmark />
                        </div>
                        <div className="cursor-pointer h-8 w-8 flex justify-center rounded-full items-center hover:bg-opacity-90 hover:bg-primary-900 hover:text-white transition-colors">
                            <CiShare1 />
                        </div>
                    </div>
                </div>
                {showInput ? (
                    <div className="flex flex-col mt-4 ml-10">
                        <div className="border rounded-md mb-2">
                            <DraftEditorEmbed onSubmit={submitReply} />
                        </div>
                    </div>
                ) : null}
            </div>

            {level < 3 && replies && replies.data.length > 0 ? replies.data.map((reply, index) => {
                return (
                    <>
                        <div className="relative pl-10">
                            {index + 1 != replies.data.length ?
                                <svg className='absolute h-full pointer-events-none top-0 left-0 '>
                                    {(level < 3 && replies && replies.data.length > 0) ?
                                        <line x1="16" y1="0" x2="16" y2="100%" stroke="black" strokeLinecap='round' strokeWidth='1' />
                                        : null}
                                </svg>
                                : null}
                            <svg className='absolute h-full pointer-events-none left-4 -top-1'>
                                <path d="M 0 0 A 24 24 0 0 0 24 24" stroke="black" strokeLinecap='round' strokeWidth='1' fill="none" />
                            </svg>
                            <ReplyRow key={index} className={'border-b border-l'} discussionId={discussionId} data={reply} level={level + 1} mutate={childMutate} />
                        </div>
                    </>
                )
            }) : level >= 3 && replies && replies.data.length > 0 ?
                <div className="relative pl-10">
                    <svg className='absolute h-full pointer-events-none left-4 -top-1'>
                        <path d="M 0 0 A 24 24 0 0 0 24 24" stroke="black" strokeLinecap='round' strokeWidth='1' fill="none" />
                    </svg>
                    <Link to={`/post/${discussionId}/${data._id}`} className="h-8 flex w-fit items-center mt-1 text-sm cursor-pointer">
                        <BsPlusCircle className='text-lg mr-1' /> <span>View More</span>
                    </Link>
                </div>
                : null}
        </div>
    )
}

export default ReplyRow