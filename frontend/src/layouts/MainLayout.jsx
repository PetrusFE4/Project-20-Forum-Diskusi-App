import React, { useEffect, useContext, useState } from 'react'
import { UserContext } from '../contexts/UserContext'
import { useNavigate } from 'react-router-dom'
import useSessionStorage from '../lib/useSessionStorage'
import axiosInstance from '../lib/axiosInstance'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Botbar from '../components/Botbar'
import Topbar from '../components/Topbar'
import SideSection from './SideSection'
import { io } from 'socket.io-client'
import { NotificationProvider } from '../contexts/NotificationContext'
import { useAlert } from 'react-alert'

const MainLayout = () => {
    const navigate = useNavigate()
    const apiKey = useSessionStorage('api_key')
    const { user, setUser } = useContext(UserContext)
    const [notification, setNotification] = useState([])
    const alert = useAlert()

    const getNotification = async () => {
        try {
            const response = (await axiosInstance.get('/notifications')).data.data
            setNotification(response)
        } catch (error) {

        }
    }

    useEffect(() => {
        getNotification()
    }, [])

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

    useEffect(() => {
        if (!user)
            return

        if (user.activated == false)
            navigate('/activate')
    }, [user])

    useEffect(() => {

        const socket = io(import.meta.env.VITE_WS, {
            query: { token: apiKey }
        });

        socket.on('new_notification', (notification) => {
            const not = JSON.parse(notification)
            console.log(`New Notification : ${not}`)
            axiosInstance.get('/notifications/' + (not.id ? not.id : not._id)).then(res => {
                setNotification(prev => [res.data.data, ...prev]);
                alert.info(res.data.data.message)
            }).catch(error => console.log(error))
        });

        return () => {
            socket.off('new_notification')
            socket.disconnect()
        }
    }, [])

    return (
        <NotificationProvider notification={notification} setNotification={setNotification}>
            <div className='h-screen w-screen flex overflow-y-auto'>
                <div className='hidden md:block fixed w-64 h-screen overflow-y-auto shadow-md border-r'>
                    <Sidebar notification={notification} />
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
        </NotificationProvider>
    )
}

export default MainLayout