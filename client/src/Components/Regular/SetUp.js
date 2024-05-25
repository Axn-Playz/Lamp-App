import React, { useState } from 'react';
import Nav from '../Reusable/Nav';
import { Link } from 'react-router-dom';
import SetUpQues from '../Reusable/SetUpQues';
import darkImg from '../Regular/Images/BlackLogo.png'




const Setup = () => {
  const [theme, setTheme] = useState("");

  const handleDarkTheme = (e) => {
    setTheme(theme === "light" ? "dark" : "light")
  }



  return (
    <>

      <div className='setup-nav'>
        <div className="logo setup-logo mb-5">
          <img src={`${darkImg}`} alt="" />
        </div>
        <h1 className="first typewriter mt-5">✨Lets Quickly Setup Your Account✨</h1>
        </div>
          {/* bro jpeg wont have transparent background */}
      <div className="">
      <SetUpQues/>
      
</div>
     



    </>
  )
}








export default Setup