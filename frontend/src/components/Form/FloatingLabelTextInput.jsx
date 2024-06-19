import React, { useState } from 'react'

export default ({ className, autoFocus, type, value, onChange, placeholder, readOnly, required, limit }) => {
    const [focus, setFocus] = useState(false)

    const onValue = (e) => {
        console.log(e.target.value.length)
        if (!limit) {
            onChange(e)
            return
        }

        if (e.target.value.length > limit)
            return
        onChange(e)

    }
    return (
        <>
            <div className={'relative p-2.5 h-fit bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-3xl ' + className}>
                <label className={`absolute pointer-events-none left-5 top-4 font-light focus transition-all ${focus || value != '' ? '-translate-y-3 text-xs' : 'text-base'}`}>{placeholder}{required ? <span className='text-red-600'>*</span> : null}</label>
                <input
                    autoFocus={autoFocus ?? false}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    readOnly={readOnly}
                    value={value}
                    onChange={onValue}
                    type={type ?? 'text'}
                    style={{ border: 'none', outline: 'none' }}
                    className={`bg-transparent border-none outline-none focus:border-none focus:outline-none ring-0 focus:ring-0`} />
            </div>
            {limit ? <div className="flex justify-end mb-4 text-xs">
                <span>{value ? value.length : 0}/{limit}</span>
            </div> : null}
        </>
    )
}