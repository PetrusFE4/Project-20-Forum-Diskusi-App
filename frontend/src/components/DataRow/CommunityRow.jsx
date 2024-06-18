import React from 'react'

const CommunityRow = ({ data }) => {
    return (
        <div className="flex flex-row p-2 items-center hover:bg-gray-200 cursor-pointer">
            <img className='h-6 w-6 rounded-full mr-1' src={data.profile_picture ? `${import.meta.env.VITE_CDN_HOST}/uploads/community/${data.profile_picture}` : 'https://www.redditstatic.com/avatars/avatar_default_02_0079D3.png'} alt="" />
            <div className="flex flex-col text-xs">
                <h1>{data.name}</h1>
                <p>{data.member_count} Members</p>
            </div>
        </div>
    )
}

export default CommunityRow