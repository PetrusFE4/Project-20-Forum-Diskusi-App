import React from "react";
import useSWR from "swr";
import axiosInstance from "../../lib/axiosInstance";
import { Link } from "react-router-dom";
import Button from "../../components/Form/Button";

function Communities() {
    document.title = 'ChatterNest - Community'
    const { data, error, isLoading } = useSWR('/communities', url => axiosInstance.get(url).then(res => res.data))

    return (
        <div className="container mx-auto border">
            <div className="flex justify-between items-center sticky top-0 left-0 p-2 bg-white border ">
                <div className="flex items-center">
                    <h1 className=" font-bold ml-2">Communities</h1>
                </div>
                <div className="w-fit">
                    <Link to='/create-community'>
                        <Button
                            className='max-w-40'
                            title='New Community' />
                    </Link>
                </div>
            </div>
            {!isLoading ?
                data.data.map((community, index) => (
                    <div
                        key={index}
                        className="bg-white border shadow-md p-4"
                    >
                        <Link to={`/community/${community._id}`}>
                            <div className="flex items-center mb-2">
                                <div className="">
                                    <img
                                        src={`${import.meta.env.VITE_CDN}/uploads/community/${community.profile_picture ?? 'default_profile.png'}`}
                                        className="h-6 w-6 shrink-0"
                                    />
                                </div>
                                <span className="ml-2 text-gray-500">{community.name}</span>
                            </div>
                            <p className="text-gray-700 mb-1">{community.description.length < 50 ? community.description : community.description.slice(0, 50) + ' ...'}</p>
                            <p className="text-gray-500">{community.member_count} members</p>
                        </Link>
                    </div>
                ))
                : null}
        </div>
    );
}

export default Communities;
