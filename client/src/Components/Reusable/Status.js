import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Ai from '../Ai/Ai';

const Status = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState('queries');
    const [aiStatus, setAiStatus] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.clear(); // Clear all stored data
        navigate('/'); // Navigate to the login page
    }

    const handleStatus = (e) => {
        setStatus(e.currentTarget.dataset.value);
        if (e.currentTarget.dataset.value === "chat") {
            setAiStatus(true);
        } else {
            setAiStatus(false);
        }
    }

    return (
        <>
            {aiStatus && <div className={`${aiStatus ? "slide-in " : "slide-out"}`}><Ai /></div>}
            <div className="main-status">
                <div className="dropup-center dropup user">
                    <button className="btn btn-secondary dropdown-toggle user-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {localStorage.getItem('userName')}
                    </button>
                    <ul className="dropdown-menu user-menu">
                        <li><a className="dropdown-item" href="#">Change UserName</a></li>
                        <li><a className="dropdown-item" href="#">Change UserPicture</a></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li><a className="dropdown-item logout" onClick={handleLogout}>LogOut</a></li>
                    </ul>
                </div>

                <div className="status-lists">
                    <ul>
                        <li className={`${status === 'queries' ? "active" : ""}`}>
                            <button data-value={'queries'} onClick={handleStatus}>
                                <span className="material-symbols-rounded">home</span>
                                <div className="text">Home</div>
                            </button>
                        </li>
                        <li className={`${status === 'ques' ? "active" : ""}`}>
                            <button data-value={'ques'} onClick={handleStatus}>
                                <span className="material-symbols-rounded">light</span>
                                <div className="text">Ques Camp</div>
                            </button>
                        </li>
                        <li className={`${status === 'chat' ? "active" : ""}`}>
                            <button onClick={handleStatus} data-value={'chat'}>
                                <span className="material-symbols-rounded">chat</span>
                                <div className="text">ChatAI</div>
                            </button>
                        </li>
                        <li className={`${status === 'public' ? "active" : ""}`}>
                            <button onClick={handleStatus} data-value={'public'}>
                                <span className="material-symbols-rounded">public</span>
                                <div className="text">Public</div>
                            </button>
                        </li>
                        <li className={`${status === 'settings' ? "active" : ""}`}>
                            <button data-value={'settings'} onClick={handleStatus}>
                                <span className="material-symbols-rounded">settings</span>
                                <div className="text">Settings</div>
                            </button>
                        </li>
                        <div className="indicator"></div>
                    </ul>
                </div>

                <div className="level">Level:1</div>
            </div>
        </>
    );
}

export default Status;
