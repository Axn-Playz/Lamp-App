import axios from 'axios';
import React, { useEffect, useState } from 'react'
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

  useEffect(()=>{
    localStorage.clear()
  },[])

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



<Register />









<Login />














      <div className={`prompt-regular`}>
        < ul className={`nav nav-pills mb-3 ${theme === "light" ? "dark-bg-nav text-light" : ""} `}>

        <div className={`logo ${theme === "light" ? "logo-dark" : ""}`} >
{/* L A <span className="material-symbols-rounded" >
                    light
          </span> M P  */}

                </div>
          <div className="link-lists">
          <li className="nav-item">
            <a className={`nav-link ${status === "welcome" ? "active" : ''} ${theme === "light" ? "white-txt" : ""}`} aria-current="page" href="#" data-value={"welcome"} onClick={handleLiVal}>Welcome</a>
          </li>

          <li className="nav-item">
            <a className={`nav-link ${status === "guidance" ? "active" : ''} ${theme === "light" ? "white-txt" : ""}`} href="#" data-value={"guidance"} onClick={handleLiVal}>Guidance</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link ${status === "features" ? "active" : ''} ${theme === "light" ? "white-txt" : ""}`} aria-disabled="false" data-value={"features"} onClick={handleLiVal} href="#vision" >Vision</a>

          </li>
          <li className="nav-item">
            <a className={`nav-link ${status === "why" ? "active" : ''} ${theme === "light" ? "white-txt" : ""}`} aria-disabled="false" data-value={"why"} onClick={handleLiVal} href="#why" >Why_LAMP?</a>

          </li>
          <li className="nav-item">
            <a className={`nav-link ${status === "about" ? "active" : ''} ${theme === "light" ? "white-txt" : ""}`} aria-disabled="false" data-value={"about"} onClick={handleLiVal} href="#about" >About_Us</a>

          </li>
          <li className="nav-item">
            <a className={`nav-link ${status === "affilation" ? "active" : ''} ${theme === "light" ? "white-txt" : ""}`} aria-disabled="false" data-value={"affilation"} onClick={handleLiVal}>Affilations</a>

          </li>
          </div>
          
{/* initial */}


          <div className="form-check form-switch" onClick={handleDarkTheme}>
            {" "}{theme === "light" ? <i className='fa-regular fa-sun'></i> : <i className='fa-regular fa-moon'></i>}
            <label className={`form-check-label `} htmlFor="flexSwitchCheckDefault" > </label>
          </div>
        </ul >
      </div >

      
      <div className="texts">
  

  <div className="title-main">

      <h1 className={`${theme === "light" ? "white-txt" : ""}`}>L A &nbsp; &nbsp; M P</h1>
     
      <h2 className={`${theme === "light" ? "white-txt-border" : ""}`}> "Illuminate Your Career Path: Guiding You Towards a Brighter Future with LAMP!"</h2>


      <div className="btns mt-5 active">


<button className="btn btn-primary login " type="button" data-bs-toggle="modal" data-bs-target="#loginmodal">Log In </button>
       <button type="button" className="btn btn-primary signup" data-bs-toggle="modal" data-bs-target="#signupmodal">
         SignUp
       </button>

   

</div>
<h1 ><span className="material-symbols-rounded">
keyboard_double_arrow_down
</span>
</h1>


<div clasName="extra_info">
</div>

<div className="text-welcome">
        <h2 className={`${theme === "light" ? "white-txt" : ""}`} id="vision">The Vision</h2>


         <p className={`${theme === "light" ? "white-txt" : ""} text-box-home`}>
         Our vision at LAMP extends beyond just matching skills with careers. We envision a world where every individual has the tools 
         and guidance needed to pursue their passions and achieve their goals. By harnessing the power of AI, we aim to democratize access 
         to career counseling, making it personalized, affordable, and accessible to all. Whether you're a recent graduate exploring your options 
         or a seasoned professional seeking a new direction, LAMP is here to guide you every step of the way. Together, let's unlock a future full
          of possibilities.


        </p>
</div>



<div className="text-welcome">

<h2 className={`${theme === "light" ? "white-txt" : ""}`} id="why">Why LAMP?</h2>


<p className={`${theme === "light" ? "white-txt" : ""}`}>
Embarking on a career journey can be daunting, but it doesn't have to be. LAMP stands as your guiding light,
illuminating the path to your future. Through cutting-edge AI technology, we offer a personalized experience 
unlike any other. Say goodbye to uncertainty and hello to clarity. With LAMP, you gain invaluable insights into your 
skills, academic background, and potential career paths. Our platform empowers you to make informed decisions, paving
the way for a fulfilling professional life.


</p>
</div>
<div className="text-welcome">

<h2 className={`${theme === "light" ? "white-txt" : ""}`} id="about">About Us.</h2>


<p className={`${theme === "light" ? "white-txt" : ""}`}>
At LAMP, we believe in the power of knowledge and technology to transform lives. Founded by a team
of passionate innovators, we set out on a mission to revolutionize career guidance. With a blend of expertise 
in artificial intelligence and career counseling, we've created a platform that bridges the gap between aspiration 
and reality. Our dedication to helping individuals unlock their full potential drives everything we do. 
Join us on this journey, and let's light up the path to your dream career together.
</p>

</div>











</div>



<footer >© 2024 LAMP. All rights reserved. Terms of Service | Privacy Policy | Contact Us</footer>

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
