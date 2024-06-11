import React, { useState } from 'react';
import './Registrasi.css'; // Impor file CSS

function Registrasi() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Tambahkan logika untuk memproses data registrasi
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);
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
          <a href="/login">Sign up</a>
        </button>
      </form>
      <p className="continue-with">or continue with</p>
      <button className="google-button">
        <img src="/path/to/google-logo.png" alt="Google Logo" />
        Google
      </button>
      <p className="terms-of-service">
        By clicking continue, you agree to our{' '}
        <a href="#">Terms of Service</a> and{' '}
        <a href="#">Privacy Policy</a>
      </p>
    </div>
  );
}

export default Registrasi;