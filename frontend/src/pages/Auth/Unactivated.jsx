import React, { useEffect, useState } from 'react'
import axiosInstance from '../../lib/axiosInstance'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Unactivated = () => {

    return (
        <div className="h-dvh w-dvw flex justify-center items-center">
            <h1>Please activate your account through the email address associated with this account.</h1>
        </div>
    )
}

export default Unactivated