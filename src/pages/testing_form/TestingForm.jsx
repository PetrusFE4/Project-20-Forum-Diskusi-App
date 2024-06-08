import React, { useState } from 'react'
import FloatingLabelTextInput from '../../components/Form/FloatingLabelTextInput'
import DraftEditor from '../../components/Editor/DraftEditor'

const TestingForm = () => {
    const [title, setTitle] = useState('')
    return (
        <div className="flex justify-center bg-[#dddddd]">
            <div className="rounded-3xl p-4 mb-4 bg-white shadow-md flex flex-col w-[640px]">
                <div className="flex flex-row justify-between items-center mb-4">
                    <h1>Create new Post</h1>
                </div>
                <FloatingLabelTextInput limit={300} placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} required={true} />
                <div className="rounded-3xl border bg-gray-50 border-gray-300">
                    <DraftEditor />
                </div>
            </div>
        </div>
    )
}

export default TestingForm