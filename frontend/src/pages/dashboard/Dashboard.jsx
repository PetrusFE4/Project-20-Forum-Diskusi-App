import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

function Dashboard() {
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isTrendsOpen, setIsTrendsOpen] = useState(false);

  const handleNotificationsClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleTrendsClick = () => {
    setIsTrendsOpen(!isTrendsOpen);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-1/4 bg-slate-200 p-4">
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7 2l-2-2m0 0l-2-2m-2 2l-2-2m2 2l2-2" />
          </svg>
          <h1 className="ml-2 text-lg font-bold text-black">Home</h1>
        </div>
        <div className="flex items-center mb-4">
        <FontAwesomeIcon className='text-black' icon={faUser} />
        <Link to="/account">
          <h1 className="ml-2 text-lg font-bold text-black">ACCOUNT</h1>
        </Link>
        </div>
        <div className="flex items-center mb-4 cursor-pointer" onClick={handleNotificationsClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 21h5m5-14H5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2zm1-10a3 3 0 10-6 0 3 3 0 006 0z" />
          </svg>
          <h1 className="ml-2 text-black font-bold text-black">Notifications</h1>
        </div>
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h1 className="ml-2 text-lg font-bold text-black">Messages</h1>
        </div>
        <div className="flex items-center mb-4">
        <FontAwesomeIcon className='text-black' icon={faFloppyDisk} />
          <h1 className="ml-2 text-lg font-bold text-black">Saved post</h1>
        </div>
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <Link to="/communities">
          <h1 className="ml-2 text-lg font-bold text-black">Communities</h1>
          </Link>
        </div>
        <Link to="/post">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Post
        </button>
        </Link>
        <div className="flex items-center mt-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c0 1.105-1.343 2-3 2s-3-.895-3-2c0-1.105 1.343-2 3-2s3 .895 3 2z" />
            </svg>
            <h1 className="ml-2 text-sm font-bold text-black">rizaldir</h1>
          </div>
          <h1 className="ml-2 text-sm font-bold text-black">@rizaldir629</h1>
          <div className="ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-3/4 bg-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-bold text-white">Notifications</h1>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.571 1.069 21.75 21.75 0 01-8.625 9.17M12 15.89l-8.222-4.672a2 2 0 00-2.22 0L12 16.244a2 2 0 002.22 0L21.778 9.836c.36-.204.768-.204 1.13 0a2 2 0 002.22 0L12 15.89z" />
            </svg>
            <input type="text" placeholder="Search" className="ml-2 bg-gray-800 text-white rounded-lg px-3 py-2 focus:outline-none focus:shadow-outline" />
          </div>
        </div>
        <div className="flex mb-4">
          <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mr-2">All</button>
          <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline mr-2">Verified</button>
          <button className="bg-gray-800 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Mentions</button>
        </div>
        <div className={`bg-gray-800 rounded-lg p-4 mb-4 ${isNotificationsOpen ? 'block' : 'hidden'}`}>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7 2l-2-2m0 0l-2-2m-2 2l-2-2m2 2l2-2" />
            </svg>
            <h1 className="ml-2 text-lg font-bold text-white">There was a login to your account @rizaldir629 from a new device on 29 May 2024. Review it now.</h1>
          </div>
          <div className="flex items-center mt-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7 2l-2-2m0 0l-2-2m-2 2l-2-2m2 2l2-2" />
            </svg>
            <h1 className="ml-2 text-lg font-bold text-white">Push notifications</h1>
          </div>
          <p className="text-gray-500 mt-2">Never miss what's happening on X by enabling push notifications</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
            Turn on notifications
          </button>
        </div>
        <div className={`bg-gray-800 rounded-lg p-4 mb-4 ${isTrendsOpen ? 'block' : 'hidden'}`}>
          <h1 className="text-lg font-bold text-white">Trends for you</h1>
          <div className="mt-4">
            <h2 className="text-gray-500 mb-1">Trending in Indonesia</h2>
            <h1 className="text-lg font-bold text-white">#Viralvideo</h1>
            <p className="text-gray-500">55.3K posts</p>
          </div>
          <div className="mt-4">
            <h2 className="text-gray-500 mb-1">Trending in Indonesia</h2>
            <h1 className="text-lg font-bold text-white">Sabrina</h1>
            <p className="text-gray-500">137K posts</p>
          </div>
          <div className="mt-4">
            <h2 className="text-gray-500 mb-1">Trending in Indonesia</h2>
            <h1 className="text-lg font-bold text-white">Bluesky</h1>
            <p className="text-gray-500">37.5K posts</p>
          </div>
          <div className="mt-4">
            <h2 className="text-gray-500 mb-1">Trending in Indonesia</h2>
            <h1 className="text-lg font-bold text-white">Asian Value</h1>
            <p className="text-gray-500">60.7K posts</p>
          </div>
          <div className="mt-4">
            <h2 className="text-gray-500 mb-1">Trending in Indonesia</h2>
            <h1 className="text-lg font-bold text-white">Plaza Indonesia</h1>
            <p className="text-gray-500">9,285 posts</p>
          </div>
          <div className="mt-4">
            <h2 className="text-gray-500 mb-1">Trending in Indonesia</h2>
            <h1 className="text-lg font-bold text-white">Sukolilo</h1>
            <p className="text-gray-500">11.6K posts</p>
          </div>
        </div>
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7 2l-2-2m0 0l-2-2m-2 2l-2-2m2 2l2-2" />
          </svg>
          <button className="ml-2 bg-gray-800 text-gray-500 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline" onClick={handleTrendsClick}>Trends</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;