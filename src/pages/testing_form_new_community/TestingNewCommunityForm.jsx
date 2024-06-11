import React, { useState } from 'react'
import FloatingLabelTextInput from '../../components/Form/FloatingLabelTextInput'
import FloatingLabelTextArea from '../../components/Form/FloatingLabelTextArea'
import SelectSearch from '../../components/Form/SelectSearch'
import { GoPlus } from 'react-icons/go'
import Button from '../../components/Form/Button'
import { BsCrosshair, BsTrash, BsTrash2Fill, BsX } from 'react-icons/bs'

const TestingNewCommunityForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [keywords, setKeywords] = useState([])
    const [data, setData] = useState([
        { name: "Technology" },
        { name: "Jokes" },
        { name: "Education" },
        { name: "Gaming" },
        { name: "News" },
        { name: "Music" },
        { name: "Movies" },
        { name: "Books" },
        { name: "Science" },
        { name: "Sports" },
        { name: "Memes" },
        { name: "Art" },
        { name: "Food" },
        { name: "Travel" },
        { name: "Fitness" },
        { name: "DIY" },
        { name: "Photography" },
        { name: "Ask Me Anything" },
        { name: "Politics" },
        { name: "History" },
        { name: "Finance" },
        { name: "Programming" },
        { name: "Health" },
        { name: "Fashion" },
        { name: "Parenting" },
        { name: "Space" },
        { name: "Anime" },
        { name: "Nature" },
        { name: "Relationships" },
        { name: "Pets" },
        { name: "Cryptocurrency" },
        { name: "Personal Finance" },
        { name: "Startups" },
        { name: "Investing" },
        { name: "Cars" },
        { name: "TV Shows" },
        { name: "Comics" },
        { name: "Humor" },
        { name: "Beauty" },
        { name: "Skincare" },
        { name: "Meditation" },
        { name: "Mindfulness" },
        { name: "Writing" },
        { name: "Poetry" },
        { name: "Gardening" },
        { name: "Home Improvement" },
        { name: "Interior Design" },
        { name: "Crafts" },
        { name: "Career" },
        { name: "Productivity" },
        { name: "Entrepreneurship" },
        { name: "Mental Health" },
        { name: "Vegan" },
        { name: "Keto" },
        { name: "Fantasy" },
        { name: "Horror" },
        { name: "Sustainability" },
        { name: "Minimalism" },
        { name: "Cooking" },
        { name: "Baking" },
        { name: "Photography" },
        { name: "Videography" },
        { name: "Marketing" },
        { name: "Freelancing" },
        { name: "Social Media" },
        { name: "UX/UI Design" },
        { name: "Web Development" },
        { name: "Blockchain" },
        { name: "Artificial Intelligence" },
        { name: "Virtual Reality" },
        { name: "Augmented Reality" },
        { name: "Robotics" },
        { name: "3D Printing" },
        { name: "eSports" },
        { name: "Language Learning" },
        { name: "Puzzles" },
        { name: "Board Games" },
        { name: "Card Games" },
        { name: "Travel Hacks" },
        { name: "Road Trips" },
        { name: "Urban Exploration" },
        { name: "Mythology" },
        { name: "Astronomy" },
        { name: "Geopolitics" },
        { name: "Sociology" },
        { name: "Anthropology" },
        { name: "Philosophy" },
        { name: "Ethics" },
        { name: "Legal Advice" },
        { name: "Real Estate" },
        { name: "Environmental Science" },
        { name: "Renewable Energy" },
        { name: "Wildlife" },
        { name: "Marine Biology" },
        { name: "Astrobiology" },
        { name: "Graphic Design" },
        { name: "Illustration" },
        { name: "Animation" },
        { name: "Theater" },
        { name: "Dance" }
    ])

    const onSelect = (item) => {
        setKeywords(prev => [...prev, item])
    }

    return (
        <div className="flex justify-center bg-[#dddddd]">
            <div className="rounded-3xl p-4 mb-4 bg-white shadow-md flex flex-col w-[640px]">
                <div className="flex flex-row justify-between items-center mb-4 text-base">
                    <h1>Create new Community</h1>
                </div>
                <FloatingLabelTextInput limit={100} placeholder='Community Name' value={title} onChange={e => setTitle(e.target.value)} required={true} />
                <FloatingLabelTextArea limit={500} rows={8} placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} required={true} />
                <SelectSearch
                    data={data}
                    label={
                        <h1>Keywords (3-7)</h1>
                    }
                    required={true}
                    max={7}
                    trigger={
                        <GoPlus className='ml-2 cursor-pointer h-4 w-4 p-0.5 hover:bg-gray-300 rounded-full' />
                    }
                    selected={keywords}
                    onSelect={onSelect} />
                <div className='flex flex-wrap'>
                    {keywords.length > 0 ? keywords.map((item, index) => (
                        <div key={index} className='m-1 p-2 group flex flex-row justify-center items-center bg-primary-900 rounded-full'>
                            <div className='text-sm text-white w-fit'>{item.name}</div>
                            <div className='hidden group-hover:block ml-1 cursor-pointer' onClick={() => setKeywords(prev => prev.filter(each => each != item))}>
                                <BsX color='white' />
                            </div>
                        </div>
                    )) : null}
                </div>
                <div className="flex flex-row p-2 justify-end">
                    <Button
                        className='max-w-40 mr-4'
                        title='Cancel'
                    />
                    <Button
                        className='max-w-40'
                        title='Create'
                    />
                </div>
            </div>
        </div>
    )
}

export default TestingNewCommunityForm