import React, { useState } from 'react';
import Nav from '../Reusable/Nav';
import Status from '../Reusable/Status';
import Ai from '../Ai/Ai'
import { useNavigate } from 'react-router-dom';
import Home from '../Reusable/Home';
import QuesCamp from '../Reusable/QuestionCamp';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const UserInterface = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [theme, setTheme] = useState("");
  const [avatar, setAvatar] = useState('per1')
  const naviagte = useNavigate();
  const [status, setStatus] = useState('queries');
  const [aiStatus, setAiStatus] = useState('');
  const [homeStatus, setHomeStatus] = useState(true);
  const [campStatus, setCampStatus] = useState('');
  const [publicStatus, setPublicStatus] = useState('');
  const [settingStatus, setSettingStatus] = useState('');
  const [newUsername, setNewUsername] = useState('');




  const handleAvatar = (e) => {
    e.preventDefault();
    if ((e.currentTarget.dataset.value)) {
      setAvatar((e.currentTarget.dataset.value));
    }

  }

  const handleDel = (e) => {
    e.preventDefault();
    toast.success('Logging out!', {
      position: "bottom-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",

    });
    setTimeout(() => {
      naviagte('/');
      localStorage.setItem('userName', null);
      localStorage.clear();
    }, 1500);

  }
  const handleStatus = (e) => {
    setStatus(e.currentTarget.dataset.value);
    if (e.currentTarget.dataset.value == "queries") {
      setHomeStatus(true);
      setAiStatus(false);
      setCampStatus(false);
      setSettingStatus(false);
      setPublicStatus(false);


    } else if (e.currentTarget.dataset.value == "chat") {
      setHomeStatus(false);
      setAiStatus(true);
      setCampStatus(false);
      setSettingStatus(false);
      setPublicStatus(false);
    }
    else if (e.currentTarget.dataset.value == "ques") {
      setHomeStatus(false);
      setAiStatus(false);
      setCampStatus(true);
      setSettingStatus(false);
      setPublicStatus(false);
    }
    else if (e.currentTarget.dataset.value == "settings") {
      setHomeStatus(false);
      setAiStatus(false);
      setCampStatus(false);
      setSettingStatus(true);
      setPublicStatus(false);
    }
    else {
      setHomeStatus(false);
      setAiStatus(false);
      setCampStatus(false);
      setSettingStatus(false);
      setPublicStatus(true);
    }

    console.log(e.currentTarget.dataset.value)
  }
  // console.log(aiStatus)


  //onscroll hiding:

  // var prevScrollpos = window.pageYOffset;
  // window.onscroll = function() {
  // var currentScrollPos = window.pageYOffset;
  //   if (prevScrollpos > currentScrollPos) {
  //     document.getElementById("status-main").style.bottom = "0";
  //   } else {
  //     document.getElementById("status-main").style.bottom = "-110px";
  //   }
  //   prevScrollpos = currentScrollPos;
  // }



  const steps = [
    {
      id: 1,
      title: 'STEP 1',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 2,
      title: 'STEP 2',
      content: 'Lorem ipsum dolor sit amet,  consectetur adipiscing elit...',
    },
    {
      id: 3,
      title: 'STEP 3',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 4,
      title: 'STEP 4',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
    {
      id: 5,
      title: 'STEP 5',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
    },
  ];

  const calculateProgressWidth = () => {
    switch (activeStep) {
      case 1:
        return '2%';
      case 2:
        return '25%';
      case 3:
        return '50%';
      case 4:
        return '75%';
      case 5:
        return '100%';
      default:
        return '0%';
    }
  };

  // const handleUsernameConfirm = async(e) =>{
  //   e.preventDefault();
  //   try {

  //     const fetchData = await axios.post(`http://localhost:8000/user/${localStorage.getItem('userName')}`,{newUsername});
  //     if (fetchData){
  //       console.log(fetchData);
  //       window.location.reload()
  //     }

  //   } catch (error) {
  //     console.log('something went wrong',error);
  //   }
  // }



  return (
    <>
<div className="ui-body ">

      <div className="modal fade  dark-interface" id="changenamemodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xxl" role="document">
          <div className="modal-content changename-model">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Change UserName</h5>

              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className='container popup'>

                <h6>Current UserName : <kbd>  {localStorage.getItem('userName')}</kbd> </h6>
                {/*<label htmlFor="changename-form" className="form-label"><h6>New Name : </h6> </label><input type="text" placeholder='Enter New Name' className='form-control' id='changename-form' onChange={(e)=>setNewUsername(e.target.value)}/>

                          
                            
                              <button type="submit" className="btn btn-primary change-name-confirm" onClick={handleUsernameConfirm} >Confirm</button> */}


                UNDER CONSTRUCTION
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="modal fade" id="changeavatarmodal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-xxl" role="document">
          <div className="modal-content changeavatar-modal">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Change Avatar</h5>

              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className='container popup'>

                <h6>Current Avatar : <img src={`https://api.multiavatar.com/Binx ${localStorage.getItem('avatarCode')}.svg`} alt="😊" className='mx-3 current-a-preview' /></h6>
                {/* <label htmlFor="changename-form" className="form-label"><h6>Select New Avatar : </h6> </label>
<div className="mb-3 avatar-tray more-style">
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



<button type="submit" className="btn btn-primary change-name-confirm" >Confirm</button>*/}
                UNDER CONSTRUCTION
              </div>
            </div>
          </div>
        </div>
      </div>








      {homeStatus && <Nav />}

      {homeStatus && <Home />}
      {publicStatus && <>
        <div className='container d-flex justify-content-center mt-5 construct'>
          {/* <img src="https://t4.ftcdn.net/jpg/01/89/24/45/360_F_189244555_ieurJd3t9hSSufU2WB02L9lKuT1ZB1Pj.jpg" alt="page_not_found" /> */}
          <h1> <span className="material-symbols-rounded">
            construction
          </span> Under Construction <span className="material-symbols-rounded">
              construction
            </span></h1>
        </div>


      </>}
      {settingStatus && <>
        <div className='container d-flex justify-content-center mt-5 construct'>
          {/* <img src="https://t4.ftcdn.net/jpg/01/89/24/45/360_F_189244555_ieurJd3t9hSSufU2WB02L9lKuT1ZB1Pj.jpg" alt="page_not_found" /> */}
          <h1><span className="material-symbols-rounded">
            construction
          </span> Under Construction <span className="material-symbols-rounded">
              construction
            </span></h1>
        </div>


      </>}
      {campStatus && <QuesCamp />}
      {aiStatus && <Ai />}

      {/* status barrr */}

      <div className="main-status" id='status-main'>

        <div className="dropup-center dropup user" data-bs-theme="dark">
          <button className="btn btn-secondary dropdown-toggle user-btn " type="button" data-bs-toggle="dropdown" aria-expanded="false">&nbsp;<img src={`https://api.multiavatar.com/Binx ${localStorage.getItem('avatarCode')}.svg`} alt="😊" className='mx-3' />
            {localStorage.getItem('userName')}

          </button>
          <ul className="dropdown-menu user-menu">
            <li><a className="dropdown-item" href="#"><button className="btn btn-primary changes" type="button" data-bs-toggle="modal" data-bs-target="#changenamemodal">Change UserName</button></a></li>
            <li><a className="dropdown-item" href="#"><button className="btn btn-primary changes" type="button" data-bs-toggle="modal" data-bs-target="#changeavatarmodal">Change Avatar</button></a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item logout" onClick={handleDel}>LogOut</a></li>
          </ul>
        </div>







        <div className="status-lists status-dark">
          <ul>

            <li className={`${status === 'queries' ? "active" : ""}`}>
              <button data-value={'queries'} onClick={handleStatus}>
                <span className="material-symbols-rounded" >
                  home
                </span>
                <div className="text" >Home</div>
              </button>
            </li>



            <li className={`${status === 'ques' ? "active" : ""}`}>
              <button data-value={'ques'} onClick={handleStatus}>
                <span className="material-symbols-rounded" >
                  light
                </span>
                <div className="text" >Ques Camp</div>

              </button>
            </li>



            <li className={`${status === 'chat' ? "active" : ""}`}>
              <button onClick={handleStatus} data-value={'chat'}>
                <span className="material-symbols-rounded" >
                  chat
                </span>
                <div className="text" >ChatAI</div>
              </button>

            </li>






            <li className={`${status === 'settings' ? "active" : ""}`}>
              <button data-value={'settings'} onClick={handleStatus}>
                <span className="material-symbols-rounded" >
                  settings

                </span>
                <div className="text" >Settings</div>
              </button>
            </li>







            <li className={`${status === 'public' ? "active" : ""}`} id="public">
              <button onClick={handleStatus} data-value={'public'}>
                <span className="material-symbols-rounded" >public</span>
                <div className="text" >Public</div>
              </button>
            </li>



            <div className="indicator"></div>

          </ul>
        </div>



        <div className="dropup-center dropup more-btn" data-bs-theme="dark">
          <button className="btn btn-secondary dropdown-toggle vert-btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">

            <span className="material-symbols-rounded" >
              more_vert
            </span>
          </button>
          <ul className="dropdown-menu user-menu">
            <li><a className="dropdown-item" href="#">User : <img src={`https://api.multiavatar.com/Binx ${localStorage.getItem('avatarCode')}.svg`} />{localStorage.getItem('userName')}</a></li>
            <li><a className="dropdown-item" href="#">Level : 1</a></li>
            <li><a className="dropdown-item" href="#"><button className="btn btn-primary changes" type="button" data-bs-toggle="modal" data-bs-target="#changenamemodal">Change Username</button></a></li>
            <li><a className="dropdown-item" href="#"><button className="btn btn-primary changes" type="button" data-bs-toggle="modal" data-bs-target="#changeavatarmodal">Change Avatar</button></a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item logout" onClick={handleDel} style={{ color: 'red' }}>LogOut</a></li>
          </ul>
        </div>


        <div className="level">Level:1</div>

      </div>
      <ToastContainer />
</div>
    </>
  );
};

export default UserInterface;