import React, { useState, useRef, useEffect, useContext, useInsertionEffect } from 'react'
import FloatingLabelTextInput from '../../components/Form/FloatingLabelTextInput'
import DraftEditor from '../../components/Editor/DraftEditor'
import DragUpload from '../../components/Form/DragUpload'
import {
    EditorState,
    convertFromHTML,
    convertFromRaw,
    ContentState
} from "draft-js"
import ExportToHTML from '../../components/Editor/ExportToHTML'
import Button from '../../components/Form/Button'
import axiosInstance from '../../lib/axiosInstance'
import SelectPostLocation from '../../components/Form/SelectPostLocation'
import Attachment from '../../components/Form/Attachment'
import { useNavigate, useParams } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

const EditPost = () => {
    const { user } = useContext(UserContext)
    document.title = 'ChatterNest - Edit Post'
    const { post_id: id } = useParams()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [attachment, setAttachment] = useState([])
    const [processing, setProcessing] = useState(false)
    const [editorState, setEditorState] = useState(
        EditorState.createWithContent(
            convertFromRaw({
                blocks: [],
                entityMap: {},
            })
        )
    )
    const [postId, setPostId] = useState(-1)

    const getPost = async () => {
        try {
            const post = (await axiosInstance.get(`/posts/${id}`)).data.data
            setPostId(post.user._id)
            setTitle(post.title)

            setAttachment(prev => {
                let temp = []
                post.attachments.forEach(element => {
                    let row = {}
                    row.file = element.file
                    row.new = false
                    temp.push(row)
                })
                console.log(temp)
                return temp
            })

            setEditorState(prev => {
                const data = convertFromHTML(post.content)
                const state = ContentState.createFromBlockArray(
                    data.contentBlocks,
                    data.entityMap,
                )

                return EditorState.createWithContent(state)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPost()
    }, [])

    useEffect(() => {
        if (!user || postId == -1)
            return

        if (user._id != postId)
            navigate(`/post/${id}`)
    }, [user])

    const submitPost = async () => {
        if (processing)
            return
        console.log(attachment)
        setProcessing(true)
        try {
            let response = await axiosInstance.put(`/posts/${id}`, {
                title: title,
                content: ExportToHTML(editorState.getCurrentContent()),
                attachments: attachment
            })
        } catch (error) {

        }
        setProcessing(false)
    }

    const [buttonActive, setButtonActive] = useState(false)

    const removeAttachmentByKey = (item) => {
        setAttachment(prev => prev.filter(each => each != item))
    }

    return (
        <div className="rounded-md border p-4 bg-white shadow-md flex flex-col">
            <div className="flex flex-row justify-between items-center mb-4">
                <h1>Edit Post</h1>
            </div>
            <div className="mb-4">
                {/* <SelectPostLocation
                        data={data}
                        label={<h1>Keywords (3-7)</h1>}
                        required={true}
                        max={7}
                        trigger={
                            <GoPlus className='ml-2 cursor-pointer h-4 w-4 p-0.5 hover:bg-gray-300 rounded-full' />
                        }
                        selected={keywords}
                        onSelect={onSelect}
                    /> */}
            </div>
            <div className="">
                <FloatingLabelTextInput limit={300} placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} required={true} />
            </div>
            <div className="rounded-3xl border bg-gray-50 border-gray-300 mb-4">
                <DraftEditor setButtonActive={setButtonActive} editorState={editorState} setEditorState={setEditorState} onSubmit={submitPost} />
            </div>
            <div className='flex flex-col h-48 mb-4'>
                <h1 className='ml-5 mb-2'>Media</h1>
                <DragUpload onUploadSuccess={(data) => setAttachment(prev => [...prev, { file: data.filename, new: true }])} onError={e => console.log(e)} />
            </div>
            {attachment.length > 0 ?
                <div className='mb-2'>
                    {attachment.map((item, index) => (
                        <Attachment key={index} data={item.new ? `${import.meta.env.VITE_CDN}/uploads/tmp/${item.file}` : `${import.meta.env.VITE_CDN}/uploads/post/${item.file}`} type='image' onRemoveClick={() => removeAttachmentByKey(item)} />
                    ))}
                </div>
                : null}
            <div className="flex flex-row justify-end">
                <Button
                    className='max-w-40'
                    title='Cancel'
                    onClick={() => navigate(-1)}
                />

                <Button
                    className='max-w-40'
                    title='Save'
                    onClick={submitPost}
                    disabled={!buttonActive}
                />
            </div>
        </div>
    )
}

export default EditPost