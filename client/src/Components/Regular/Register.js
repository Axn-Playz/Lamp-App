import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [avatar, setAvatar] = useState('per1')
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        try {
            const { data } = await axios.post("http://localhost:8000/user/register", { username, email, password, avatarCode:avatar });
            if (data.message === 'exist') {
                toast.error('🤔 User Already Exist!', {
                    position: "bottom-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    setUsername("");
                    setEmail("");
                    setPassword("");
                }, 1500);
            } else if (data.message === "notexist") {
                toast.success('✔ Account Created!', {
                    position: "bottom-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    localStorage.setItem('userName', data.user[0].username);
                    localStorage.setItem('userName', data.user[0].username);
                    localStorage.setItem('avatarCode',data.user[0].avatarCode);
                    navigate('/setUp');
                }, 1500);
            } else if (data.message === "inputField") {
                toast.error('🤔 Fill up all the details to continue!', {
                    position: "bottom-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setUsername("");
                setEmail("");
                setPassword("");
            } else {
                toast.error('🤔 Something went wrong!', {
                    position: "bottom-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setUsername("");
                setEmail("");
                setPassword("");

            }
        } catch (error) {
            console.error('Error registering user:', error);
            toast.error('🤔 Something went wrong!', {
                position: "bottom-left",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleAvatar = (e) =>{
        e.preventDefault();
        if ((e.currentTarget.dataset.value)){
            setAvatar((e.currentTarget.dataset.value));
        }
    }

    return (
        <>
            <div className="modal fade" id="signupmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
                    <div className="modal-content signup-model">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Sign Up</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='container popup'>
                                <form >
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail11" className="form-label">Username</label>
                                        <input type="text" className="form-control" id="exampleInputEmail11" aria-describedby="emailHelp"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                        <input type="password" className="form-control" id="exampleInputPassword1"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <div id="passHelp" className="form-text">We'll keep you password secured.</div>
                                    </div>

                                    <div className="mb-3 avatar-tray">
                                        {/* <div className="avatar-preview"> <img src="https://api.multiavatar.com/Binx per1.svg" alt="AVTR" /></div> */}

                                        <br />
                                        <h6> Select an Avatar : </h6>
                                        <ul>
                                            <li className={`${avatar === "per1"?"clicked-avatar":""}`}><img src={`https://api.multiavatar.com/Binx per1.svg`} alt="ava1" data-value={'per1'}  onClick={handleAvatar}/></li>
                                            <li className={`${avatar === "per2"?"clicked-avatar":""}`}><img src={`https://api.multiavatar.com/Binx per2.svg`} alt="ava2" data-value={'per2'}  onClick={handleAvatar}/></li>
                                            <li className={`${avatar === "per3"?"clicked-avatar":""}`}><img src={`https://api.multiavatar.com/Binx per3.svg`} alt="ava3" data-value={'per3'}  onClick={handleAvatar}/></li>
                                            <li className={`${avatar === "per4"?"clicked-avatar":""}`}><img src={`https://api.multiavatar.com/Binx per4.svg`} alt="ava4" data-value={'per4'}  onClick={handleAvatar}/></li>
                                            <li className={`${avatar === "per5"?"clicked-avatar":""}`}><img src={`https://api.multiavatar.com/Binx per5.svg`} alt="ava5" data-value={'per5'}  onClick={handleAvatar}/></li>
                                            <li className={`${avatar === "per6"?"clicked-avatar":""}`}><img src={`https://api.multiavatar.com/Binx per6.svg`} alt="ava6" data-value={'per6'}  onClick={handleAvatar}/></li>
                                            <li className={`${avatar === "per7"?"clicked-avatar":""}`}><img src={`https://api.multiavatar.com/Binx per7.svg`} alt="ava7" data-value={'per7'}  onClick={handleAvatar}/></li>
                                            <li className={`${avatar === "per8"?"clicked-avatar":""}`}><img src={`https://api.multiavatar.com/Binx per8.svg`} alt="ava8" data-value={'per8'}  onClick={handleAvatar}/></li>
                                            <li className={`${avatar === "per9"?"clicked-avatar":""}`}><img src={`https://api.multiavatar.com/Binx per9.svg`} alt="ava9" data-value={'per9'}  onClick={handleAvatar}/></li>
                                            <li className={`${avatar === "per0"?"clicked-avatar":""}`}><img src={`https://api.multiavatar.com/Binx per0.svg`} alt="ava0" data-value={'per0'}  onClick={handleAvatar}/></li>
                                        </ul>
                                    </div>



                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting} onClick={handleSubmit}>Proceed</button>
                                    <button type="button" className="btn btn-secondary mx-2" data-bs-dismiss="modal">Close</button>
                                </form>
                                <ToastContainer />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
