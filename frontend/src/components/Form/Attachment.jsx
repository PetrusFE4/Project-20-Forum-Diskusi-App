import React from 'react'
import { BsXLg } from 'react-icons/bs'

const Attachment = ({ data, type, onRemoveClick }) => {
    return (
        <div className='h-fit w-full mb-2 relative rounded-3xl overflow-hidden group'>
            <div onClick={onRemoveClick} className='hidden group-hover:block cursor-pointer absolute right-2 top-2 w-8 h-8 p-2 rounded-full flex justify-center items-center bg-white hover:bg-gray-200 bg-opacity-75'>
                <BsXLg />
            </div>
            {type == 'image' ?
                <img className='h-full w-full' src={data} />
                :
                <video className='h-full w-full'>
                    <source src={data} />
                </video>}
        </div>
    )
}

export default Attachment