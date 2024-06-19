import React, { useContext, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import InputText from '../../components/Form/InputText'
import Button from '../../components/Form/Button'
import { UserContext } from '../../contexts/UserContext'
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

const Register = () => {
    const { setUser } = useContext(UserContext)
    const [usernameAvailable, setUsernameAvailable] = useState(false)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    const alert = useAlert()

    let isActive = validateEmail(email) && (password != '' && password != null) && usernameAvailable

    const submitRegister = async () => {
        try {
            let response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/register`, {
                username: username,
                email: email,
                password: password
            })
            alert.success('Register succeess')
            sessionStorage.setItem('api_key', response.data.token)
            setUser(response.data.user)
            navigate('/activate')
        } catch (error) {
            alert.error('Registration Error!')
        }
    }

    const checkAvailability = async () => {
        try {
            let response = (await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/check_username`, { username: username })).data.data
            setUsernameAvailable(response.value)
        } catch (error) {

        }
    }

    return (
        <section className="bg-[#ebebeb] dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Create ChatterNest account
                        </h1>
                        <InputText
                            onBlur={checkAvailability}
                            value={username}
                            type='text'
                            onChange={e => setUsername(e.target.value.replace(/\s/g, ''))}
                            label='Username'
                            placeholder='John'
                            other={username && usernameAvailable ?
                                <span className='-mb-2 text-xs text-green-400 flex flex-row items-center'>
                                    <FaCheckCircle className='mr-2' />
                                    <h1>Username is available</h1>
                                </span>
                                : username != '' ?
                                    <span className='-mb-2 text-xs text-red-600 flex flex-row items-center'>
                                        <FaTimesCircle className='mr-2' />
                                        <h1>Username is not available!</h1>
                                    </span> : null
                            } />

                        <InputText
                            value={email}
                            type='email'
                            onChange={e => setEmail(e.target.value)}
                            label='Email'
                            placeholder='your-mail@mail.com' />
                        <InputText
                            value={password}
                            type='password'
                            onChange={e => setPassword(e.target.value)}
                            label='Password'
                            placeholder='••••••••' />
                        <Button disabled={!isActive} title='Register' onClick={submitRegister} />
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Have an account already? <Link to='/login'><span className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register