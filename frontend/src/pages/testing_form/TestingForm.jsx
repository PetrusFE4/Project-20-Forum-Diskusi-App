import React, { useState } from 'react'
import FloatingLabelTextInput from '../../components/Form/FloatingLabelTextInput'
import DraftEditor from '../../components/Editor/DraftEditor'
import DragUpload from '../../components/Form/DragUpload'

const TestingForm = () => {
    const [title, setTitle] = useState('')

    const [attachment, setAttachment] = useState([])

    const submitReply = async (editorState) => {
        if (processing)
            return
        setProcessing(true)
        try {
            let response = await axiosInstance.post('/replies', {
                discussion_id: data._id,
                content: editorState
            })
            replyMutate()
            mutate()
        } catch (error) {

        }
        setShowInput(false)
        setProcessing(false)
    }

    return (
        <div className="flex justify-center bg-[#dddddd]">
            <div className="rounded-3xl p-4 mb-4 bg-white shadow-md flex flex-col w-[640px]">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h1>Create new Post</h1>
                </div>
                <div className="">
                    <FloatingLabelTextInput limit={300} placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} required={true} />
                </div>
                <div className="rounded-3xl border bg-gray-50 border-gray-300 mb-4">
                    <DraftEditor onSubmit={submitReply} />
                </div>
                <div className='h-64'>
                    <DragUpload />
                </div>
            </div>
        </div>
    )
}

export default TestingForm