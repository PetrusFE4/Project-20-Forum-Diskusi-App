import React, { useRef, useState, useEffect } from 'react'

const SelectSearch = ({ label, trigger, data, onSelect, selected, required, max }) => {
    const ref = useRef()
    const [active, setActive] = useState(false)
    const [search, setSearch] = useState('')

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

    // let selection = data.filter(item => selected.indexOf(item) < 0)

    const idsInArray = new Set(selected.map(item => item._id));

    // Langkah 2: Filter array2
    let selection = data.filter(item => !idsInArray.has(item._id));

    if (search != '')
        selection = selection.filter(item => item.name.search(search) != -1)

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
                <input value={search} onChange={e => setSearch(e.target.value)} id="search-input" className="sticky w-full px-4 py-2 text-gray-800 border rounded-md  border-gray-300 focus:outline-none" type="text" placeholder="Search items" autocomplete="off" />
                <div className="overflow-y-auto max-h-64">
                    {/* {search != '' ? selection.filter(item => item.name.search(search) != -1).map((item, index) => (
                        <div key={index} onClick={() => onClick(item)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">{item.name}</div>
                    )) : */}
                    {
                        selection.map((item, index) => (
                            <div key={index} onClick={() => onClick(item)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer rounded-md">{item.name}</div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default SelectSearch