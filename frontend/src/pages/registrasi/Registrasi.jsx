import React, { useState } from 'react'
import axios from 'axios'
import './Registrasi.css'

function Registrasi() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        try {
            axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/register`, { username: username, email: email, password: password }).then(() => {
                console.log(aaa)
            })
        } catch (error) {

        }
        console.log('aaa')
    };

    return (
        <div className="registration-container">
            <h2>Registration an account</h2>
            <p>Enter your email to sign up for this app</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="sign-up-button">
                    <a>Sign up</a>
                </button>
            </form>
        </div>
    );
}

export default Registrasi;