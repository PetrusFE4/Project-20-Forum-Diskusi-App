import React from 'react'

export default ({ className, title, onClick, disabled }) => (
    <button disabled={disabled} onClick={onClick} className={`block ${className} w-full text-white ${!disabled ? 'bg-primary-600 hover:bg-primary-700 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' : 'bg-gray-500 pointer-events-none'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}>{title}</button>
)