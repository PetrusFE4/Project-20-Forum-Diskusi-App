import React from 'react'
import { BsXLg } from 'react-icons/bs'
import { GoCheckCircleFill, GoXCircleFill } from 'react-icons/go'

const AlertTemplate = ({ style, options, message, close }) => {
    return (
        <div style={style} className="bg-primary-900 flex flex-row w-fit h-fit items-center p-4 rounded-md shadow-md font-[Poppins] text-white">
            {options.type === 'info' && '!'}
            {options.type === 'success' && <GoCheckCircleFill className='text-2xl mr-4' color='green' />}
            {options.type === 'error' && <GoXCircleFill className='text-2xl pr-4' color='red' />}
            {message}
            <button className='ml-4' onClick={close}><BsXLg /></button>
        </div>
    )
}

export default AlertTemplate