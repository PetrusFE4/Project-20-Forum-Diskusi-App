import React from 'react'

const UserSettings = () => {
    <div className="p-2 border">
        <h1 className="text-2xl font-bold mb-4">Edit profile</h1>
        <div className="mb-4">
            <div className="flex items-center mb-2">
                <img src="https://i.pravatar.cc/100" alt="Profile Picture" className="w-12 h-12 rounded-full" />
                <div className="ml-4">
                    <h2 className="text-lg font-bold">Helena Hills</h2>
                    <p className="text-gray-500">Change profile photo</p>
                </div>
            </div>
        </div>
        <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
            <input type="text" id="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="@username123" />
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="email@domain.com" />
        </div>
        <div className="mb-4">
            <label htmlFor="urls" className="block text-gray-700 text-sm font-bold mb-2">URLs</label>
            <div className="space-y-2">
                <input type="text" id="website.net" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="website.net" />
                <input type="text" id="website.place" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="website.place" />
                <input type="text" id="website.town" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="website.town" />
            </div>
        </div>
        <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-700 text-sm font-bold mb-2">Bio</label>
            <textarea id="bio" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="I am a designer based in Philadelphia, making great software at Figma."></textarea>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Save changes</button>
    </div>
}