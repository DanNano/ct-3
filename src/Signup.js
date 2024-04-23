import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import MainLogo from './PolitiGoLogo.jpg';


function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const GatherInfo = (e) => {
        e.preventDefault();
        if (username === '' || password === '') {
            setErrorMessage('Username and Password cannot be empty');
            return;
        }
        if (localStorage[username]) {
            setErrorMessage('User already exists. Please try again');
            return;
        }
        localStorage[username] = password;
        navigate('/');
    };

    const BackToLogin = () => navigate('/');

    return (
        <div className="entry-container">
            <img  src={MainLogo} width={512} height={227} alt="fireSpot"/>
            <p>This is the sign up page, where you can create a new account.</p>
            <p>Simply enter your desired username and password, then click Sign Up.</p>
            <form onSubmit={GatherInfo} className="login-form">
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
                <button type="submit" className="login-button">Sign Up</button>
                {errorMessage && <p className="error-message">{errorMessage}</p> }
            </form>
            <button className="signup-button" onClick={BackToLogin}><span className="signup-link">Misclicked? Click here to go back!</span></button>
            </div>
    );
}

export default Signup;