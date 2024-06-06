import React, { useEffect, useState } from 'react'
import { BiComment } from "react-icons/bi"
import { BsHeart, BsHeartbreak, BsShare, BsHeartFill, BsHeartbreakFill, BsChevronLeft } from "react-icons/bs"
import TextArea from '../Form/TextArea'
import Button from '../Form/Button'
import axiosInstance from '../../lib/axiosInstance'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { convertToRaw } from 'draft-js'
import DraftEditor from '../Editor/DraftEditor'
import { convertToHTML } from 'draft-convert'

const DiscussionRow = ({ data, showLink, mutate, replyMutate }) => {
    const navigate = useNavigate()
    const [showInput, setShowInput] = useState(false)
    const [comment, setComment] = useState('')
    const [processing, setProcessing] = useState(false)

    const [reply, setReply] = useState('')

    useEffect(() => {
        setComment('')
    }, [showInput])

    const handleScore = async (val) => {
        if (processing)
            return
        try {
            setProcessing(true)
            let response = await axiosInstance.post(`/discussions/${data._id}/score`, {
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
            let response = await axiosInstance.delete(`/discussions/${data._id}/score`)
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
                discussion_id: data._id,
                content: editorState.getCurrentContent()
            })
            replyMutate()
            mutate()
        } catch (error) {

        }
        setShowInput(false)
        setProcessing(false)
    }

    return (
        <div className='flex flex-col bg-white py-2 px-4 md:px-8 mb-4 rounded-3xl shadow-md w-[640px]'>
            <div className='flex flex-row w-full h-12 items-center'>
                <div className="w-6 h-6 md:w-8 md:h-8 mr-2 flex justify-center items-center hover:bg-gray-200 rounded-full cursor-pointer" onClick={() => navigate(-1)}>
                    <BsChevronLeft />
                </div>
                <div className='w-8 h-8 mr-4'>
                    <img src="/media/images/user.png" alt="" />
                </div>
                <div className='flex-col'>
                    <h1 className='text-xs'><span className='font-bold'>{data.user.firstname} {data.user.lastname}</span> <span className='text-gray-500'>in {data.community.name}</span></h1>
                    <span className='text-xs'>{data.created_at ? moment.utc(data.created_at).startOf('minute').fromNow() : ''}</span>
                </div>
            </div>
            <div className="flex flex-col">
                <h1 className='font-bold text-lg md:text-xl mb-2'>{data.title}</h1>

                <p className='text-medium text-xs md:text-sm mb-2 text-justify'>{data.content}</p>
            </div>
            <div className="flex flex-row">
                <div className={`min-h-8 min-w-16 flex flex-row justify-between items-center mr-2 ${data.user_score ? 'bg-primary-900 text-white' : 'bg-[#DFD0B8] text-black'} rounded-full`}>
                    {data.user_score == 1 ? (
                        <span onClick={deleteScore} className='cursor-pointer h-8 w-8 p-2 flex items-center justify-center hover:bg-primary-800 rounded-full'>
                            <BsHeartFill size={'14'} color='#fff' />
                        </span>
                    ) : (
                        <span onClick={() => handleScore(1)} className='cursor-pointer h-8 w-8 p-2 flex items-center justify-center hover:bg-gray-300 rounded-full'>
                            <BsHeart color='#000' />
                        </span>
                    )}
                    <span className='mx-1 cursor-default text-sm'>{data.score}</span>
                    {data.user_score == -1 ? (
                        <span onClick={deleteScore} className='cursor-pointer h-8 w-8 p-2 flex items-center justify-center hover:bg-primary-800 rounded-full'>
                            <BsHeartbreakFill size={'14'} color='#fff' />
                        </span>
                    ) : (
                        <span onClick={() => handleScore(-1)} className='cursor-pointer h-8 w-8 p-2 flex items-center justify-center hover:bg-gray-300 rounded-full'>
                            <BsHeartbreak size={'16'} color='#000' />
                        </span>
                    )}
                </div>
                <div onClick={() => setShowInput(prev => !prev)} className="cursor-pointer h-8 min-w-16 px-2 flex flex-row justify-center items-center mr-2 bg-[#DFD0B8] hover:bg-[#ceb58b] rounded-full">
                    <BiComment className='mr-2' size={'16'} />
                    <span className=' text-sm'>{data.replyCount} Replies</span>
                </div>
            </div>
            {showInput ? (
                <div className="flex flex-col mt-4">
                    <div className="border rounded-md mb-2">
                        <DraftEditor discussionId={data._id} onSubmit={submitReply} />
                    </div>
                </div>
            ) : null}
        </div>
    )
}

export default DiscussionRow