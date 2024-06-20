import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import moment from 'moment'
import { Link, useNavigate, useParams } from 'react-router-dom'
import DraftEditorEmbed from '../Editor/DraftEditorEmbed'
import { BsHeart, BsHeartbreak, BsShare, BsHeartFill, BsHeartbreakFill, BsChevronLeft } from 'react-icons/bs'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { CiBookmark, CiShare1 } from 'react-icons/ci'
import { UserContext } from '../../contexts/UserContext'
import { IoPencil } from "react-icons/io5"
import { GoBookmark, GoBookmarkFill } from "react-icons/go"
import { ModalContext } from '../../contexts/ModalContext'
import MediaModal from '../../modals/MediaModal'

const PostRow = ({ data, detailed, mutate, replyMutate }) => {
    const { showModal } = useContext(ModalContext)
    const { user } = useContext(UserContext)
    const { post_id } = useParams()
    const navigate = useNavigate()
    const [showInput, setShowInput] = useState(data._id == post_id)
    const [processing, setProcessing] = useState(false)

    let isPoster = user ? user._id == data.user._id : false

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

    const copyToClipboard = () => {
        navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/post/${data._id}`)
        alert('Link copied to clipboard')
    }

    const handleSave = async () => {
        if (processing)
            return
        setProcessing(true)
        try {
            await axiosInstance.post(`/posts/${data._id}/save`)
            mutate()
        } catch (error) {

        }
        setProcessing(false)
    }

    const handleUnsave = async () => {
        if (processing)
            return
        setProcessing(true)
        try {
            await axiosInstance.post(`/posts/${data._id}/unsave`)
            mutate()
        } catch (error) {

        }
        setProcessing(false)
    }

    return (
        <div className='relative flex flex-col bg-white p-2 md:px-4 rounded border w-full'>
            {isPoster ?
                <Link className={`absolute top-4 right-4 w-8 h-8 p-2 rounded-full hover:bg-gray-400 bg-opacity-50 cursor-pointer`} to={`/post/${data._id}/edit`}>
                    <IoPencil />
                </Link>
                : null}
            <div className='flex flex-row w-full h-12 items-center'>
                {detailed ?
                    <div className="w-6 h-6 md:w-8 md:h-8 mr-2 flex justify-center items-center hover:bg-gray-200 rounded-full cursor-pointer" onClick={() => navigate(-1)}>
                        <BsChevronLeft />
                    </div>
                    : null}
                <div className='w-12 h-12 mr-2'>
                    <img className='aspect-square object-cover rounded-full' src={`${import.meta.env.VITE_CDN}/uploads/user/${data.user.profile_picture ?? 'default_profile.png'}`} alt="" />
                </div>

                <div className='flex-col'>
                    <h1 className='text-xs'><span onClick={() => navigate(`/profile/${data.user._id}`)} className='font-bold hover:underline'>{data.user.username}</span> {data.community ? data.community.name ? <span className='text-gray-500'>in <Link to={`/community/${data.community._id}`} className='hover:underline cursor-pointer'>{data.community.name}</Link></span> : null : <span className='text-gray-500'>in their profile</span>}</h1>
                    <span className='text-xs'>{data.created_at ? data.created_at == data.updated_at ? moment.utc(data.created_at).startOf('minute').fromNow() : 'Edited ' + moment.utc(data.updated_at).startOf('minute').fromNow() : ''}</span>
                </div>
            </div>

            {!detailed ?
                <Link to={`/post/${data._id}`}>
                    <div className="flex flex-col relative max-h-64 overflow-hidden">
                        <h1 className='font-bold text-lg md:text-xl'>{data.title}</h1>
                        <p className='text-medium text-sm md:text-base mb-2' dangerouslySetInnerHTML={{ __html: data.content }}></p>
                        <div className="absolute top-56 left-0 w-full h-8 bg-gradient-to-t from-white" />
                    </div>
                </Link>
                :
                <div className="flex flex-col">
                    <h1 className='font-bold text-lg md:text-xl mb-2'>{data.title}</h1>
                    <p className='text-medium text-sm md:text-base mb-2' dangerouslySetInnerHTML={{ __html: data.content }}></p>

                </div>
            }
            <div className={`${data.attachments.length > 0 ? 'block' : 'hidden'} mb-2 cursor-pointer`} onClick={() => showModal('', <MediaModal key={Date.now()} media={data.attachments} />)}>
                {data.attachments.length == 1 ?
                    <div className="">{
                        data.attachments.map((item, key) => (
                            <img className={`w-full rounded-3xl overflow-hidden object-cover aspect-video`} src={import.meta.env.VITE_CDN + '/uploads/post/' + item.file} alt="" />
                        ))
                    }</div>
                    : null}
                {data.attachments.length == 2 ?
                    <div className="rounded-3xl overflow-hidden grid grid-cols-2 auto-cols-auto auto-rows-auto">{
                        data.attachments.map((item, key) => (
                            <img className={`object-cover aspect-[8/9]`} src={import.meta.env.VITE_CDN + '/uploads/post/' + item.file} alt="" />
                        ))
                    }</div>
                    : null}

                {data.attachments.length == 3 ?
                    <div className="rounded-3xl overflow-hidden grid grid-cols-2 auto-cols-auto auto-rows-auto">{
                        data.attachments.map((item, key) => (
                            <img className={`object-cover ${key == 2 ? 'aspect-[32/9] col-span-2' : 'aspect-video'}`} src={import.meta.env.VITE_CDN + '/uploads/post/' + item.file} alt="" />
                        ))
                    }</div>
                    : null}
                {data.attachments.length == 4 ?
                    <div className="rounded-3xl overflow-hidden grid grid-cols-2 auto-cols-auto auto-rows-auto">{
                        data.attachments.map((item, key) => (
                            <img className={`object-cover aspect-video`} src={import.meta.env.VITE_CDN + '/uploads/post/' + item.file} alt="" />
                        ))
                    }</div>
                    : null}

                {data.attachments.length > 4 ?
                    <div className="rounded-3xl overflow-hidden grid grid-cols-2 auto-cols-auto auto-rows-auto">
                        {data.attachments.map((item, key) => {
                            if (key <= 3) {
                                if (key == 3)
                                    return (
                                        <div className="relative object-cover h-full w-full aspect-video flex justify-center items-center text-3xl overflow-hidden">+{data.attachments.length - 4}
                                            <img className={`absolute top-0 left-0 aspect-video w-full h-full opacity-25`} src={import.meta.env.VITE_CDN + '/uploads/post/' + item.file} alt="" />
                                        </div>
                                    )
                                else return (
                                    <img className={`object-cover aspect-video`} src={import.meta.env.VITE_CDN + '/uploads/post/' + item.file} alt="" />)
                            }
                        })}
                    </div>
                    : null}
            </div>
            {mutate ?
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
                        {!data.saved ?
                            <div onClick={handleSave} className="cursor-pointer mr-2 h-8 w-8 flex justify-center rounded-full items-center hover:bg-opacity-90 hover:bg-primary-900 hover:text-white transition-colors">
                                <GoBookmark />
                            </div>
                            :
                            <div onClick={handleUnsave} className="cursor-pointer mr-2 h-8 w-8 flex justify-center rounded-full items-center hover:bg-opacity-90 hover:bg-primary-900 hover:text-white transition-colors">
                                <GoBookmarkFill />
                            </div>
                        }
                        <div onClick={copyToClipboard} className="cursor-pointer h-8 w-8 flex justify-center rounded-full items-center hover:bg-opacity-90 hover:bg-primary-900 hover:text-white transition-colors">
                            <CiShare1 />
                        </div>
                    </div>
                </div>
                : null}
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

export default PostRow