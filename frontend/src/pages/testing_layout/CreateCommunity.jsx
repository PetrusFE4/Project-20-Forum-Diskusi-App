import React, { useEffect, useRef, useState } from 'react'
import FloatingLabelTextInput from '../../components/Form/FloatingLabelTextInput'
import FloatingLabelTextArea from '../../components/Form/FloatingLabelTextArea'
import SelectSearch from '../../components/Form/SelectSearch'
import { GoPlus } from 'react-icons/go'
import Button from '../../components/Form/Button'
import { BsCrosshair, BsTrash, BsTrash2Fill, BsX } from 'react-icons/bs'
import axiosInstance from '../../lib/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { BiImageAdd } from 'react-icons/bi'

const CreateCommunity = () => {
    const profileUpload = useRef()
    const bannerUpload = useRef()
    const navigate = useNavigate()
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

    const [profile, setProfile] = useState(null)
    const [banner, setBanner] = useState(null)


    const handleCreate = async () => {

        try {
            let res = (await axiosInstance.post('/communities', {
                name: title,
                description: description,
                keywords: keywords,
                profile_picture: profile,
                banner_picture: banner
            })).data.data
            navigate(`/community/${res._id}`)
        } catch (error) {

        }
    }

    const uploadProfile = async (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])

        try {
            let response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setProfile(response.data.filename)
        } catch (error) {
            // onError(error)
        } finally {
            // setUploadProgress(-1)
        }
    }

    const uploadBanner = async (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])

        try {
            let response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            setBanner(response.data.filename)
        } catch (error) {
            // onError(error)
        } finally {
            // setUploadProgress(-1)
        }

    }

    let isValid = title != '' && description != '' && keywords.length >= 3

    return (
        <div className="border p-4 bg-white shadow-md flex flex-col">
            <input className='hidden' type="file" ref={profileUpload} onChange={uploadProfile} />
            <input className='hidden' type="file" ref={bannerUpload} onChange={uploadBanner} />
            <div className="relative w-full aspect-[32/9]">
                <img className='w-full aspect-[32/9] object-cover' src={`${import.meta.env.VITE_CDN}/uploads${banner ? `/tmp/${banner}` : '/community/default_banner.png'}`} alt="" />
                <div onClick={() => bannerUpload.current.click()} className="cursor-pointer absolute opacity-10 md:opacity-0 md:hover:opacity-75 flex justify-center items-center top-0 left-0 z-10 w-full h-full opacity bg-white">
                    <BiImageAdd className='text-3xl' />
                </div>
            </div>
            <div className="relative flex flex-row -mb-12 md:-mb-18 lg:-mb-24 rounded-full">
                <div className="z-20 -translate-y-12 h-24 w-24 p-1 md:-translate-y-18 md:h-36 md:w-36 md:p-2 lg:-translate-y-24 lg:h-48 lg:w-48 lg:p-2 aspect-square object-cover rounded-full bg-white">
                    <img className='rounded-full w-full h-full object-cover' src={`${import.meta.env.VITE_CDN}/uploads${profile ? `/tmp/${profile}` : '/community/default_profile.png'}`} alt="" />
                    <div onClick={() => profileUpload.current.click()} className="cursor-pointer absolute opacity-10 md:opacity-0 md:hover:opacity-75 flex justify-center items-center top-0 left-0 rounded-full z-30 w-full h-full opacity bg-white">
                        <BiImageAdd className='text-3xl' />
                    </div>
                </div>
            </div>
            <h1 className='ml-2 text-gray-400 break-words text-xs'>1:1 Ratio on profile, and 32:9 ratio on banner for best result</h1>
            <div className="flex flex-row justify-between items-center mb-4 text-base">
                <h1>Create new Community</h1>
            </div>
            <div className="mb-4">
                <FloatingLabelTextInput limit={100} placeholder='Community Name' value={title} onChange={e => setTitle(e.target.value)} required={true} />
            </div>

            <div className="mb-4">
                <FloatingLabelTextArea limit={500} rows={8} placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} required={true} />
            </div>
            <SelectSearch
                data={data}
                label={<h1>Keywords (3-7)</h1>}
                required={true}
                max={7}
                trigger={
                    <GoPlus className='ml-2 cursor-pointer h-4 w-4 p-0.5 hover:bg-gray-300 rounded-full' />
                }
                selected={keywords}
                onSelect={onSelect}
            />
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
                    isSecondary={true}
                    onClick={() => navigate(-1)}
                />
                <Button
                    className='max-w-40'
                    title='Create'
                    onClick={handleCreate}
                    disabled={!isValid}
                />
            </div>
        </div>
    )
}

export default CreateCommunity