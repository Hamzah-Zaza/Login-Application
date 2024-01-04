// src/Card.js
import React from 'react';

const Card = ({ username }) => {
  return (
    <div className="card">
      <h3>User Card</h3>
      <ul>
        <li>Username: {username}</li>
        {/* Add other user details as needed */}
      </ul>
    </div>
  );
}; 

export default Card;
