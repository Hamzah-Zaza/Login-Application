// src/App.js
import React, { useState } from 'react';
import './App.css';
import Login from './login';
import CreateAccount from './createaccount';
import CardList from './CardList';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [showCardList, setShowCardList] = useState(false); // Add a state for CardList

  const toggleForm = () => {
    setShowLogin(!showLogin);
    setShowCardList(false); // Reset CardList visibility when toggling the form
  };

  const showCardListAfterLogin = () => {
    setShowCardList(true);
  };

  return (
    <div className="app-container">
      <div className="card">
        {showLogin ? (
          <Login onToggleForm={toggleForm} onLoginSuccess={showCardListAfterLogin} />
        ) : (
          <CreateAccount onToggleForm={toggleForm} />
        )}
        {showCardList && <CardList />} {/* Conditionally render CardList */}
      </div>
    </div>
  );
}

export default App;
