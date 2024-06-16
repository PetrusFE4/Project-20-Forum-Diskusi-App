import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import axiosInstance from '../../lib/axiosInstance'

const DragUpload = ({ onUploadSuccess, onError }) => {
    const [uploadProgress, setUploadProgress] = useState(-1)

    const uploadFile = async (file) => {
        const formData = new FormData()
        formData.append('file', file)

        try {
            let response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (progressEvent) => {
                    const progress = Math.round(progressEvent.loaded * 100 / progressEvent.total)
                    setUploadProgress(progress)
                }
            })
            onUploadSuccess(response.data)
        } catch (error) {
            onError(error)
        } finally {
            setUploadProgress(-1)
        }
    }

    const onDrop = useCallback(acceptedFiles => {
        if (uploadProgress == -1)
            uploadFile(acceptedFiles[0])
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.bmp', '.webp'],
            'video/*': ['.mp4', '.mkv', '.avi', '.mov', '.wmv'],
        },
    })

    return (
        <div {...getRootProps()} className="p-2 bg-white w-full h-full rounded-3xl border-2 border-dashed border-gray-600 flex justify-center items-center">
            {
                uploadProgress > -1 ?
                    <div className='flex flex-col items-center justify-center'>
                        <p>Uploading ... {`(${uploadProgress}%)`}</p>
                        <div className={`bg-gray-200 w-full rounded-xl shadow-sm overflow-hidden p-1`}>
                            <div className="relative h-6 flex items-center justify-center">
                                <div className={`absolute top-0 left-0 rounded-lg transition-all h-full bg-green-400`} style={{ width: uploadProgress }}></div>
                                <div className="relative text-green-900 font-medium text-sm">{uploadProgress}%</div>
                            </div>
                        </div>
                    </div> :
                    <div className="flex flex-col">
                        <p>Drop your media file here, or click to select file</p>
                        <p className='text-xs'>jpeg, jpg, png, gif, bmp, webp, or mp4, mkv, avi, mov, wmv</p>
                    </div>
            }
            <input type="file" accept='image/*,video/*' name="" id="" {...getInputProps()} />
        </div>
    )
}

export default DragUpload