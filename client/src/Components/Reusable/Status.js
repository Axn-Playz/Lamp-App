import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import darkImg from '../Regular/Images/BlackLogo.png'
import whiteImg from '../Regular/Images/WhiteLogo.png'
const level=3;
const Status = () => {
     // const imgDark = 
return(


<div className="container-fluid">
 <div className="profile">
 <div className="photo">😊  </div>
 <div className="username"> {localStorage.getItem('userName')}</div>
 </div>


 <div className="controlpanel">
      <div className=" sideset settings" title="Settings"><span class="material-symbols-rounded">manage_accounts</span></div> 
      <div className="TestsAI" title="Ques Camp"><img src={darkImg} alt="logo" /></div> 
      <div className=" sideset public" title="Public"><span class="material-symbols-rounded">
public
</span></div> 
 </div>
 
 <div className="level">Level:{level}</div>
 
</div>



)
}

export default Status