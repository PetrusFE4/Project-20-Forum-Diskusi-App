import React from 'react'

const SortPost = ({ onSortChange }) => {
    return (
        <div className="p-2 px-4 flex flex-row bg-white shadow-md items-center justify-between border">
            <h1 className='mr-2'>Posts</h1>
            <div className="flex flex-row items-center">
                <h1 className='mr-2'>Sort</h1>
                <select className='rounded-md p-1 pl-3' onChange={onSortChange}>
                    <option value="popular">Popular</option>
                    <option value="newest">Newer</option>
                    <option value="trending">Trending</option>
                </select>
            </div>
        </div>
    )
}

export default SortPost