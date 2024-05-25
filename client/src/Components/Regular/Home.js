import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../Reusable/Nav';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import darkImg from './Images/BlackLogo.png'
import Login from './Login';
import Register from './Register';

const Home = () => {
  const [status, setStatus] = useState('welcome');
  const [theme, setTheme] = useState("");
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const { data } = await axios.post("http://localhost:8000/user/register", { username, email, password });
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
          navigate("/login");
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
      }


    } catch (error) {
      console.log(error)
    }
  }
  return (

    <div>




      <div className="register-setUp">


        <Register />
      </div>







      <div className="login-setup">

        <Login />
      </div>









      <div className={`prompt-regular`}>
        < ul className={`nav nav-pills mb-3 ${theme === "light" ? "dark-bg-nav text-light" : ""} `}>

          <div className={`black-logo ${theme === "light" ? "white-logo" : ""}`}>
          </div>
          <li className="nav-item">
            <a className={`nav-link ${status === "welcome" ? "active" : ''} ${theme === "light" ? "white-txt" : ""}`} aria-current="page" href="#" data-value={"welcome"} onClick={handleLiVal}>Welcome</a>
          </li>

          <li className="nav-item">
            <a className={`nav-link ${status === "guidance" ? "active" : ''} ${theme === "light" ? "white-txt" : ""}`} href="#" data-value={"guidance"} onClick={handleLiVal}>Guidance</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${status === "features" ? "active" : ''} ${theme === "light" ? "white-txt" : ""}`} aria-disabled="false" data-value={"features"} onClick={handleLiVal}>Features</a>

          </li>
          <li className="nav-item dropdown">
            <a className={`nav-link ${status === "more" ? "active" : ''} dropdown-toggle ${theme === "light" ? "white-txt" : ""}`} data-bs-toggle="dropdown" href="#" role="button"
              aria-expanded="false" data-value={"more"} onClick={handleLiVal}>More Info</a>
            <ul className="dropdown-menu">
              <li><a className="dropdown-item" href="#">About Us</a></li>
              <li><a className="dropdown-item" href="#">Why Lamp?</a></li>
              <li><a className="dropdown-item" href="#">Feedback</a></li>
              <li>
                <hr className="dropdown-divider"></hr>
              </li>
              <li><a className="dropdown-item" href="#">Affilations</a></li>
            </ul>
          </li>



          <div className="form-check form-switch" onClick={handleDarkTheme}>
            {" "}{theme === "light" ? <i className='fa-regular fa-sun'></i> : <i className='fa-regular fa-moon'></i>}
            <label className={`form-check-label `} htmlFor="flexSwitchCheckDefault" > </label>
          </div>
        </ul >
      </div >


      <div className="texts">




        <h1 className={`${theme === "light" ? "white-texts" : ""} mt-5`}>L A M P</h1>
        <p className={`${theme === "light" ? "white-txt" : ""} home-box`}>  </p>
        <h1>The Vision</h1>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perspiciatis explicabo eaque hic.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam vero, nisi rem error dolorum cumque.
        Fugit dignissimos accusamus, dolor, facere id sunt veritatis assumenda magnam nesciunt, ex nihil adipisci
        dolorem magni perferendis voluptate eum architecto vitae laboriosam commodi fugiat veniam debitis et! Vero, corrupti. Qui?




        <div className="btns mt-5 active">
          <button className="btn btn-primary login " type="button" data-bs-toggle="modal" data-bs-target="#loginmodal">Log In </button>
          <button type="button" class="btn btn-primary signup" data-bs-toggle="modal" data-bs-target="#signupmodal">
            SignUp
          </button>

        </div>
      </div>
      <div className={`lamp   ${theme === "light" ? "dark-bg-lamp" : ""}`}>

        <div className="hanger"></div>
        <div className="lamp-img">

          <span className="glow"> </span>


        </div>

      </div>
    </div>


  )
}

export default Home
