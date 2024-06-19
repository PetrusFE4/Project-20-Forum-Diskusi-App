import React from 'react'

export default ({ className, title, onClick, disabled, isSecondary, type }) => {
    if (isSecondary) {
        return (
            <button disabled={disabled} onClick={onClick} className={`block ${className} w-full text-primary-900 ${!disabled ? 'outline-primary-900 outline outline-1 bg-white hover:bg-gray-950 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' : 'bg-gray-500 pointer-events-none'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}>{title}</button>
        )
    }
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={`block ${className} w-full text-white ${!disabled ? 'bg-primary-900 hover:bg-gray-950 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' : 'bg-gray-500 pointer-events-none'} focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center `}>{title}</button>
    )
}