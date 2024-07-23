import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { setSession } from './SessionService'; // Import session management functions

const Login = () => {
    const [isAdminLogin, setIsAdminLogin] = useState(true);
    const [usernameOrId, setUsernameOrId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false);
    const [countdown, setCountdown] = useState(0); // State for countdown timer
    const navigate = useNavigate();

    useEffect(() => {
        let timer;
        if (isButtonDisabled) {
            timer = setTimeout(() => {
                setIsButtonDisabled(false);
                setLoginAttempts(0);
                setPopupVisible(false);
            }, 30000); // 30 seconds
        }
        return () => clearTimeout(timer);
    }, [isButtonDisabled]);

    useEffect(() => {
        if (isButtonDisabled) {
            const timer = setInterval(() => {
                setCountdown(prev => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isButtonDisabled]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (loginAttempts >= 3) {
            setPopupVisible(true);
            setIsButtonDisabled(true);
            setCountdown(30); // Set initial countdown value
            return;
        }

        try {
            let response;
            if (isAdminLogin) {
                response = await axios.get(`http://localhost:8080/mohan/api/user/${usernameOrId}`);
            } else {
                response = await axios.get(`http://localhost:8080/mohan/api/employees/${usernameOrId}`);
            }
            const user = response.data;

            if (user && user.role === (isAdminLogin ? 'ADMIN' : 'EMPLOYEE') && user.password === password) {
                setSession(user); 
                const redirectUrl = isAdminLogin ? '/emp' : '/employeeTasks';
                navigate(redirectUrl);
            } else {
                setErrorMessage('Invalid credentials or role.');
                setLoginAttempts(prev => prev + 1);
            }
        } catch (error) {
            console.error('Login failed:', error);
            setErrorMessage('User not found or server error.');
            setLoginAttempts(prev => prev + 1);
        }
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center vh-100">
            <div className="login-box p-5 rounded shadow-lg">
                <div className="text-center mb-4">
                    <button
                        className={`btn ${isAdminLogin ? 'btn-primary' : 'btn-outline-primary'} mr-2 me-2`}
                        onClick={() => setIsAdminLogin(true)}
                    >
                        Admin Login
                    </button>
                    <button
                        className={`btn ${!isAdminLogin ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => setIsAdminLogin(false)}
                    >
                        Employee Login
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2 className="text-center mb-4">{isAdminLogin ? 'Admin Login' : 'Employee Login'}</h2>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <div className="form-group">
                        <label>{isAdminLogin ? 'Username' : 'Employee ID'}:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={usernameOrId}
                            onChange={(e) => setUsernameOrId(e.target.value)} required
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} required
                        />
                    </div>
                    <button type="submit" className="btn btn-success btn-block mt-4" disabled={isButtonDisabled}>
                        Login
                    </button>
                    {isButtonDisabled && (
                        <div className="text-center mt-2">
                            <small>Try again in {countdown} seconds</small>
                        </div>
                    )}
                </form>
            </div>

            <Modal show={popupVisible} onHide={() => setPopupVisible(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Too Many Attempts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Too many unsuccessful attempts. Please try again in 30 seconds.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setPopupVisible(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Login;
