import React, { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Activation = () => {
    const { token } = useParams()

    const [success, setSuccess] = useState()

    const activate = async () => {
        try {
            const response = (await axios.post(import.meta.env.VITE_API_ENDPOINT + '/auth/activate', {
                token: token
            })).data
            window.location = '/'
        } catch (error) {
        }
    }

    useEffect(() => {
        activate()
    }, [])
    return (
        <div className="h-dvh w-dvw flex justify-center items-center">
            {!success ? <h1>Activating please wait...</h1> : <h1>Activation Success, Redirecting...</h1>}
        </div>
    )
}

export default Activation