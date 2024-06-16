import React, { useRef, useState, useEffect } from 'react'

const SelectPostLocation = ({ label, trigger, data, onSelect, selected, required, max }) => {
    const ref = useRef()
    const [active, setActive] = useState(false)

    useEffect(() => {
        const handler = event => {
            if (!ref.current?.contains(event.target)) {
                setActive(false)
            }
        }

        if (active == true)
            window.addEventListener('click', handler)

        return () => {
            window.removeEventListener('click', handler)
        }
    }, [active])

    const onClick = (item) => {
        if (selected.length < max)
            onSelect(item)
    }

    return (
        <div ref={ref} className="relative group">
            <div className="flex flex-row items-center">
                {label}
                {required ? <span className='text-red-600'>*</span> : null}
                <div onClick={() => setActive(prev => !prev)}>
                    {trigger}
                </div>
            </div>
            <div className={`${active ? '' : 'hidden'} absolute left-0 mt-2 rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-4 p-1 space-y-1`}>
                <div className="overflow-y-auto max-h-64">
                    {data.filter(item => selected.indexOf(item) < 0).map((item, index) => (
                        <div key={index} onClick={() => onClick(item)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                            <img src='https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png' />
                            {item.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectPostLocation