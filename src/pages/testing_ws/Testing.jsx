import React, { useEffect } from 'react'
import { io } from 'socket.io-client'

const Testing = () => {
    useEffect(() => {

        const socket = io('http://localhost:3000', {
            query: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjU3M2IzODE3YWVhYjEyMjA3ODg4ZTMiLCJpYXQiOjE3MTc3ODQzMTB9.PlVsoasA9dH_axYGoGxkrQMRTvv7fj9o4aatQA7n5L4" }
        });

        socket.on('new_notification', (notification) => {
            console.log(`New Notification`)
            console.log(JSON.parse(notification))
            // setNotifications((prevNotifications) => [notification, ...prevNotifications]);
        });

        return () => {
            socket.off('new_notification')
            socket.disconnect()
        }
    }, [])
}

export default Testing