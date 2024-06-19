import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAlert } from 'react-alert'
import InputText from '../../components/Form/InputText'
import Button from '../../components/Form/Button'
import { UserContext } from '../../contexts/UserContext'

const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  }

const Login = () => {
    const [email, setEmail] = useState(null)
    const { setUser } = useContext(UserContext)
    const [password, setPassword] = useState(null)
    const navigate = useNavigate()
    const alert = useAlert()

    let isActive = validateEmail(email) && (password != '' && password != null)

    const submitLogin = async () => {
        try {
            let response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/login`, {
                email: email,
                password: password
            })
            alert.success('Login succeess')
            sessionStorage.setItem('api_key', response.data.token)
            setUser(response.data.user)
            navigate('/')
        } catch (error) {
            alert.error('Email or password is incorrect.')
        }
    }

    return (
        <section className="bg-[#ebebeb] dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Log in to your account
                        </h1>
                        <InputText
                            value={email}
                            type='email'
                            onChange={e => setEmail(e.target.value)}
                            label='Email'
                            placeholder='youremail@mail.com' />
                        <InputText
                            value={password}
                            type='password'
                            onChange={e => setPassword(e.target.value)}
                            label='Password'
                            placeholder='••••••••' />
                        <Button disabled={!isActive}  title='Sign in' onClick={submitLogin} />
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account yet? <Link to='/register'><span className="font-medium text-primary-600 hover:underline dark:text-primary-500">Register</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login