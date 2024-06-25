import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import darkImg from './Images/BlackLogo.png'


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [status, setStatus] = useState('welcome');
    const [theme, setTheme] = useState("light");
    const navigate = useNavigate();
    const handleLiVal = (e) => {
        const val = e.currentTarget.dataset.value;
        setStatus(val);
    }

    const handleDarkTheme = (e) => {
        setTheme(theme === "light" ? "dark" : "light")
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("http://localhost:8000/user/login", { email, password });
            console.log(data)
            if (data.message === "exist") {
                toast.success('✔ Account Available!', {
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
                    setEmail("");
                    setPassword("");
                    console.log(data?.user.username)
                    localStorage.setItem('userName', data?.user.username);
                    localStorage.setItem('userId', data?.user._id);
                    console.log(data?.user._id)  
                    navigate('/user');
                }, 1500);
            } else if (data.message === "wrongPass") {
                toast.error('🤔Detail didnt matched!', {
                    position: "bottom-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",

                });
            }
            else {
                toast.error('🤔Account Unavailable!', {
                    position: "bottom-left",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",

                });
            }
        } catch (error) {
            console.log(error)
        }
    }
    console.log(theme)
    return (
        <>



            <div className="modal fade" id="loginmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Login</h5>
                            <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">





                            <div className="container popup">



                                <form action='post'>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail111" className="form-label">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail111" aria-describedby="emailHelp"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputPassword111" className="form-label">Password</label>
                                        <input type="password" className="form-control"
                                            aria-autocomplete="exampleInputPassword111" value={password} onChange={(e) => setPassword(e.target.value)} />
                                        <div className="mb-3">
                                            <div id="emailHelp" className="form-text">We'll never share your pasword with anyone else.</div>
                                        </div>
                                    </div>

                                <ToastContainer />
                                </form>






                            </div>

                         <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={handleSubmit}>Proceed</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )

}

export default Login
