import React, { useState, useRef, useEffect } from 'react'
import FloatingLabelTextInput from '../../components/Form/FloatingLabelTextInput'
import DraftEditor from '../../components/Editor/DraftEditor'
import DragUpload from '../../components/Form/DragUpload'
import {
    EditorState,
    convertFromRaw,
} from "draft-js"
import ExportToHTML from '../../components/Editor/ExportToHTML'
import Button from '../../components/Form/Button'
import axiosInstance from '../../lib/axiosInstance'
import SelectPostLocation from '../../components/Form/SelectPostLocation'
import Attachment from '../../components/Form/Attachment'

const CreatePost = () => {
    document.title = 'ChatterNest - Create Post'
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

    const submitPost = async () => {
        if (processing)
            return
        console.log(attachment)
        setProcessing(true)
        try {
            let response = await axiosInstance.post('/posts', {
                // community_id: data._id,
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
        <div className="rounded-md border p-4 bg-white shadow-md flex flex-col w-full lg:max-w-[70%]">
            <div className="flex flex-row justify-between items-center mb-4">
                <h1>Create new Post</h1>
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
                <FloatingLabelTextInput autoFocus={true} limit={300} placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} required={true} />
            </div>
            <div className="rounded-3xl border bg-gray-50 border-gray-300 mb-4">
                <DraftEditor setButtonActive={setButtonActive} editorState={editorState} setEditorState={setEditorState} onSubmit={submitPost} />
            </div>
            <div className='flex flex-col h-48 mb-4'>
                <h1 className='ml-5 mb-2'>Media</h1>
                <DragUpload onUploadSuccess={(data) => setAttachment(prev => [...prev, { file: data.filename }])} onError={e => console.log(e)} />
            </div>
            {attachment.length > 0 ?
                <div className='mb-2'>
                    {attachment.map((item, index) => (
                        <Attachment key={index} data={`${import.meta.env.VITE_CDN}/uploads/tmp/${item.file}`} type='image' onRemoveClick={() => removeAttachmentByKey(item)} />
                    ))}
                </div>
                : null}
            <div className="flex flex-row justify-end">
                <Button
                    className='max-w-40'
                    title='Post'
                    onClick={submitPost}
                    disabled={!buttonActive}
                />
            </div>
        </div>
    )
}

export default CreatePost