import React from "react";

function Communities() {
    const communities = [
        {
            rank: 1,
            subreddit: "r/funny",
            title: "Funny/Humor",
            members: "60M",
        },
        {
            rank: 2,
            subreddit: "r/AskReddit",
            title: "Learning and Education",
            members: "47M",
        },
        {
            rank: 3,
            subreddit: "r/gaming",
            title: "Gaming",
            members: "41M",
        },
        {
            rank: 4,
            subreddit: "r/worldnews",
            title: "World News",
            members: "37M",
        },
        {
            rank: 5,
            subreddit: "r/todayilearned",
            title: "Learning and Education",
            members: "36M",
        },
        {
            rank: 6,
            subreddit: "r/aww",
            title: "Animals and Pets",
            members: "36M",
        },
        {
            rank: 7,
            subreddit: "r/Music",
            title: "Music",
            members: "34M",
        },
        {
            rank: 8,
            subreddit: "r/movies",
            title: "Movies",
            members: "33M",
        },
        {
            rank: 9,
            subreddit: "r/science",
            title: "Science",
            members: "32M",
        },
        {
            rank: 10,
            subreddit: "r/memes",
            title: "Internet Culture and Memes",
            members: "32M",
        },
        {
            rank: 11,
            subreddit: "r/Showerthoughts",
            title: "Funny/Humor",
            members: "31M",
        },
        {
            rank: 12,
            subreddit: "r/pics",
            title: "Art",
            members: "31M",
        },
        {
            rank: 13,
            subreddit: "r/Jokes",
            title: "Funny/Humor",
            members: "29M",
        },
        {
            rank: 14,
            subreddit: "r/news",
            title: "World News",
            members: "28M",
        },
        {
            rank: 15,
            subreddit: "r/videos",
            title: "Internet Culture and Memes",
            members: "27M",
        },
        {
            rank: 16,
            subreddit: "r/space",
            title: "Science",
            members: "26M",
        },
        {
            rank: 17,
            subreddit: "r/askscience",
            title: "Science",
            members: "25M",
        },
        {
            rank: 18,
            subreddit: "r/DIY",
            title: "Crafts and DIY",
            members: "24M",
        },
        {
            rank: 19,
            subreddit: "r/books",
            title: "Reading, Writing, and Literature",
            members: "24M",
        },
        {
            rank: 20,
            subreddit: "r/nottheonion",
            title: "Funny/Humor",
            members: "24M",
        },
        {
            rank: 21,
            subreddit: "r/EarthPorn",
            title: "Outdoors and Nature",
            members: "24M",
        },
        {
            rank: 22,
            subreddit: "r/food",
            title: "Food and Drink",
            members: "24M",
        },
        {
            rank: 23,
            subreddit: "r/mildlyinteresting",
            title: "Internet Culture and Memes",
            members: "23M",
        },
        {
            rank: 24,
            subreddit: "r/explainlikeimfive",
            title: "Learning and Education",
            members: "23M",
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <h1 className="text-2xl font-bold ml-2">Communities</h1>
                </div>
                <div className="flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="px-4 py-2 rounded-md border border-gray-300"
                    />
                </div>
            </div>
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Top Communities</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {communities.map((community) => (
                    <div
                        key={community.rank}
                        className="bg-white rounded-lg shadow-md p-4"
                    >
                        <div className="flex items-center mb-2">
                            <span className="text-lg font-bold">{community.rank}</span>
                            <div className="ml-2">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/018/930/582/non_2x/reddit-logo-reddit-icon-transparent-free-png.png"
                                    // alt={community.subreddit}
                                    className="h-6"
                                />
                            </div>
                            <span className="ml-2 text-gray-500">{community.subreddit}</span>
                        </div>
                        <p className="text-gray-700 mb-1">{community.title}</p>
                        <p className="text-gray-500">{community.members} members</p>
                    </div>
                ))}
            </div>
            <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">ChatterNest</h2>
            </div>
        </div>
    );
}

export default Communities;
