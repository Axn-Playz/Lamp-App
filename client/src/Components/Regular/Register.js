import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Reusable/Nav';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import darkImg from './Images/BlackLogo.png'
    

const Register = () => {
    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
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
    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {
            const {data} = await axios.post("http://localhost:8000/user/register",{username,email,password});
            if (data.message === 'exist'){
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
            }else if (data.message === "notexist"){
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
                    navigate("/login");
                  }, 1500);
            }else if (data.message === "inputField"){
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
                
            }else{
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
                }
            
            
        } catch (error) {
            console.log(error)
        }
    } 
    return (
        <>
    





    <div class="modal fade" id="signupmodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">Sign Up</h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">




        <div className='container popup'>
            <form action='post'>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail11" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputEmail11" aria-describedby="emailHelp"
                    value={username}
                    onChange={(e)=>setUsername(e.target.value)}
                    />
                       
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleInputPassword1"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div id="emailHelp" className="form-text">We'll never share your password with anyone else.</div>
                </div>
            </form>
        </div>



       
        <ToastContainer/>



            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={handleSubmit}>Proceed</button>
            </div>
          </div>
        </div>
        </div>
    










       
        </>
    )
}

export default Register
