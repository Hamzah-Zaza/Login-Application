// src/CreateAccount.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateAccount = ({ onToggleForm,onToggleList  }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleVerifyPasswordChange = (event) => {
    setVerifyPassword(event.target.value);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
  
    try {
      // Perform password verification logic here
      if (newPassword === verifyPassword) {
        // Register the new user
        const registerResponse = await fetch('http://localhost:5000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: newUsername,
            password: newPassword,
          }),
        });
  
        if (registerResponse.ok) {
          console.log('User registered successfully!');
          onToggleForm(); // Switch back to the login form after registration
        } else {
          console.error('Error registering user:', registerResponse.statusText);
        }
      } else {
        console.error('Passwords do not match.');
      }
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };
  
  

  return (
    <>
      <h1>Create Account</h1>
      <form onSubmit={handleRegister}>
        {/* Create account form inputs */}
        <label htmlFor="newUsername">New Username</label>
        <input
          type="text"
          id="newUsername"
          name="newUsername"
          value={newUsername}
          onChange={handleUsernameChange}
        />

        <label htmlFor="newPassword">New Password</label>
        <input
          type="password"
          id="newPassword"
          name="newPassword"
          value={newPassword}
          onChange={handlePasswordChange}
        />

        <label htmlFor="verifyPassword">Verify Password</label>
        <input
          type="password"
          id="verifyPassword"
          name="verifyPassword"
          value={verifyPassword}
          onChange={handleVerifyPasswordChange}
        />

        <button type="submit">Register</button>
      </form>
      <p onClick={onToggleForm} className="toggle-link">Back to Login</p>
    </>
  );
};

export default CreateAccount;
