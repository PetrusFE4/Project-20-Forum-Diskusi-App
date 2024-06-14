import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import { faFloppyDisk } from '@fortawesome/free-regular-svg-icons';

function UserData() {
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
        <FontAwesomeIcon className='text-black' icon={faUser} />
        <Link to="/account">
          <h1 className="ml-2 text-lg font-bold text-black">User Posts</h1>
        </Link>
        </div>
        <div className="flex items-center mb-4 cursor-pointer" onClick={handleNotificationsClick}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.405L4 21h5m5-14H5a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2v-6a2 2 0 00-2-2zm1-10a3 3 0 10-6 0 3 3 0 006 0z" />
          </svg>
          <h1 className="ml-2 text-black font-bold text-black">User Data</h1>
        </div>
        <div className="flex items-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <h1 className="ml-2 text-lg font-bold text-black">All Reports</h1>
        </div>
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
        

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Username
                </th>
                <th scope="col" class="px-6 py-3">
                    Member Since
                </th>
                <th scope="col" class="px-6 py-3">
                    Post User
                </th>
                <th scope="col" class="px-6 py-3">
                    Time Reported
                </th>
                <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                </th>
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Ilham Maulana
                </th>
                <td class="px-6 py-4">
                    12-05-2021
                </td>
                <td class="px-6 py-4">
                    Cropto currency
                </td>
                <td class="px-6 py-4">
                    19:30
                </td>
                <td class="px-6 py-4 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>

      </div>
    </div>
  );
}

export default UserData;