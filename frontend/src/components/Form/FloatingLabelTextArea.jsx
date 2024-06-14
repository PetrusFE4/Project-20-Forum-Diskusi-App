import React, { useState } from 'react'

export default ({ className, type, value, onChange, placeholder, readOnly, required, limit, rows }) => {
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
            <div className={'relative p-2.5 bg-gray-50 border h-full border-gray-300 text-gray-900 sm:text-sm rounded-3xl ' + className}>
                <label className={`absolute left-5 top-4 font-light focus transition-all ${focus || value != '' ? '-translate-y-3 text-xs' : 'text-base'}`}>{placeholder}{required ? <span className='text-red-600'>*</span> : null}</label>
                {/* <input
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    readOnly={readOnly}
                    value={value}
                    onChange={onValue}
                    type={type ?? 'text'}
                    style={{ border: 'none' }}
                    className={`bg-transparent outline-none border-none focus:outline-none`} /> */}
                <textarea
                    className='px-2.5 mt-2.5 bg-transparent border-none outline-none w-full h-full'
                    value={value}
                    readOnly={readOnly}
                    onChange={onValue}
                    onFocus={() => setFocus(true)}
                    onBlur={() => setFocus(false)}
                    rows={rows}>
                        
                </textarea>
            </div>
            {limit ? <div className="flex justify-end mb-4 text-xs">
                <span>{value ? value.length : 0}/{limit}</span>
            </div> : null}
        </>
    )
}