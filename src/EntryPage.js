import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EntryPage.css';
import MainLogo from './PolitiGoLogo.jpg';

function EntryPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setErrorMessage('Username and Password cannot be empty. Please try again');
            return;
        }
        if (!localStorage.getItem(username)) {
            setErrorMessage('User does not exist. Please try again');
            return;
        }
        let passwordlS = localStorage.getItem(username);
        if (password === passwordlS) {
            navigate('/cityselection');
        }
        else {
            setErrorMessage('Wrong Username/Password. Please try again');
        }
    };

    const handleSignup = () => navigate('/signup');

    return (
        <div className="entry-container">
            <img  src={MainLogo} width={512} height={227} alt="fireSpot"/>
            <p>Soon there will be more here...</p>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="login-input"
                />
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                />
                <button type="submit" className="login-button">Login</button>
                {errorMessage && <p className="error-message">{errorMessage}</p> }
            </form>
            <button className="signup-button" onClick={handleSignup}><span className="signup-link">New User? Sign up here!</span></button>
        </div>
    );
}
export default EntryPage;