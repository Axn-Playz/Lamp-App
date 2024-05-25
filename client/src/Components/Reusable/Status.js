import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import darkImg from '../Regular/Images/BlackLogo.png'
import whiteImg from '../Regular/Images/WhiteLogo.png'
const level=3;
const Status = () => {
     // const imgDark = 
return(


<div className="main-status">

 


  <div class="status-lists">
    <ul>
      <li class="active">
        <button>
          <span class="material-symbols-rounded">public</span>
          <div class="text">Public</div>
        </button>
      </li>

      <li>
        <button>
          <span class="material-symbols-rounded">
            settings

          </span>
          <div class="text">Public</div>
        </button>
      </li>

      <li>
        <button>
          <span class="material-symbols-rounded">
            light
          </span>
          <div class="text">Ques Camp</div>

        </button>
      </li>
      <li>
        <button>
          <span class="material-symbols-rounded">
            contact_support
          </span>
          <div class="text">Queries</div>
        </button>
      </li>
      <li>
        <button>
          <span class="material-symbols-rounded">
            chat
          </span>
          <div class="text">Chat</div>
        </button>
       
      </li>
       <div class="indicator"></div>
    
    </ul>
  </div>
   </div>


)
}

export default Status