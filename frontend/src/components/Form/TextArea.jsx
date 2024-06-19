import React from 'react'

export default ({ className, label, value, onChange, placeholder }) => (
    <div className={className}>
        {label ? <label className="block mb-2 text-sm md:text-base text-gray-900 dark:text-white">{label}</label> : ''}
        <textarea
            value={value}
            rows={5}
            onChange={onChange}
            placeholder={placeholder ?? ''}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
        </textarea>
    </div>
)   