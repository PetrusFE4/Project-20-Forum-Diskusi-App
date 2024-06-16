import React, { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import moment from 'moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DraftEditorEmbed from '../Editor/DraftEditorEmbed'
import { BsHeart, BsHeartbreak, BsShare, BsHeartFill, BsHeartbreakFill, BsChevronLeft } from 'react-icons/bs'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { CiBookmark, CiShare1 } from 'react-icons/ci'

const DiscussionRow = ({ data, detailed, mutate, replyMutate }) => {
    const { post_id } = useParams()
    const navigate = useNavigate()
    const [showInput, setShowInput] = useState(data._id == post_id)
    const [processing, setProcessing] = useState(false)

    const handleScore = async (val) => {
        if (processing)
            return
        try {
            setProcessing(true)
            let response = await axiosInstance.post(`/posts/${data._id}/score`, {
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
            setProcessing(true)
            let response = await axiosInstance.delete(`/posts/${data._id}/score`)
            mutate()
        } catch (error) {

        }
        setProcessing(false)
    }

    const submitReply = async (editorState) => {
        if (processing)
            return
        setProcessing(true)
        try {
            let response = await axiosInstance.post('/replies', {
                post_id: data._id,
                content: editorState
            })
            replyMutate()
            mutate()
        } catch (error) {

        }
        setShowInput(false)
        setProcessing(false)
    }

    const handleReplyClick = () => {
        if (detailed)
            setShowInput(prev => !prev)

        else
            navigate(`/post/${data._id}`)
    }

    return (
        <div className='flex flex-col bg-white p-2 md:px-4 rounded border w-full'>
            <div className='flex flex-row w-full h-12 items-center'>
                {detailed ?
                    <div className="w-6 h-6 md:w-8 md:h-8 mr-2 flex justify-center items-center hover:bg-gray-200 rounded-full cursor-pointer" onClick={() => navigate(-1)}>
                        <BsChevronLeft />
                    </div>
                    : null}
                <div className='w-8 h-8 mr-2'>
                    <img src="/media/images/user.png" alt="" />
                </div>

                <div className='flex-col'>
                    <h1 className='text-xs'><span className='font-bold'>{data.user.username}</span> {data.hasCommuity ? <span className='text-gray-500'>in <Link to={`/community/${data.community._id}`} className='hover:underline cursor-pointer'>{data.community.name}</Link></span> : <span className='text-gray-500'>in their profile</span>}</h1>
                    <span className='text-xs'>{data.created_at ? moment.utc(data.created_at).startOf('minute').fromNow() : ''}</span>
                </div>
            </div>

            {!detailed ?
                <Link to={`/post/${data._id}`}>
                    <div className="flex flex-col">
                        <h1 className='font-bold text-lg md:text-xl'>{data.title}</h1>
                        <p className='text-medium text-sm md:text-base mb-2 text-justify' dangerouslySetInnerHTML={{ __html: data.content }}></p>
                    </div>
                </Link>
                :
                <div className="flex flex-col">
                    <h1 className='font-bold text-lg md:text-xl mb-2'>{data.title}</h1>
                    <p className='text-medium text-sm md:text-base mb-2 text-justify' dangerouslySetInnerHTML={{ __html: data.content }}></p>

                </div>
            }
            <div className="flex flex-row">
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
                <div onClick={handleReplyClick} className="group cursor-pointer h-8 pl-2 pr-4 flex flex-row justify-center items-center border-r">
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
                <div className="flex flex-col mt-4">
                    <div className="border rounded-md mb-2">
                        <DraftEditorEmbed onSubmit={submitReply} />
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default DiscussionRow