import React, { useState } from 'react';
import './App.css';
import Login from './login';
import CreateAccount from './createaccount';
import CardList from './CardList';

function App() {
  const [showCardList, setShowCardList] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');

  const showCardListAfterLogin = (username, room) => {
    setUsername(username);
    setRoom(room);
    setShowCardList(true);
    setIsLoggedIn(true);
  };

  const showCardListAfterCreateAccount = (selectedRoom) => {
    setShowCardList(true);
    setIsLoggedIn(true);
    setShowLogin(false);
    setRoom(selectedRoom);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowCardList(false);
  };

  const toggleForm = () => {
    setShowLogin(!showLogin);
    setShowCardList(false);
  };

  return (
    <div className="app-container">
      <div className="card">
        {isLoggedIn ? (
          <>
            {/* Removed ChatBox component */}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          showLogin ? (
            <Login onToggleForm={toggleForm} onLoginSuccess={showCardListAfterLogin} />
          ) : (
            <CreateAccount
              onToggleList={showCardListAfterCreateAccount}
              onToggleForm={toggleForm}
            />
          )
        )}
        {showCardList && !isLoggedIn && <CardList />}
      </div>
    </div>
  );
}

export default App;
