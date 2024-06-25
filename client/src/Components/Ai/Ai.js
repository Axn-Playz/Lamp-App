import React, { useState } from 'react';
import Status from '../Reusable/Status';
import { useNavigate } from 'react-router-dom';

const Ai = () => {
    const naviagte = useNavigate();
     const [status, setStatus] = useState('chat');
     const [aiStatus,setAiStatus] = useState(false);

     const handleStatus = (e) =>{
      setStatus(e.currentTarget.dataset.value);
      if (e.currentTarget.dataset.value == "chat"){
        setAiStatus(true)
      }else{
        setAiStatus(false)
      }
      console.log(e.currentTarget.dataset.value)
     }
     console.log(aiStatus)
    return (
        <>
        <iframe
            src="http://localhost:8501?embed=true&embed_options=show_padding"
            width="100%"
            height="91%"
            title="Query AI"
            style={{ border: 'none' , position:'absolute' , overflow:'hidden', top:'0'}}
        ></iframe>


        
</>
    );
};

export default Ai;
