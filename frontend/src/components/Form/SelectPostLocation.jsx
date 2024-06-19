import React, { useRef, useState, useEffect, useContext } from 'react'
import { UserContext } from '../../contexts/UserContext'

const SelectPostLocation = ({ label, trigger, data, onSelect, required }) => {
    const ref = useRef()
    const [active, setActive] = useState(false)
    const { user } = useContext(UserContext)

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
        onSelect(item)
    }

    return (
        <div ref={ref} className="relative group">
            <div className="flex-col">
                <div className="ml-5 flex flex-row items-center">
                    {label}
                    {required ? <span className='text-red-600'>*</span> : null}
                </div>
                <div className='w-fit' onClick={() => setActive(prev => !prev)}>
                    {trigger}
                </div>
            </div>
            <div className={`${active ? '' : 'hidden'} absolute left-0 mt-2 rounded-3xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-4 p-1 space-y-1 z-10`}>
                <div className="overflow-y-auto max-h-64">
                    {user ?
                        <div onClick={() => onClick(null)} className="flex flex-row items-center px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                            <img className='h-8 w-8 rounded-full' src={`${import.meta.env.VITE_CDN}/uploads/user/${user.profile_picture ?? 'default_profile.png'}`} />
                            <h1>Your profile</h1>
                        </div>
                        : null}
                    {data.map((item, index) => (
                        <div key={index} onClick={() => onClick(item)} className="flex flex-row items-center px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">
                            <img className='h-8 w-8 rounded-full' src={`${import.meta.env.VITE_CDN}/uploads/community/${item.profile_picture ?? 'default_profile.png'}`} />
                            <h1>{item.name}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SelectPostLocation