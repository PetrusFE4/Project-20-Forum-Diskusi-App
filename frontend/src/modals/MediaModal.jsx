import React, { useContext, useState } from 'react'
import { ModalContext } from '../contexts/ModalContext'
import { BsChevronLeft, BsChevronRight, BsXLg } from 'react-icons/bs'

const MediaModal = ({ media }) => {
    const { hideModal } = useContext(ModalContext)
    const [index, setIndex] = useState(0)

    const handleNext = () => {
        setIndex(prev => {
            if (index == media.length - 1)
                return prev
            return prev + 1
        })
    }

    const handlePrev = () => {
        setIndex(prev => {
            if (index == 0)
                return prev
            return prev - 1
        })
    }

    return (
        <div className="relative w-full h-full flex flex-row p-2 md:p-8 justify-center items-center">
            <div onClick={hideModal} className="absolute cursor-pointer top-8 right-8 h-8 w-8 bg-white hover:bg-gray-200 bg-opacity-10 flex items-center justify-center rounded-full">
                <BsXLg className='' />
            </div>
            <div onClick={handlePrev} className="absolute cursor-pointer top-0 left-0 h-full w-8 hover:bg-gray-200 bg-opacity-50 flex items-center justify-center">
                <BsChevronLeft className='' />
            </div>
            <img className='object-fill max-w-full max-h-full' src={import.meta.env.VITE_CDN + 'uploads/post/' + media[index].file} alt="" />
            <div onClick={handleNext} className="absolute cursor-pointer top-0 right-0 h-full w-8 hover:bg-gray-200 bg-opacity-10 flex items-center justify-center">
                <BsChevronRight className='' />
            </div>
        </div>
    )
}

export default MediaModal