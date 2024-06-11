import React, { useState } from 'react';
import './ForgetPassword.css'; // Impor file CSS

function Forgetpassword() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log('Email:', email);

  };

  return (
    <div className="registration-container">
      <h2>Forget Your Password</h2>
      <p>Send your email to Reset Password!</p>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="sign-up-button">
          <a href="#">Reset Password</a>
        </button>
      </form>
    </div>
  );
}

export default Forgetpassword;