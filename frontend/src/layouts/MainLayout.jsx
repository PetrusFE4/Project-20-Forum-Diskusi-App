import React, { useEffect, useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import useSessionStorage from '../lib/useSessionStorage'
import axiosInstance from '../lib/axiosInstance'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Botbar from '../components/Botbar'
import Topbar from '../components/Topbar'
import SideSection from './SideSection'

const MainLayout = () => {
    const navigate = useNavigate()
    const apiKey = useSessionStorage('api_key')
    const { user, setUser } = useContext(UserContext)

    const getUser = async () => {
        try {
            let response = await axiosInstance.get('/auth/validate')
            setUser(response.data.data)
        } catch (error) {
            setUser(null)
            console.log(error)
        }
    }

    useEffect(() => {
        if (!apiKey)
            navigate('/login')

    }, [apiKey, navigate])

    useEffect(() => {
        if (apiKey)
            getUser()

        return (() => {
            setUser(null)
        })
    }, [])

    return (
        <div className='h-screen w-screen flex overflow-y-auto'>
            <div className='hidden md:block fixed w-64 h-screen overflow-y-auto shadow-md border-r'>
                <Sidebar />
            </div>
            <div className='block md:hidden fixed h-12 w-screen bottom-0 left-0 bg-white shadow-md'>
                <Botbar />
            </div>
            <div className='md:ml-64 md:left-64 w-full h-[calc(100dvh-96px)] mt-12 md:mt-0 md:w-[calc(100vw-256px)] md:h-dvh overflow-x-hidden bg-[#f0f0f0]'>
                {/* p-4 */}
                <div className="flex flex-row">
                    <div className="w-full lg:w-[70%]">
                        <Outlet /> {/* Isi */}
                    </div>
                    <div className="hidden lg:block sticky lg:w-[30%] top-0 right-0 h-dvh bg-white border">
                        <SideSection />
                    </div>
                </div>
            </div>
            <div className='block md:hidden fixed h-12 w-screen top-0 left-0 bg-white shadow-md'>
                <Topbar />
            </div>
        </div>
    )
}

export default MainLayout