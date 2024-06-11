import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Post() {
  const [tweet, setTweet] = useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setTweet(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic untuk mengirim tweet (misalnya, ke API Twitter)
    console.log('Tweet:', tweet);
    setTweet(''); // Mengosongkan kotak input setelah mengirim tweet
  };

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-2 cursor-pointer">Drafts</span>
            <span className="mr-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2a1 1 0 002 0v-2zm-1 9a1 1 0 10-2 0v2a1 1 0 002 0v-2z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>
          <span className="cursor-pointer" onClick={handleClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </div>

        <div className="mt-4 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-gray-500"></div>
            <div className="ml-4">
              <textarea
                className="w-full resize-none rounded-md border border-gray-700 p-2 focus:outline-none"
                placeholder="What is happening?!"
                value={tweet}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex items-center">
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2a1 1 0 002 0v-2zm-1 9a1 1 0 10-2 0v2a1 1 0 002 0v-2z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10.88 3.1A9.955 9.955 0 0118 10c0 4.42-3.322 8.084-7.91 9.999L10 17l-4.99 2.118A9.954 9.954 0 011.12 10c0-4.42 3.322-8.084 7.91-9.999L10 3l4.99-2.118z"
                  />
                </svg>
              </span>
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0v2a1 1 0 012 0V6z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476 6 6 0 01-10.89 3.476A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <span className="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.5 5.5a.5.5 0 00-1 0v7a.5.5 0 001 0v-7zm3 0a.5.5 0 00-1 0v7a.5.5 0 001 0v-7zm3 0a.5.5 0 00-1 0v7a.5.5 0 001 0v-7z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>           
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={handleSubmit}>
              Post
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-500">Everyone can reply</p>
        </div>
      </div>
    </div>
  );
}

export default Post;
