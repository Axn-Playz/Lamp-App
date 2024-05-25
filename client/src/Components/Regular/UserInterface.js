import React, { useState } from 'react';
import Nav from '../Reusable/Nav';
import { Link } from 'react-router-dom';
import Status from '../Reusable/Status';
import { CircularProgressbarWithChildren , buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from 'd3-ease';
const percent=90;






const UserInterface = () => {
  const handleDarkTheme = (e) =>{
    setTheme(theme === "light"?"dark":"light")
  }
  const [theme,setTheme] = useState("");
  const percentage = 50;
 return (
    <div className={`${theme === "light"?"dark-bg-lamp":""}`}>
      
    <Nav/>

    <div class="container px-4 text-center userInfo">

    
  <div class="row gx-5">

  <div class="col course-col"><h4><br />Active Courses <br /></h4>

<br />
  <div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
   Course 1
  </a>
  <a href="#" class="list-group-item list-group-item-action">Course 2</a>
  <a href="#" class="list-group-item list-group-item-action">Course 3</a>
  <a href="#" class="list-group-item list-group-item-action">Course 4</a>
  <a class="list-group-item list-group-item-action disabled" aria-disabled="true">Course ?</a>
</div>


  </div>
    <div class="col progress-col">
      <div class="p-3"><h4>Progress of Course 1</h4></div>

<div className="circleprogress">
  
<CircularProgressbarWithChildren value={percent}>
<div style={{ fontSize: 32, marginTop: -5 }}>
    <strong>{percent}%</strong> done
  </div>
  
</CircularProgressbarWithChildren>

 </div>    


</div>
  </div>



  </div>
 <Status/>
    
    </div>
   
  )
};

export default UserInterface

