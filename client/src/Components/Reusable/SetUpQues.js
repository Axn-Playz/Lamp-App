import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const SetUpQues = () => {



    const data = [{
        ques: "What is your name?",
    },
    {
        ques: `What is your age, ${localStorage.getItem('userName')}?`
    },
    {
        ques: "Any  hobbies?"
    },
    {
        ques: "Acedemic qualifications?"
    }
    ];
    const [index, setIndex] = useState(0);
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState(['']);
    const [appName, setAppName] = useState('');
    const [age, setAge] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [qualification, setQualification] = useState('');
    const [answer, setAnswer] = useState('');
    const [progress,setProgress] = useState(0)
    const navigate = useNavigate();
    const handleNext = (e) => {
        if (index >= 1 && answer.length <= 0) {
            return toast.error('You cannot skip this!', {
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
        setProgress(progress+20);
        setIndex(index + 1);
        setQuestion(data[index]);
        // setResponse(prevResponse => [...prevResponse, answer]);
        if (index === 1) setAppName(answer);
        if (index === 2) setAge(answer);
        if (index === 3) setHobbies(answer);
        if (index === 4) setQualification(answer);
        setAnswer('')
    }
    const handleBack = () => {
        setProgress(progress-20);
        setIndex(index - 1);
        setQuestion(data[index - 2]);
        setAnswer('')
    }

    const handleResponse = async (e) => {
        e.preventDefault();
        try {

            const { data } = await axios.post("http://localhost:8000/account/data", { appName, age, hobbies, qualification });
            console.log(data)
            if (data) {
                toast.success('✔ Thanks for the valuable time!', {
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
                    setAppName('');
                    setAge('');
                    setHobbies('');
                    setQualification('');
                    //   console.log(data?.user.username)
                    navigate("/user");
                }, 1500);
            }
        } catch (error) {
            console.log(error)
        }
    }

    console.log(progress)
    // console.log(index)

    return (
<>  
{ progress>=20 && 
        <div className="progress mt-5 text-center " style={{ width: "auto" }}>
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>}
      
        <div className="questionBank">
                    
            <h5>Please fill up the details, asked below:</h5>
            <br />
              
            <div className="container-sm">
                {data.length >= index ? <div className="card mt-3 p-2" style={{ width: "18rem" }}>

                    <div className="card-body">
                        <h4 className="card-text mt-3">{question ? question.ques : 'Click next to fill up the details'}</h4>
                        {question && <input type="text" placeholder='Answer' value={answer} onChange={(e) => setAnswer(e.target.value)} id="quesAns" className='mt-3' required />}
                        <div className='mt-3'>
                            {question && index >= 2 && <button type="button" className="btn btn-outline-primary mt-3 mx-3" onClick={handleBack}>Back</button>}
                            <button type="button" className="btn btn-outline-primary mt-3" onClick={handleNext}>Next</button>
                            {question && <h6 className="card-title mt-5">Question: {index}/4</h6>}
                        </div>
                    </div>
                </div>
                    : (
                        <div>


                            {/* tick animation */}
                            <div className="main-container">
                                <div className="check-container">
                                    <div className="check-background">
                                        <svg viewBox="0 0 65 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M7 25L27.3077 44L58.5 7" stroke="white" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className="check-shadow"></div>

                                </div>
                            </div>

                            {/* tick animation */}

                            <h4 className="completetext text-center">Setup Completed</h4>
                            <Link><button type="submit" id="proceed" onClick={handleResponse}>Proceed</button></Link>
                        </div>
                    )

                }

            </div>
            
            <ToastContainer />
        </div>
        </>
    )
}

export default SetUpQues
