import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const [submitting, setSubmitting] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        try {
            let response = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/auth/login`, { email, password });
            sessionStorage.setItem('api_key', response.data.token);
            setUser(response.data.user);
            // navigate somewhere
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
        console.log('Login submitted:', email, password);
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <label>Email:</label>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                <br />
                <label>Password:</label>
                <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <br />
                <a href="/ForgetPassword"><legend id="forgot-pass">Forgot password?</legend></a>
                <button type="submit">Login</button>
                <p>or continue with <a href="#">Google</a></p>
                <p>Don't have an account? <Link to="/register"><a href="/register">Register</a> </Link> </p>
            </form>
            <p>By clicking continue, you agree to our Terms of Service and Privacy Policy</p>
        </div>
    );
};

export default Login;