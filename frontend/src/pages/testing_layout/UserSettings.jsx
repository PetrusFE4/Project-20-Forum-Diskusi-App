import React, { useContext, useEffect, useRef, useState } from 'react'
import FloatingLabelTextInput from '../../components/Form/FloatingLabelTextInput'
import FloatingLabelTextArea from '../../components/Form/FloatingLabelTextArea'
import SelectSearch from '../../components/Form/SelectSearch'
import { GoPlus } from 'react-icons/go'
import Button from '../../components/Form/Button'
import { BsCrosshair, BsTrash, BsTrash2Fill, BsX } from 'react-icons/bs'
import axiosInstance from '../../lib/axiosInstance'
import { useNavigate, useParams } from 'react-router-dom'
import { BiImageAdd } from 'react-icons/bi'
import { UserContext } from '../../contexts/UserContext'
import { useAlert } from 'react-alert'
import InputText from '../../components/Form/InputText'
import TextArea from '../../components/Form/TextArea'


const UserSettings = () => {
    const alert = useAlert()
    const { user } = useContext(UserContext)
    const profileUpload = useRef()
    const bannerUpload = useRef()
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')

    const [password, setPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [oldProfile, setOldProfile] = useState(null)
    const [oldBanner, setOldBanner] = useState(null)

    const [profile, setProfile] = useState(null)
    const [banner, setBanner] = useState(null)
    const [creator, setCreator] = useState(-1)


    const handleCreate = async () => {
        try {
            let res = (await axiosInstance.put(`/auth/update`, {
                email: email,
                bio: bio,
                password: password,
                newPassword: newPassword && newPassword != '' ? newPassword : null,
                profile_picture: profile,
                banner_picture: banner
            })).data.data
            // navigate(`/community/${community_id}`)
            alert.success('Changes saved')
        } catch (error) {
            console.log(error)
            alert.error(error.response.data.message)
        }
    }

    const getCommunity = async () => {
        if (!user)
            return
        try {
            const post = (await axiosInstance.get(`/users/${user._id}`)).data.data
            setUsername(post.username)
            setEmail(post.email)
            setBio(post.bio)
            setOldBanner(post.banner_picture)
            setOldProfile(post.profile_picture)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCommunity()
    }, [])

    const uploadProfile = async (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])

        try {
            let response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            alert.success('Uploaded')
            setProfile(response.data.filename)
        } catch (error) {
            alert.error('Upload Error')
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
            alert.success('Uploaded')
            setBanner(response.data.filename)
        } catch (error) {
            alert.error('Upload Error')
        } finally {
            // setUploadProgress(-1)
        }

    }
    return (
        <div className="p-2 border">
            <input className='hidden' type="file" ref={profileUpload} onChange={uploadProfile} accept="image/*" />
            <input className='hidden' type="file" ref={bannerUpload} onChange={uploadBanner} accept="image/*" />
            <div className="relative w-full aspect-[32/9]">
                <img className='w-full aspect-[32/9] object-cover' src={`${import.meta.env.VITE_CDN}/uploads${banner ? `/tmp/${banner}` : oldBanner ? `/user/${oldBanner}` : '/user/default_banner.png'}`} alt="" />
                <div onClick={() => bannerUpload.current.click()} className="cursor-pointer absolute opacity-10 md:opacity-0 md:hover:opacity-75 flex justify-center items-center top-0 left-0 z-10 w-full h-full opacity bg-white">
                    <BiImageAdd className='text-3xl' />
                </div>
            </div>
            <div className="relative flex flex-row -mb-12 md:-mb-18 lg:-mb-24 rounded-full">
                <div className="z-20 -translate-y-12 h-24 w-24 p-1 md:-translate-y-18 md:h-36 md:w-36 md:p-2 lg:-translate-y-24 lg:h-48 lg:w-48 lg:p-2 aspect-square object-cover rounded-full bg-white">
                    <img className='rounded-full w-full h-full object-cover' src={`${import.meta.env.VITE_CDN}/uploads${profile ? `/tmp/${profile}` : oldProfile ? `/user/${oldProfile}` : '/user/default_profile.png'}`} alt="" />
                    <div onClick={() => profileUpload.current.click()} className="cursor-pointer absolute opacity-10 md:opacity-0 md:hover:opacity-75 flex justify-center items-center top-0 left-0 rounded-full z-30 w-full h-full opacity bg-white">
                        <BiImageAdd className='text-3xl' />
                    </div>
                </div>
            </div>
            <h1 className='ml-2 text-gray-400 break-words text-xs'>1:1 Ratio on profile, and 32:9 ratio on banner for best result</h1>
            <div className="mt-4 flex flex-row justify-between items-center mb-4 text-base">
                <h1>Edit Profile</h1>
            </div>

            <div className="mb-4 ">
                <InputText label='Username' value={username} readOnly={true} />
            </div>
            <div className="mb-4">
                <InputText  required={true} type='email' label='Email' value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="mb-4">
                <TextArea label={'Bio'} value={bio} onChange={e => setBio(e.target.value)} />
            </div>
            <div className="mb-4">
                <InputText required={true} type='password'  label='Password' value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="mb-4">
                <InputText type='password' label='New Password' value={newPassword} onChange={e => setNewPassword(e.target.value)} />
            </div>
            <Button title={'Save'} onClick={handleCreate} />
        </div>
    )

}

export default UserSettings