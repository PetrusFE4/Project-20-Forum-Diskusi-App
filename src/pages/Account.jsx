import React from 'react';

function Account() {
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/4 p-8 bg-white shadow-md">
        <div className="flex items-center mb-6">
          <img src="https://i.pravatar.cc/100" alt="Profile Picture" className="w-12 h-12 rounded-full" />
          <div className="ml-4">
            <h2 className="text-lg font-bold">Helena</h2>
          </div>
        </div>
        <ul className="space-y-4">
          <li className="flex items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 4a1 1 0 011-1v-4a1 1 0 011 1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4" /></svg>
            <span className="ml-2 text-gray-700">Account</span>
          </li>
          <li className="flex items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 4a1 1 0 011-1v-4a1 1 0 011 1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4" /></svg>
            <span className="ml-2 text-gray-700">Home</span>
          </li>
          <li className="flex items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            <span className="ml-2 text-gray-700">Search</span>
          </li>
          <li className="flex items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L5 21h-2v-1h2m2-13a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10 10 10 0 00-10-10zm-.012 12a.906.906 0 01.905-.905V7.029c.153 0 .304.05.437.142.222.179.431.552.598 1.065l.346 1.014A.905.905 0 0120 12.984h.012" /></svg>
            <span className="ml-2 text-gray-700">Notifications</span>
          </li>
          <li className="flex items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m7 8h10M7 16h10M7 20h10" /></svg>
            <span className="ml-2 text-gray-700">Saved posts</span>
          </li>
          <li className="flex items-center">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c-2.454 0-5.405.038-8 4-2.54 3.963-3.994 9.171-4 12v2m0 0H0V0h21v2M5 8c0 1.306.038 2.607.1 4 1.038.743 2.084 1.45 3.325 1.968 1.193.495 2.52 1.04 4 1.545 1.368.495 2.77 1.04 4 1.545 1.262.503 2.625 1.04 4 1.545 1.351.503 2.717 1.04 4 1.545 1.35.503 2.72 1.04 4 1.545 1.37.503 2.74 1.04 4 1.545 1.26.503 2.63 1.04 4 1.545 1.36.503 2.73 1.04 4 1.545 1.35.503 2.72 1.04 4 1.545 1.35.503 2.72 1.04 4 1.545 1.36.503 2.73 1.04 4 1.545 1.34.503 2.68 1.04 4 1.545 1.35.503 2.72 1.04 4 1.545" /></svg>
            <span className="ml-2 text-gray-700">Messages</span>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-8 bg-white shadow-md">
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
    </div>
  );
}

export default Account;
